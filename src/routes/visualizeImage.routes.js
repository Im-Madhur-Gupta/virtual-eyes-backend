const fs = require("fs");
const path = require("path");
const express = require("express");

const getImageDescription = require("../controllers/visualize-image/getImageDescription");
const getSingleImageInReq = require("../middlewares/getSingleImageInReq");

const computerVisionClient = require("../configs/computer-vision");

const visualizeImageRouter = express.Router();

visualizeImageRouter.post("/", getSingleImageInReq, (req, res) => {
  getImageDescription(req.file.filename, computerVisionClient)
    .then((descriptionObj) => {
      res.send(descriptionObj);
      fs.rm(
        path.join(
          path.dirname(require.main.filename),
          "/uploads",
          req.file.filename
        ),
        (err) => {
          if (err) {
            throw err;
          }
        }
      );
    })
    .catch(() => {
      res.status(500).send({
        errorMessage: "Something went wrong. Try again sometime later.",
      });
    });
});

module.exports = visualizeImageRouter;
