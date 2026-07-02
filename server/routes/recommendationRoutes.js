// routes/recommendationRoutes.js

import express from "express";
const router = express.Router();

import {
  getCars,
  recommendCars,
  compareCars,
} from "../controllers/recommendationController.js";

router.get("/cars", getCars);

router.post("/recommend", recommendCars);

router.post("/compare", compareCars);

export default router;