const msRest = require("@azure/ms-rest-js");
const Face = require("@azure/cognitiveservices-face");

const key = process.env.FACE_SERVICE_API_KEY;
const endpoint = process.env.FACE_SERVICE_API_ENDPOINT;

const credentials = new msRest.ApiKeyCredentials({
  inHeader: { "Ocp-Apim-Subscription-Key": key },
});

const faceServiceClient = new Face.FaceClient(credentials, endpoint);

module.exports = faceServiceClient;
