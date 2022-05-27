const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: (email) => validator.isEmail(email),
  },
  password: { type: String, trim: true, required: true, minlength: 8 },
  name: { type: String, default: null },
  person_group_id: { type: String, required: true },
  token: { type: String },
});

module.exports = mongoose.model("User", userSchema);
