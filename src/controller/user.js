import { v4 as uuidv4 } from "uuid";
import UserModel from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (user) => {
  const token = jwt.sign(
    { email: user.email, userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return { token };
};

const CREATE_USER = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!/^[A-Z]/.test(name)) {
      return res
        .status(400)
        .json({ message: "Name must start with an uppercase letter" });
    }

    if (password.length < 6 || !/\d/.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters long and contain at least one number",
      });
    }

    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = {
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      password: hash,
      ownedTasks: req.body.ownedTasks,
    };

    const response = await new UserModel(user);

    await response.save();

    const { token } = createToken(user);

    return res.status(200).json({
      message: "User was created",
      response: response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in application" });
  }
};

const LOGIN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Your email or password was wrong" });
    }

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Your email or password was wrong" });
    }

    const { token } = createToken(user);

    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in application" });
  }
};

const GET_ALL_ACTIVE_USERS = async (req, res) => {
  try {
    const response = await UserModel.find().sort({ name: 1 });
    return res.status(200).json({ users: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in application" });
  }
};

const GET_USER_BY_ID = async (req, res) => {
  try {
    const response = await UserModel.findOne({ id: req.params.id });

    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application" });
  }
};

export { CREATE_USER, LOGIN, GET_ALL_ACTIVE_USERS, GET_USER_BY_ID };
