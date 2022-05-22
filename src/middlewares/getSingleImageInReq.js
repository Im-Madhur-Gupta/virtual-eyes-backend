const multer = require("multer");
const createMulterStorage = require("../utils/createMulterStorage");

const multerStorage = createMulterStorage("./uploads");

const getSingleImageInRequest = multer({ storage: multerStorage }).single(
  "image"
);

module.exports = getSingleImageInRequest;
