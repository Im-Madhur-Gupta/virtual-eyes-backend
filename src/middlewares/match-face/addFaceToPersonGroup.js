const { createReadStream, rm } = require("fs");
const path = require("path");

const faceServiceClient = require("../../configs/face-service");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function WaitForPersonGroupTraining(person_group_id) {
  // Wait so we do not exceed rate limits.
  console.log("Waiting 1 second...");
  await sleep(1000);
  let result = await faceServiceClient.personGroup.getTrainingStatus(
    person_group_id
  );
  console.log("Training status: " + result.status + ".");
  if (result.status !== "succeeded") {
    await WaitForPersonGroupTraining(person_group_id);
  }
}

async function addFacesToPersonGroup(
  faceName,
  faceImages,
  personGroupId,
  userId
) {
  console.log("Adding faces to person group...");
  // The similar faces will be grouped into a single person group -> person.

  // Wait briefly so we do not exceed rate limits.
  await sleep(1000);

  let person = await faceServiceClient.personGroupPerson.create(personGroupId, {
    name: faceName,
  });
  console.log("Create a persongroup person: " + faceName + ".");

  // Add faces to the person group person.
  await Promise.all(
    faceImages.map(async function (similar_image) {
      // Check if the image is of sufficent quality for recognition.
      let sufficientQuality = true;
      const imgPath = path.join("./", "uploads", userId, similar_image);

      let detectedFaces = await faceServiceClient.face.detectWithStream(
        () => createReadStream(imgPath),
        {
          returnFaceAttributes: ["QualityForRecognition"],
          detectionModel: "detection_03",
          recognitionModel: "recognition_03",
        }
      );
      detectedFaces.forEach((detectedFace) => {
        if (detectedFace.faceAttributes.qualityForRecognition != "high") {
          sufficientQuality = false;
        }
      });

      // Quality is sufficent, add to group.
      if (sufficientQuality) {
        console.log(
          "Add face to the person group person: (" +
            faceName +
            ") from image: " +
            similar_image +
            "."
        );
        await faceServiceClient.personGroupPerson.addFaceFromStream(
          personGroupId,
          person.personId,
          () => createReadStream(imgPath)
        );
      }
    })
  );

  console.log("Done adding faces to person group.");

  // Start to train the person group.
  console.log();
  console.log("Training person group: " + personGroupId + ".");
  await faceServiceClient.personGroup.train(personGroupId);

  await WaitForPersonGroupTraining(personGroupId);

  // remove the directory which we created to store the images
  const dirPath = path.join("./", "uploads", userId);
  rm(dirPath, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });
}

module.exports = addFacesToPersonGroup;
