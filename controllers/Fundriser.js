const path = require("path");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Fundriser = require("../models/Fundriser");


exports.getfundrisers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
  });

  exports.getfundriser = asyncHandler(async (req, res, next) => {
    const fundriser = await Fundriser.findById(req.params.fundriserId);
  
    if (!fundriser) {
      return next(
        new ErrorResponse(
          `Fundriser not found with id of ${req.params.fundriserId}`,
          404
        )
      );
    }
  
    res.status(200).json({ success: true, data: fundriser });
  });
  // @desc      Create new fundriser
// @route     POST /api/v1/fundrisers
// @access    Private
exports.createfundriser = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;

  // Check for published fundrisers
  const publishedfundriser = await Fundriser.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one fundriser
  if (publishedfundriser && req.user.role !== "admin") {
     return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already  a fundriser`,
        400
     )
    );
   }

  const fundriser = await Fundriser.create(req.body);

  res.status(201).json({
    success: true,
    data: fundriser,
  });
});

exports.updatefundriser = asyncHandler(async (req, res, next) => {
    let fundriser = await Fundriser.findById(req.params.fundriserId);
  
    if (!fundriser) {
      return next(
        new ErrorResponse(
          `fundriser not found with id of ${req.params.fundriserId}`,
          404
        )
      );
    }
  
    fundriser = await Fundriser.findByIdAndUpdate(req.params.fundriserId, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({ success: true, data: fundriser });
  });

  exports.deletefundriser = asyncHandler(async (req, res, next) => {
    const fundriser = await Fundriser.findById(req.params.fundriserId);
  
    if (!fundriser) {
      return next(
        new ErrorResponse(
          `fundriser not found with id of ${req.params.fundriserId}`,
          404
        )
      );
    }
  
    
   
  
    fundriser.remove();
  
    res.status(200).json({ success: true, data: {} });
  });