import userService from "../services/users.service";
import Protection from "../helper/encryption";
import cloudinary from "../config/cloudinary";

const {
  findUser,
  createUser,
  verifyUser,
  unverifyUser,
  deleteUser,
  updateUser,
} = userService;
const { hashPassword } = Protection;

class UsersController {
  //create account
  static createUserController = async (req, res) => {
    const hashedPassword = await hashPassword(req.body.password);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      email: req.body.email,
      password: hashedPassword,
      dateOfBirth: req.body.dateOfBirth,
    };

    try {
      const isEmailUsed = await findUser({ email: user.email });
      if (isEmailUsed)
        return res.status(400).send({ message: "Email already used" });
      const createdUser = await createUser(user);
      res
        .status(201)
        .send({ message: "Account created successfully", createdUser });
    } catch (error) {
      console.log("Oops, something went wrong");
      res.status(500).send({ message: "Internal server error", error });
    }
  };

  static updateUserContriller = async (req, res) => {
    const loggedInUser = req.user._id;
    try {
      if ("files" in req) {
        const pictures = req.files;
        const urls = [];
        const uploadImages = pictures.map((image) =>
          cloudinary.uploader.upload(image.path, { folder: "irembo_docs" })
        );
        const imageResponse = await Promise.all(uploadImages);
        imageResponse.forEach((image) => {
          return urls.push(image.secure_url);
        });
        req.body = {
          ...req.body,
          profilePicture: urls[0],
        };
        const { email } = req.body;
        const userBeingUpdated = await findUser({ email: email });
        if (userBeingUpdated._id.toString() !== loggedInUser.toString())
          return res
            .status(400)
            .send({ message: "You are not authorized to update this user" });

        const updatedUser = await updateUser(userBeingUpdated, req.body);
        return res
          .status(200)
          .send({ message: "User updated successfully", updatedUser });
      }
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Internalll server error", error });
    }
  };
}

export default UsersController;
