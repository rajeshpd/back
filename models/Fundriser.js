const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");

const FundriserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"]
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Please add a category"],
    },
    slug: String,
    phone: {
        type: String,
        required: [true, "Please add a number"],
        maxlength: [10, "Phone number can not be longer than 10 characters"]
        
      },
      email: {
        type: String,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please add a valid email"
        ]
      },
      
      address: {
        type: String,
        required: [true, "Please add an address"],
      },
      // location: {
      //   // GeoJSON Point
      //   type: {
      //     type: String,
      //     enum: ["Point"],
      //   },
      //   coordinates: {
      //     type: [Number],
      //     index: "2dsphere",
      //   },
      //   formattedAddress: String,
      //   street: String,
      //   city: String,
      //   state: String,
      //   zipcode: String,
      //   country: String,
      // },
      // // careers: {
      //   // Array of strings
      //   type: [String],
      //   required: true,
      //   enum: [
      //     "Web Development",
      //     "Mobile Development",
      //     "UI/UX",
      //     "Data Science",
      //     "Business",
      //     "Other"
      //   ]
      // },
      
      hospitalname: {
        type: String,
        required: [true, "Please add hospital name"],
      },
      doctorname: {
        type: String,
        required: [true, "Please add an address"],
      },
      doctorcontact: {
        type: String,
        maxlength: [10, "Phone number can not be longer than 10 characters"]
      },
      photo: {
        type: String,
        default: "no-photo.jpg",
      },
      aadhar: {
        type: String,
        maxlength: [12, "aadhar number can not be longer than 12 characters"]
      },
      bankaccountnumber: {
        type: String,
        maxlength: [11, "bank account number can not be longer than 11 characters"]
      },

      goalamount: {
        type: String,
        maxlength: [20, " 20 characters"]
      },
     
      createdAt: {
        type: Date,
        default: Date.now,
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );
  
  // Create bootcamp slug from the name
  // fundriserSchema.pre("save", function (next) {
  //   this.slug = slugify(this.name, { lower: true });
  //   next();
  //});
  
  // Geocode & create location field
  // FundriserSchema.pre("save", async function (next) {
  //   const loc = await geocoder.geocode(this.address);
  //   this.location = {
  //     type: "Point",
  //     coordinates: [loc[0].longitude, loc[0].latitude],
  //     formattedAddress: loc[0].formattedAddress,
  //     street: loc[0].streetName,
  //     city: loc[0].city,
  //     state: loc[0].stateCode,
  //     zipcode: loc[0].zipcode,
  //     country: loc[0].countryCode,
  //   };
  
    // Do not save address in DB
  //   this.address = undefined;
  //   next();
  // });
  
  // Cascade deleted
  // FundriserSchema.pre("remove", async function (next) {
  //   console.log(`Product being removed from Vendor ${this._id}`);
  //   await this.model("Products").deleteMany({ vendor: this._id });
  //   next();
  // });
  
  // Reverse populate with virtuals
  
  

          module.exports = mongoose.model("Fundriser", FundriserSchema);