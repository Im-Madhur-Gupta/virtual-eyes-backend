const addFacesToPersonGroup = require("../../middlewares/match-face/addFaceToPersonGroup");

const addFaceController = async (req, res) => {
  console.log("RECIEVED ARRAY OF FILES -", req.files);
  console.log("REQUEST BODY -", req.body);
  console.log("PERSON GROUP ID -", req.user.person_group_id);
  // we dont have to await for adding the faces to the person group to complete
  addFacesToPersonGroup(
    req.body.face_name,
    req.files.map((file) => file.filename),
    req.user.person_group_id
  );
  res.send({
    message:
      "Faces have been added to the person group corresponding to the user. Training of the person group has also completed.",
  });
};

module.exports = addFaceController;
