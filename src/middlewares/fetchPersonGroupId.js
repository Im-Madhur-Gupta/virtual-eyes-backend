const User = require("../models/User");

const fetchPersonGroupID = async (req, res, next) => {
  // extracting the person_group_id from the queried user
  const user_id = req.user.user_id;
  const { person_group_id } = await User.findById(user_id);

  // storing the person_group_id in the request object
  req.user.person_group_id = person_group_id;
  return next();
};

module.exports = fetchPersonGroupID;
