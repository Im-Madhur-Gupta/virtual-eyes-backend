const fs = require("fs");
const path = require("path");
const express = require("express");

const getImageDescription = require("../controllers/visualize-image/getImageDescription");
const getVisualizeImage = require("../controllers/visualize-image/visualizeImage.controllers");

const visualizeImageRouter = express.Router();

visualizeImageRouter.post("/", getVisualizeImage, (req, res) => {
  getImageDescription(req.file.filename)
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
