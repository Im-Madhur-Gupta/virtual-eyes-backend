const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { v4: uuid } = require("uuid");
const faceServiceClient = require("../../configs/face-service");

const User = require("../../models/User");

const registerController = async (req, res) => {
  try {
    // pulling the user input from request body
    const { email, password, first_name, last_name } = req.body;

    // checking if we have recieved email and password or not.
    if (!(email && password)) {
      return res.status(400).send("Email and Password are mandatory inputs.");
    }

    // checking whether a user with same email already exists or not
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res
        .status(409)
        .send("Email provided is already in use. Please Login.");
    }

    // encrypt user's password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // generating a person group id
    const person_group_id = uuid();

    // create a person group.
    console.log("Creating a person group with ID: " + person_group_id);
    await faceServiceClient.personGroup.create(
      person_group_id,
      person_group_id,
      {
        recognitionModel: "recognition_04",
      }
    );

    // create a new user in our DB
    const newUser = await User.create({
      email: email.toLowerCase(),
      password: encryptedPassword,
      first_name,
      last_name,
      person_group_id,
    });

    // create a JWT token for the new user
    const token = jwt.sign(
      { user_id: newUser._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2 days",
      }
    );

    // save the user token
    newUser.token = token;

    // sending back the new user's details
    res.status(201).send(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong.");
  }
};

module.exports = registerController;
