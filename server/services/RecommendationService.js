// services/RecommendationService.js

import Car from "../models/Car.js";

class RecommendationService {

  // ============================
  // Find Me A Car
  // ============================

  async findCars(preferences) {
    const filter= {};
    if(preferences.maxBudget){
      filter.price={$lte:preferences.maxBudget};
    }
    if(preferences.fuelType){
      filter["specs.fuelType"]=preferences.fuelType;
    }
//     if(preferences.transmission){
//       if(preferences.transmission ==="Automatic"){
//         filter["specs.transmisison"]={
//           $in:["Automatic", "CVT" ,"AMT" , "DCT"]
//         };
//       }
//       else if(preferences.transmission){
//  filter["specs.transmission"]=preferences.transmission;
//       }
     
//     }
    if(preferences.bodyType){
      filter["specs.bodyType"]=preferences.bodyType;
    }
console.log("filter",filter);

    const cars = await Car.find(filter).lean();
console.log('cars found',cars.length);
console.log(filter);
    const rankedCars = cars
      .map(car => ({
        car,
        score: this.calculateScore(car, preferences)
      }))
      .sort((a, b) => b.score - a.score);

    return rankedCars.slice(0, 5).map(({ car, score },index) => {
  const reasons = [];
        if(index ===0 ){
          reasons.push('Best overall recommendation based on your preferences');
        }
        else if(index===1){
          reasons.push("Excellent alternative with a strong overall score");
        }
        else {
          reasons.push("Worth considering based on your seleced preferences");
        }
  // Score-based recommendation
  if (score >= 85) {
    reasons.push("Best overall match for your preferences.");
  } else if (score >= 70) {
    reasons.push("Strong match based on your preferences.");
  } else {
    reasons.push("Good alternative worth considering.");
  }

  // Safety
  if (car.safetyRating === 5) {
    reasons.push("Best choice if safety is your highest priority.");
  }

  // Mileage
  if (car.specs.mileage >= 20) {
    reasons.push("Excellent mileage with lower running cost.");
  }

  // Budget
  if (
    preferences.maxBudget &&
    car.price <= preferences.maxBudget * 0.8
  ) {
    reasons.push(
      "Great value for money while staying within your budget."
    );
  }

  // Body Type
  if (car.specs.bodyType === "SUV") {
    reasons.push(
      "Ideal for family trips and highway driving."
    );
  }

  return {
    car,
    score,
    reason: reasons.join(" "),
  };
});
  }

  // ============================
  // Compare Shortlisted Cars
  // ============================

  async compareCars(carIds) {

    const cars = await Car.find({
      _id: { $in: carIds }
    }).lean();
    console.log("SELECTED IDS:",carIds);
    console.log("cars Returned: ",cars.length);

  return cars;

  }

  // ============================
  // Main Scoring Function
  // ============================

  calculateScore(car, preferences) {

    let score = 0;

    // ------------------------
    // Budget
    // ------------------------

    if (
      preferences.maxBudget &&
      car.price <= preferences.maxBudget
    ) {
      score += 40;
    }

    // ------------------------
    // Fuel Type
    // ------------------------

    if (
      preferences.fuelType &&
      car.specs.fuelType === preferences.fuelType
    ) {
      score += 20;
    }

    // ------------------------
    // Transmission
    // ------------------------

   if(preferences.transmission){
    if(preferences.transmission === "Automatic" && ["Automatic", "CVT" ,"AMT","DCT"].includes(car.specs.transmission)){
      score+=15;
    }
    else if(car.specs.transmission ===preferences.transmission){
      sdcore+=15;
    }
   }

    // ------------------------
    // Body Type
    // ------------------------

    if (
      preferences.bodyType &&
      car.specs.bodyType === preferences.bodyType
    ) {
      score += 10;
    }

    // ------------------------
    // Mileage
    // ------------------------

    if (
      preferences.minMileage &&
      car.specs.mileage >= preferences.minMileage
    ) {
      score += 5;
    }
        if(car.averageRating>=4.5){
            score+=5;
        }
    // ------------------------
    // Safety
    // ------------------------

    score+=car.safetyRating * 2;

    return score;
  }

}

export default new RecommendationService();