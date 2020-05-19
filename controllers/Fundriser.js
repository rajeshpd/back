const path = require("path");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Fundriser = require("../models/Fundriser");


exports.getfundrisers = asyncHandler(async (req, res, next) => {
  const fundriser = await Fundriser.find().populate({
    path: "category",
    select: "catname",
  });

  return res.status(200).json({
    success: true,
    count: fundriser.length,
    data: fundriser,
  });
});
exports.getMe = asyncHandler(async (req, res, next) => {
  const fundriser = await Fundriser.findOne({ user: req.user.id }).populate({
    path: "category",
    select: "catname",
  });

  res.status(200).json({
    success: true,
    data: fundriser,
  });
});
  exports.getfundriser = asyncHandler(async (req, res, next) => {
    // if(Req.parms.id){
    const fundriser = await Fundriser.find({user:req.params.fundriserId});
    return res.status(200).json({
      success: true,
       count: fundriser.length,
      data: fundriser,
    });
  // } else {
  //   res.status(200).json(res.advancedResults);
  // }

    // if (!fundriser) {
    //   return next(
    //     new ErrorResponse(
    //       `Fundriser not found with id of ${req.params.fundriserId}`,
    //       404
    //     )
    //   );
    // }
  
    // res.status(200).json({ success: true, data: fundriser });
  });
  // @desc      Create new fundriser
// @route     POST /api/v1/fundrisers
// @access    Private
exports.createfundriser = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;

  // Check for published fundrisers
  // const publishedfundriser = await Fundriser.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one fundriser
  // if (publishedfundriser && req.user.role !== "admin") {
  //    return next(
  //     new ErrorResponse(
  //       `The user with ID ${req.user.id} has already  a fundriser`,
  //       400
  //    )
  //   );
  //  }

  const fundriser = await Fundriser.create(req.body);

  res.status(201).json({
    success: true,
    data: fundriser,
  });
});
// exports.addfundriser = asyncHandler(async (req, res, next) => {
//   // req.body.vendor = req.params.vendorId;
//   req.body.user = req.user.id;

//   req.body.photo = req.body.photo;
//   const fundriser = await Products.create(req.body);
//   res.status(200).json({
//     success: true,
//     data: fundriser,
//   });
// });

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
  
  // @desc      Upload photo for product
// @route     PUT /api/v1/vendors/:vendorsId/products/:productId/photo
// @access    Private
exports.fundriserPhotoUpload = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  file.mv(
    `${__dirname}/../../Frontend/public/uploads/${file.name}`,
    async (err) => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }

      const files = `/uploads/${file.name}`;

      res.status(200).json({
        success: true,
        data: files,
      });
    }
  );
});