const mongoose = require("mongoose");

const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

exports.connect = () => {
  // Connecting to the DB
  mongoose
    .connect(
      `mongodb+srv://admin:${MONGO_PASSWORD}@virtual-eyes-db.1ezvw.mongodb.net/UsersDB?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
