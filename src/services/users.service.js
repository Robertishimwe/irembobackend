import User from "../models/users";

class userService {
  static createUser = async (data) => {
    const user = new User(data);
    try {
      await user.save();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  static findUser = async (query) => {
    const user = await User.findOne(query);
    console.log(user)
    if (!user) return false;
    return user;
  };

  static findUsers = async (query) => {
    const users = await User.find(query);
    return users;
  }

  static updateUser = async (prevUser, updatedUser) => {
    Object.assign(prevUser, updatedUser);
    return await prevUser.save();
  };

  static deleteUser = async (query) => {
    const user = await User.findOne(query);
    if (!user) {
      throw new Error("User not found");
    }
    try {
      await user.delete();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  };

  static verifyUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    // if (user.verificationStatus === "VERIFIED") {
    //   throw new Error("User is already verified");
    // }
    user.verificationStatus = "VERIFIED";
    return await user.save();
  };

  static unverifyUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.verificationStatus = "UNVERIFIED";
    return await user.save();
  };
}

export default userService;
