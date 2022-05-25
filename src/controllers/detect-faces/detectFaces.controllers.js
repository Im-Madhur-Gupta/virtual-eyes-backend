const detectFaces = require("../../middlewares/detect-faces/detectFaces");
const path = require("path");
const { rm } = require("fs");

const detectFacesController = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const filename = req.file.filename;
    const imgPath = path.join("./", "uploads", userId, filename);
    const detectedFacesData = await detectFaces(imgPath);
    // remove the directory which we created to store the images
    const dirPath = path.join("./", "uploads", userId);
    rm(dirPath, { recursive: true }, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.send(detectedFacesData);
  } catch (err) {
    res.status(500).send({ message: "something went wrong" });
  }
};

module.exports = detectFacesController;
