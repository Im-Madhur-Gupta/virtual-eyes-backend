const express = require("express");
const visualizeImageRouter = require("./src/routes/visualizeImage.routes");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("<h1>Welcome to the HomePage of Virtual Eyes Backend.</h1>");
});

app.use("/visualize-image", visualizeImageRouter);

app.listen(port, () => {
  console.log("app has started");
});
