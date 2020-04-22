const express = require("express");
const {
  getdonors,
  getdonor,
  createdonor,
  updatedonor,
  deletedonor,
} = require("../controllers/Donor");

const Donor = require("../models/Donor");
const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");


router
  .route("/")
  .get(advancedResults(Donor, "admin"), getdonors)
  .post(protect, authorize("donor", "admin"), createdonor);

router
  .route("/:donorId")
  .get(getdonor)
  .put(protect, authorize("donor", "admin"), updatedonor)
  .delete(protect, authorize("donor", "admin"), deletedonor);

module.exports = router;    