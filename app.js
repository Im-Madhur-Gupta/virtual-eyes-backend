require("dotenv").config();
require("./src/configs/database").connect();
const express = require("express");

const registerController = require("./src/controllers/register/register.controllers");
const loginController = require("./src/controllers/login/login.controllers");

const verifyToken = require("./src/middlewares/auth");

const matchFaceRouter = require("./src/routes/matchFace.routes");
const visualizeImageRouter = require("./src/routes/visualizeImage.routes");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the HomePage of Virtual Eyes Backend.</h1>");
});

app.post("/register", registerController);

app.post("/login", loginController);

app.use("/visualize-image", verifyToken, visualizeImageRouter);

app.use("/match-face", verifyToken, matchFaceRouter);

app.listen(port, () => {
  console.log("app has started on port - " + port);
});
