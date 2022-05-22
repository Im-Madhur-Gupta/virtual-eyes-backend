"use strict";
const path = require("path");
const createReadStream = require("fs").createReadStream;

const getImageDescription = async (filename, computerVisionClient) => {
  try {
    // local image path
    const describeImagePath = path.join(
      path.dirname(require.main.filename),
      "/uploads",
      filename
    );

    // DescribeImageInStream takes a function that returns a ReadableStream, NOT just a ReadableStream instance.
    const captionLocal = (
      await computerVisionClient.describeImageInStream(() =>
        createReadStream(describeImagePath)
      )
    ).captions[0];
    return {
      description: captionLocal.text,
      confidence: captionLocal.confidence.toFixed(2),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = getImageDescription;
