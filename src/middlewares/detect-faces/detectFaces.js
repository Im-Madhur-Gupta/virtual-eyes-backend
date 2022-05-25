require("dotenv").config();
const createReadStream = require("fs").createReadStream;

const faceServiceClient = require("../../configs/face-service");

const detectFaces = async (imagePath) => {
  let detectedFacesData = await faceServiceClient.face.detectWithStream(
    () => createReadStream(imagePath),
    {
      returnFaceAttributes: [
        "Accessories",
        "Age",
        "Emotion",
        "FacialHair",
        "Glasses",
        "Hair",
        "HeadPose",
        "Smile",
        "QualityForRecognition",
      ],
      // We specify detection model 1 because we are retrieving attributes.
      detectionModel: "detection_01",
      recognitionModel: "recognition_04",
    }
  );

  return detectedFacesData;
};

module.exports = detectFaces;
