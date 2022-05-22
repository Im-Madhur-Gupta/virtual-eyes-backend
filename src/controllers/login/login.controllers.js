const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

const loginController = async (req, res) => {
  try {
    // pulling the user input from request body
    const { email, password } = req.body;

    // checking if we have recieved email and password or not.
    if (!(email && password)) {
      return res.status(400).send("Email and Password are mandatory inputs.");
    }

    // checking whether a user with given email exists or not
    const user = await User.findOne({ email });

    // if the user exists then we need to match the supplied password
    if (user && (await bcrypt.compare(password, user.password))) {
      // create a new JWT token for the user
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save the user token
      user.token = token;

      // sending back the user's details
      return res.status(200).json(user);
    }
    // invalid credentials found
    res.status(400).send("Invalid Credentials Entered. Please Try Again.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong.");
  }
};

module.exports = loginController;
