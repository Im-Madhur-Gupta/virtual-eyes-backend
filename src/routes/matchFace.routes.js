const express = require("express");
const path = require("path");

const addFaceController = require("../controllers/match-face/addFace.controllers");
const getMultipleImageInReq = require("../middlewares/getMultipleImagesInReq");
const User = require("../models/User");

const matchFaceRouter = express.Router();

matchFaceRouter.post(
  "/add-face",
  async (req, res, next) => {
    // extracting the person_group_id from the queried user
    const user_id = req.user.user_id;
    const { person_group_id } = await User.findById(user_id);

    // storing the person_group_id in the request object
    req.user.person_group_id = person_group_id;
    return next();
  },
  getMultipleImageInReq,
  addFaceController
);

module.exports = matchFaceRouter;
