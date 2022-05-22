const path = require("path");
const { createReadStream, rm } = require("fs");

const faceServiceClient = require("../../configs/face-service");

async function DetectFaceRecognize(imgPath) {
  // Detect faces from image URL. Since only recognizing, use the recognition model 4.
  // We use detection model 3 because we are only retrieving the qualityForRecognition attribute.
  // Result faces with quality for recognition lower than "medium" are filtered out.
  let detected_faces = await faceServiceClient.face.detectWithStream(
    () => createReadStream(imgPath),
    {
      detectionModel: "detection_03",
      recognitionModel: "recognition_04",
      returnFaceAttributes: ["QualityForRecognition"],
    }
  );
  return detected_faces.filter(
    (face) =>
      face.faceAttributes.qualityForRecognition == "high" ||
      face.faceAttributes.qualityForRecognition == "medium"
  );
}

const findFacesController = async (req, res, next) => {
  const personGroupId = req.user.person_group_id;
  const userId = req.user.user_id;
  const filename = req.file.filename;

  // Detect faces from source image url and only take those with sufficient quality for recognition.
  const imgPath = path.join("./", "uploads", userId, filename);
  let face_ids = (await DetectFaceRecognize(imgPath)).map(
    (face) => face.faceId
  );

  // Identify the faces in a person group.
  let results = await faceServiceClient.face.identify(face_ids, {
    personGroupId,
  });

  detectedPersons = [];

  await Promise.all(
    results.map(async (result) => {
      if (result.candidates && result.candidates.length > 0) {
        let person = await faceServiceClient.personGroupPerson.get(
          personGroupId,
          result.candidates[0].personId
        );
        const detectedPerson = {
          name: person.name,
          id: result.faceId,
          confidence: result.candidates[0].confidence,
        };
        detectedPersons.push(detectedPerson);
      }
    })
  );

  console.log(detectedPersons);
  res.send(detectedPersons);

  // remove the directory which we created to store the images
  const dirPath = path.join("./", "uploads", userId);
  rm(dirPath, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });
};

module.exports = findFacesController;
