// controllers/recommendationController.js

import Car from "../models/Car.js";
import RecommendationService from "../services/RecommendationService.js";

// ==============================
// GET /cars
// ==============================

export const getCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ make: 1, model: 1 });

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cars",
      error: error.message,
    });
  }
};

// ==============================
// POST /recommend
// ==============================

export const recommendCars = async (req, res) => {
  try {
    const recommendations = await RecommendationService.findCars(req.body);

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate recommendations",
      error: error.message,
    });
  }
};

// ==============================
// POST /compare
// ==============================

export const compareCars = async (req, res) => {
  try {
    const { carIds } = req.body;

    if (!carIds || !Array.isArray(carIds) || carIds.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least two car IDs.",
      });
    }

    const comparison = await RecommendationService.compareCars(carIds);

    res.status(200).json({
      success: true,
      count: comparison.length,
      data: comparison,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to compare cars",
      error: error.message,
    });
  }
};