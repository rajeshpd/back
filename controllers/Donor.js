const path = require("path");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Donor = require("../models/Donor");


exports.getdonors = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
  });

  exports.getdonor = asyncHandler(async (req, res, next) => {
    const donor = await Donor.findById(req.params.donorId);
  
    if (!donor) {
      return next(
        new ErrorResponse(
          `donor not found with id of ${req.params.donorId}`,
          404
        )
      );
    }
  
    res.status(200).json({ success: true, data: donor });
  });
  // @desc      Create new donor
// @route     POST /api/v1/donors
// @access    Private
exports.createdonor= asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;

  // Check for published donor
  const publisheddonor = await Donor.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one donor
  if (publisheddonor && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already  a donor`,
        400
      )
    );
  }

  const donor = await Donor.create(req.body);

  res.status(201).json({
    success: true,
    data: donor,
  });
});

exports.updatedonor = asyncHandler(async (req, res, next) => {
    let donor = await Donor.findById(req.params.donorId);
  
    if (!donor) {
      return next(
        new ErrorResponse(
          `donor not found with id of ${req.params.donorId}`,
          404
        )
      );
    }
  
    donor = await Donor.findByIdAndUpdate(req.params.donorId, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({ success: true, data: donor });
  });

  exports.deletedonor = asyncHandler(async (req, res, next) => {
    const donor = await Donor.findById(req.params.donorId);
  
    if (!donor) {
      return next(
        new ErrorResponse(
          `donor not found with id of ${req.params.donorId}`,
          404
        )
      );
    }
  
    
   
  
    donor.remove();
  
    res.status(200).json({ success: true, data: {} });
  });