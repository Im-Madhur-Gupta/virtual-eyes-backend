const fs = require("fs");
const multer = require("multer");

const createMulterStorage = (destination) => {
  const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!destination) {
        destination = "./uploads/" + req.user.person_group_id;
        fs.mkdirSync(destination);
      }
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  return multerStorage;
};

module.exports = createMulterStorage;
