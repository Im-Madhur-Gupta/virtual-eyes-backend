const fs = require("fs");
const multer = require("multer");

const createMulterStorage = () => {
  const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      const destPath = "./uploads/" + req.user.user_id;
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
      }
      cb(null, destPath);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  return multerStorage;
};

module.exports = createMulterStorage;
