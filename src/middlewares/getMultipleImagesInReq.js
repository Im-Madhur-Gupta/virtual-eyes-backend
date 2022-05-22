const multer = require("multer");
const createMulterStorage = require("../utils/createMulterStorage");

const multerStorage = createMulterStorage();

const getMultipleImageInReq = multer({ storage: multerStorage }).array(
  "images"
);

module.exports = getMultipleImageInReq;
