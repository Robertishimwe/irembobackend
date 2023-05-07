import jwt from "jsonwebtoken";

class Token {
  static generateToken = (data, secret, expiresIn) => {
    return jwt.sign(data, secret, { expiresIn });
  };

  static verifyToken = (token, secret) => {
    return jwt.verify(token, secret, (error, result) => {
      if (error) {
        error.status = 401;
        throw error;
      }
      return result;
    });
  };

  // static verifyToken = (token, secret) => {
  //   return jwt.verify(token, process.env.JWT_SECRET);
  // };
}

export default Token;
