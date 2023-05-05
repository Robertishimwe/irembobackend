import userService from "../services/users.service";
import Protection from "../helper/encryption";

const { findUser, createUser, verifyUser, unverifyUser, deleteUser } = userService;
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
      console.log("Oops, something went wrong", error);
      res.status(500).send({ message: "Internal server error", error });
    }
  };

  // static getAllPatients = async (req, res) => {

  //     const query = { Role: 'patient' };
  //     const users = await checkManyUser(query);
  //     if (users) return res.status(200).send({ message: "all patient", users: users })
  //     res.status(200).send({ message: "no patient found" });

  // };

  // static getAllHealthPractitioner = async (req, res) => {

  //     const query = { Role: 'healthPractitioner' };
  //     const users = await checkManyUser(query);
  //     if (users) return res.status(200).send({ message: "all healthPractitioners", users: users })
  //     res.status(200).send({ message: "no healthPractitioner found" });

  // }

  // static getAllHospital = async (req, res) => {

  //     const query = { Role: 'hospitalAdmin' };
  //     const users = await checkManyUser(query);
  //     if (users) return res.status(200).send({ message: "all hospitals", users: users })
  //     res.status(200).send({ message: "no hospital found" });

  // }

  // static getAllusers = async (req, res) => {

  //     const users = await checkManyUser();
  //     if (users) return res.status(200).send({ message: "all users", users: users })
  //     res.status(200).send({ message: "no user found" });

  // }

  // static getSinglePatientByEmail = async (req, res) => {
  //     const query = { email: req.params.email };
  //     const user = await checkUser(query);
  //     if (user) return res.status(200).send({ message: "all users", users: user })
  //     res.status(200).send({ message: "no user found" });

  // }

  // static getSinglePatientById = async (req, res) => {
  //     const query = { _id: req.params.id };
  //     const user = await checkUser(query);
  //     if (user) return res.status(200).send({ message: "all users", users: user })
  //     res.status(200).send({ message: "no user found" });

  // }
}

export default UsersController;
