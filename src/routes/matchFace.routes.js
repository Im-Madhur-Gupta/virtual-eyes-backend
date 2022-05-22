const express = require("express");

const addFaceController = require("../controllers/match-face/addFace.controllers");
const findFacesController = require("../controllers/match-face/findFaces.controllers");
const fetchPersonGroupID = require("../middlewares/fetchPersonGroupId");
const getMultipleImageInReq = require("../middlewares/getMultipleImagesInReq");
const getSingleImageInRequest = require("../middlewares/getSingleImageInReq");

const matchFaceRouter = express.Router();

// route to add a post to the person group corresponding to the user
matchFaceRouter.post(
  "/add-face",
  fetchPersonGroupID,
  getMultipleImageInReq,
  addFaceController
);

matchFaceRouter.post(
  "/find-faces",
  fetchPersonGroupID,
  getSingleImageInRequest,
  findFacesController
);

module.exports = matchFaceRouter;
