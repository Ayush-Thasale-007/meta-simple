const User = require("../models/userModel");
const asyncHandler = require("../utils/catchAsync");

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
});
