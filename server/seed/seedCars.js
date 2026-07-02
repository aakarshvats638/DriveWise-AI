import mongoose from "mongoose";
import dotenv from "dotenv";
import Car from "../models/Car.js";

dotenv.config();

// ---------------------------
// Existing Cars Array
// ---------------------------

const cars = [
  {
    make: "Maruti",
    model: "Swift",
    variant: "ZXI",
    price: 899000,
    specs: {
      engine: "1.2L Petrol",
      fuelType: "Petrol",
      transmission: "Manual",
      bodyType: "Hatchback",
      mileage: 24.8,
    },
    safetyRating: 4,
    averageRating: 4.4,
    reviewCount: 185,
    reviews: [
      { userName: "Amit", rating: 5, comment: "Excellent mileage and smooth engine." },
      { userName: "Priya", rating: 4, comment: "Perfect city car with low maintenance." },
      { userName: "Rahul", rating: 4, comment: "Easy to drive and comfortable." },
    ],
  },
  {
    make: "Maruti",
    model: "Baleno",
    variant: "Alpha AMT",
    price: 1035000,
    specs: {
      engine: "1.2L Petrol",
      fuelType: "Petrol",
      transmission: "Automatic",
      bodyType: "Hatchback",
      mileage: 22.9,
    },
    safetyRating: 4,
    averageRating: 4.5,
    reviewCount: 210,
    reviews: [
      { userName: "Vikas", rating: 5, comment: "Spacious cabin and premium interiors." },
      { userName: "Neha", rating: 4, comment: "AMT makes city driving easy." },
      { userName: "Arjun", rating: 4, comment: "Good features for the price." },
    ],
  },
  {
    make: "Mahindra",
    model: "Scorpio N",
    variant: "Z8 Diesel",
    price: 1949000,
    specs: {
      engine: "2.2L Diesel",
      fuelType: "Diesel",
      transmission: "Manual",
      bodyType: "SUV",
      mileage: 16.2,
    },
    safetyRating: 5,
    averageRating: 4.7,
    reviewCount: 310,
    reviews: [
      { userName: "Sandeep", rating: 5, comment: "Powerful SUV with great road presence." },
      { userName: "Karan", rating: 5, comment: "Excellent highway performance." },
      { userName: "Deepak", rating: 4, comment: "Comfortable for long trips." },
    ],
  },
  {
    make: "Mahindra",
    model: "XUV700",
    variant: "AX7 AT",
    price: 2399000,
    specs: {
      engine: "2.0L Turbo Petrol",
      fuelType: "Petrol",
      transmission: "Automatic",
      bodyType: "SUV",
      mileage: 13.5,
    },
    safetyRating: 5,
    averageRating: 4.8,
    reviewCount: 420,
    reviews: [
      { userName: "Ankit", rating: 5, comment: "Feature-loaded and very comfortable." },
      { userName: "Rohit", rating: 5, comment: "ADAS works really well." },
      { userName: "Shiv", rating: 4, comment: "Smooth automatic gearbox." },
    ],
  },
  {
    make: "Hyundai",
    model: "Creta",
    variant: "SX(O)",
    price: 1895000,
    specs: {
      engine: "1.5L Petrol",
      fuelType: "Petrol",
      transmission: "CVT",
      bodyType: "SUV",
      mileage: 17.4,
    },
    safetyRating: 4,
    averageRating: 4.6,
    reviewCount: 355,
    reviews: [
      { userName: "Harsh", rating: 5, comment: "Best family SUV in this segment." },
      { userName: "Simran", rating: 4, comment: "Comfortable ride quality." },
      { userName: "Riya", rating: 5, comment: "Loaded with useful features." },
    ],
  },
  {
    make: "Hyundai",
    model: "Venue",
    variant: "SX Turbo DCT",
    price: 1325000,
    specs: {
      engine: "1.0L Turbo Petrol",
      fuelType: "Petrol",
      transmission: "Automatic",
      bodyType: "SUV",
      mileage: 18.3,
    },
    safetyRating: 4,
    averageRating: 4.5,
    reviewCount: 240,
    reviews: [
      { userName: "Akash", rating: 5, comment: "Great compact SUV for city use." },
      { userName: "Megha", rating: 4, comment: "Smooth DCT gearbox." },
      { userName: "Sahil", rating: 4, comment: "Good value for money." },
    ],
  },
  {
    make: "Tata",
    model: "Nexon",
    variant: "Fearless+",
    price: 1490000,
    specs: {
      engine: "1.2L Turbo Petrol",
      fuelType: "Petrol",
      transmission: "AMT",
      bodyType: "SUV",
      mileage: 17.2,
    },
    safetyRating: 5,
    averageRating: 4.7,
    reviewCount: 390,
    reviews: [
      { userName: "Manish", rating: 5, comment: "Safety is the biggest strength." },
      { userName: "Anu", rating: 5, comment: "Feels solid and premium." },
      { userName: "Raj", rating: 4, comment: "Comfortable suspension." },
    ],
  },
  {
    make: "Honda",
    model: "City",
    variant: "ZX CVT",
    price: 1685000,
    specs: {
      engine: "1.5L i-VTEC",
      fuelType: "Petrol",
      transmission: "Automatic",
      bodyType: "Sedan",
      mileage: 18.4,
    },
    safetyRating: 5,
    averageRating: 4.7,
    reviewCount: 265,
    reviews: [
      { userName: "Nitin", rating: 5, comment: "Refined engine and premium cabin." },
      { userName: "Gaurav", rating: 4, comment: "Excellent highway comfort." },
      { userName: "Pooja", rating: 5, comment: "Very reliable sedan." },
    ],
  },
  {
    make: "Kia",
    model: "Seltos",
    variant: "HTX IVT",
    price: 1875000,
    specs: {
      engine: "1.5L Petrol",
      fuelType: "Petrol",
      transmission: "Automatic",
      bodyType: "SUV",
      mileage: 17.7,
    },
    safetyRating: 5,
    averageRating: 4.6,
    reviewCount: 295,
    reviews: [
      { userName: "Ashish", rating: 5, comment: "Premium interiors and smooth drive." },
      { userName: "Komal", rating: 4, comment: "Excellent infotainment system." },
      { userName: "Yash", rating: 5, comment: "Feature-rich SUV." },
    ],
  },
  {
    make: "MG",
    model: "Hector",
    variant: "Sharp Pro CVT",
    price: 2299000,
    specs: {
      engine: "1.5L Turbo Petrol",
      fuelType: "Petrol",
      transmission: "Automatic",
      bodyType: "SUV",
      mileage: 14.0,
    },
    safetyRating: 5,
    averageRating: 4.5,
    reviewCount: 190,
    reviews: [
      { userName: "Rakesh", rating: 5, comment: "Huge cabin with premium feel." },
      { userName: "Shreya", rating: 4, comment: "Very comfortable for family trips." },
      { userName: "Vivek", rating: 4, comment: "Large touchscreen and good features." },
    ],
  },
];


const seedCars = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Optional: Clear existing data
    await Car.deleteMany();
    console.log("🗑️ Existing cars removed");

    // Insert new data
    await Car.insertMany(cars);
    console.log(`🚗 Successfully inserted ${cars.length} cars`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB Disconnected");
  }
};


seedCars();

