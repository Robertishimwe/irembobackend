import User from "../models/users";
import redisClient from "../config/redis.js";
import Token from "../helper/token";
import emailService from "./email.service";
import { v4 as uuidv4 } from "uuid";

class AuthService {
  static async login(email, password) {
    const user = await User.findOne({ email });

    const token = Token.generateToken(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.Role,
        gender: user.gender,
        isMfaEnabled: user.isMfaEnabled,
        nationality: user.nationality,
        dateOfBirth: user.dateOfBirth,
        maritalStatus: user.maritalStatus,
        profilePicture: user.profilePicture,
        verificationStatus: user.verificationStatus,
      },
      process.env.JWT_SECRET,
      "1h"
    );

    // If user has multi-factor authentication enabled, generate and send login link
    if (user.isMfaEnabled) {
      const loginToken = uuidv4();
      user.loginTokens.push(loginToken);
      await user.save();
      const sendemail = await emailService(
        user.email,
        "Login to Irembo User Management System",
        `<p>Click this link to login:<a href="${process.env.CLIENT_URL}/login/${loginToken}">${process.env.CLIENT_URL}/login/${loginToken}</a></p>`
      );
      return {
        isMfaEnabled: true,
        token: null,
        message: "Login link sent to your email address.",
        sendemail,
      };
    }

    // Store token in Redis
    redisClient.setex(`${user._id}`, 3600, `${token}`, (err, result) => {
      if (err) {
        console.error("Error setting key in Redis:", err);
      } else {
        console.log("Key set successfully in Redis:", result);
      }
    });

    return token;
  }

  static async loginWithToken(token) {
    const user = await User.findOne({ loginTokens: token });
    if (!user) {
      throw new Error("Invalid login link");
    }

    const index = user.loginTokens.indexOf(token);
    if (index !== -1) {
      user.loginTokens.splice(index, 1);
      await user.save();
    }

    const jwtToken = Token.generateToken(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.Role,
        gender: user.gender,
        nationality: user.nationality,
        isMfaEnabled: user.isMfaEnabled,
        dateOfBirth: user.dateOfBirth,
        maritalStatus: user.maritalStatus,
        profilePicture: user.profilePicture,
        verificationStatus: user.verificationStatus,
      },
      process.env.JWT_SECRET,
      "1h"
    );

    // Store token in Redis

    redisClient.setex(`${user._id}`, 3600, `${jwtToken}`, (err, result) => {
      if (err) {
        console.error("Error setting key in Redis:", err);
      } else {
        console.log("Key set successfully in Redis:", result);
      }
    });

    return jwtToken;
  }
  //login with email(login link to email containining jwt token)

  static async loginWithEmail(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid login link");
    }
    const jwtToken = Token.generateToken(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.Role,
        gender: user.gender,
        nationality: user.nationality,
        dateOfBirth: user.dateOfBirth,
        maritalStatus: user.maritalStatus,
        profilePicture: user.profilePicture,
        verificationStatus: user.verificationStatus,
      },
      process.env.JWT_SECRET,
      "1h"
    );

    redisClient.setex(`${user._id}`, 3600, `${jwtToken}`, (err, result) => {
      if (err) {
        console.error("Error setting key in Redis:", err);
      } else {
        console.log("Key set successfully in Redis:", result);
      }
    });

    const sendemail = await emailService(
      user.email,
      "Login to Irembo User Management System",
      `<p>Click this link to login:<a href="${process.env.CLIENT_URL}/login/token/${loginToken}">${process.env.CLIENT_URL}/login/token/${loginToken}</a></p>`
    );
    return {
      token: null,
      message: "Login link sent to your email address.",
      sendemail,
    };
  }

  static async logout(userId) {
    // Remove token from Redis
    redisClient.del(userId);
  }

  // forgot password using jwt
  static async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const token = Token.generateToken(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      "1h"
    );

    const sendemail = await emailService(
      user.email,
      "Forgot Password",
      `<p>Click this link to reset your password:<a href="${process.env.CLIENT_URL}/reset-password/${token}">${process.env.CLIENT_URL}/reset-password/${token}</a></p>`
    );
    return {
      token: null,
      message: "Password reset link sent to your email address.",
      sendemail,
    };
  }

  // reset password using jwt
  static async resetPassword(password, token) {
    const decoded = Token.verifyToken(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error("User not found");
    }
    user.password = password;
    await user.save();
    return {
      message: "Password reset successfully",
    };
  }
}

export default AuthService;
