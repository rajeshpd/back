const express = require("express");
const {
  getfundrisers,
  getfundriser,
  createfundriser,
  updatefundriser,
  deletefundriser,
} = require("../controllers/Fundriser");

const Fundriser = require("../models/Fundriser");
const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");


router
  .route("/")
  .get(advancedResults(Fundriser, "admin"), getfundrisers)
  .post(protect, authorize("fundriser", "admin"), createfundriser);

router
  .route("/:fundriserId")
  .get(getfundriser)
  .put(protect, authorize("fundriser", "admin"), updatefundriser)
  .delete(protect, authorize("fundriser", "admin"), deletefundriser);

module.exports = router;