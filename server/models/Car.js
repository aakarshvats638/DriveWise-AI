import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    variant: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    specs: {
      engine: String,
      fuelType: String,
      transmission: String,
      bodyType: String,
      mileage: Number,
    },

    safetyRating: {
      type: Number, // 1-5
      min: 1,
      max: 5,
    },
    averageRating:{
        type:Number,
        default:0,
    },
    reviewCount:{
        type:Number,
        default:0,
    },


    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

// Useful for filtering
carSchema.index({
  make: 1,
  model: 1,
  price: 1,
  "specs.fuelType": 1,
  "specs.transmission": 1,
});

export default mongoose.model("Car", carSchema);