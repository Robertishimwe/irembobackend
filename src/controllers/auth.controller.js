import AuthService from "../services/auth.service";
import userService from "../services/users.service";
import Protection from "../helper/encryption";

const {
  login,
  loginWithToken,
  loginWithEmail,
  logout,
  resetPassword,
  forgotPassword,
} = AuthService;
const { findUser } = userService;
const { checkPassword, hashPassword } = Protection;

class authControler {
  //normal login
  static async normalLogin(req, res) {
    const { email, password } = req.body;
    console.log(password);

    const userExist = await findUser({ email: email });
    if (!userExist)
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });

    const passwordMatch = await checkPassword(password, userExist.password);
    if (!passwordMatch)
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });

    const data = await login(email, password);
    return res.status(200).json({ status: "success", data });
  }
  //login with token
  static async loginWithToken(req, res) {
    const { token } = req.body;
    try {
      const data = await loginWithToken(token);
      return res.status(200).json({ status: "success", data });
    } catch (error) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid token" });
    }
  }

  //login with email
  static async loginWithEmail(req, res) {
    const { email } = req.body;
    try {
      const data = await loginWithEmail(email);
      return res.status(200).json({ status: "success", data });
    } catch (error) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });
    }
  }
  //forgot password
  static async forgotPassword(req, res) {
    const { email } = req.body;
    try {
      const data = await forgotPassword(email);
      return res.status(200).json({ status: "success", data });
    } catch (error) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });
    }
  }

  //reset password
  static async resetPassword(req, res) {
    const { password, token } = req.body;
    const hashedPassword = await hashPassword(password);
    try {
      const data = await resetPassword(hashedPassword, token);
      return res.status(200).json({ status: "success", data });
    } catch (error) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials", error });
    }
  }

  //logout
  static logoutUser = async (req, res) => {
    console.log(req); 
    const { _id } = req.user;
    console.log(req.user); 
    try {
      const data = await logout(_id);
      res.status(200).json({ status: "success", data });
    } catch (error) {
      res.status(500).json({ status: "error", message: "Server error" });
    }
  };
}
export default authControler;
