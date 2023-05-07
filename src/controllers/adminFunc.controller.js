import userService from "../services/users.service";
import DocumentService from "../services/document.service";
import emailService from "../services/email.service"

import User from "../models/users";

const {
  findUser,
  findUsers,
  createUser,
  verifyUser,
  unverifyUser,
  deleteUser,
} = userService;

const { getDocument, approveOrRejectDocument } = DocumentService;

class AdminFunctions {
  // GET all user
  static listOfUsers = async (req, res) => {
    const allUsers = await findUsers();
    return res.status(200).json({ message: "All users", users: allUsers });
  };
  // GET a single user
  static singleUser = async (req, res) => {
    const query = { _id: req.params.id };
    const user = await findUser({ query });
    return res.status(200).json({ message: "User", user });
  };
  // GET a single user BY email
  static singleUserByEmail = async (req, res) => {
    const query = { email: req.params.email };
    const user = await findUser({ query });
    return res.status(200).json({ message: "User", user });
  };
  // GET a single user BY wildcard
  static generalUserSearch = async (req, res) => {
    const searchString = req.params.searchString;

    try {
      const result = await User.find({
        $and: [
          {
            $or: [
              { firstName: { $regex: `${searchString}`, $options: "i" } },
              { lastName: { $regex: `${searchString}`, $options: "i" } },
              { gender: { $regex: `${searchString}`, $options: "i" } },
              { email: { $regex: `${searchString}`, $options: "i" } },
              { maritalStatus: { $regex: `${searchString}`, $options: "i" } },
              { nationality: { $regex: `${searchString}`, $options: "i" } },
              {
                verificationStatus: {
                  $regex: `${searchString}`,
                  $options: "i",
                },
              },
            ],
          },
          { password: { $ne: null } },
          { dateOfBirth: { $ne: null } },
        ],
      });
      return res.status(200).json({ message: "User", user: result });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  };

  //verify user
  static verifyUser = async (req, res) => {
    const query = { _id: req.params.id };

    try {
      const user = await verifyUser({ query });
      return res.status(200).json({ message: "User", user });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  //approveOrRejectDocument

  static approveOrRejectDocument = async (req, res) => {
    try {
      const document = await approveOrRejectDocument(req.body._id);
      return res.status(200).json({ message: "Document", document });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  //approveOrRejectDocumentDocument + verifyUser

  static approveOrRejectDocumentAndVerifyUser = async (req, res) => {
    try {
      const document = await approveOrRejectDocument(req.body._id);
      //Get a document
      const doc = await getDocument({_id:req.body._id});
      const userToverify = doc.user._id

      console.log(doc)
      console.log("userToverify", userToverify)

      //verify user
      //since doc has field of user which is referance from another table we need to get the user using populate

      const user = await verifyUser(userToverify);
      console.log(doc)
      await emailService(doc.user.email,`Your Account is now verified`,`Hello ${doc.user.firstName}, your account is now verified`)

      return res.status(200).json({ message: "Document", document, user });
    } catch (error) {
        console.log(error)
      
      return res.status(500).json({ error });
    }
  };
}

export default AdminFunctions;
