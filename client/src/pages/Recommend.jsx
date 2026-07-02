import { useState } from "react";
import axios from "axios";
import "./Recommend.css";

const Recommend = () => {
  const [formData, setFormData] = useState({
    maxBudget: "",
    fuelType: "",
    transmission: "",
    bodyType: "",
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setRecommendations([]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/recommend`,
        {
          maxBudget: Number(formData.maxBudget),
          fuelType: formData.fuelType,
          transmission: formData.transmission,
          bodyType: formData.bodyType,
        }
      );

      setRecommendations(response.data.data || []);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to fetch recommendations."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recommend-page">
      <div className="recommend-container">

        <h1>🚗 Find Me a Car</h1>

        <p className="subtitle">
          Tell us your preferences and we'll recommend the best cars.
        </p>

        <form onSubmit={handleSubmit} className="recommend-form">

          <div className="form-group">
            <label>Maximum Budget (₹)</label>

            <input
              type="number"
              name="maxBudget"
              placeholder="e.g. 1500000"
              value={formData.maxBudget}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Fuel Type</label>

            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
            >
              <option value="">Any</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              
            </select>
          </div>

          <div className="form-group">
            <label>Transmission</label>

            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
            >
              <option value="">Any</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          <div className="form-group">
            <label>Body Type</label>

            <select
              name="bodyType"
              value={formData.bodyType}
              onChange={handleChange}
            >
              <option value="">Any</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
            </select>
          </div>

          <button
            type="submit"
            className="recommend-btn"
            disabled={loading}
          >
            {loading ? "Finding Cars..." : "Recommend Cars"}
          </button>
        </form>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Finding the best cars for you...</p>
          </div>
        )}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {recommendations.length > 0 && (
          <>
            <h2 className="result-title">
              Recommended Cars
            </h2>

            <div className="results-grid">

              {recommendations.map((item, index) => {
                const car = item.car || item;

                return (
                  <div
                    key={car._id || index}
                    className="car-card"
                  >
                    <h3>
                      {car.make} {car.model}
                    </h3>

                    <h4>{car.variant}</h4>

                    <p>
                      <strong>Price:</strong> ₹
                      {car.price?.toLocaleString("en-IN")}
                    </p>

                    <p>
                      <strong>Fuel:</strong>{" "}
                      {car.specs?.fuelType}
                    </p>

                    <p>
                      <strong>Transmission:</strong>{" "}
                      {car.specs?.transmission}
                    </p>

                    <p>
                      <strong>Mileage:</strong>{" "}
                      {car.specs?.mileage} km/l
                    </p>

                    <p>
                      <strong>Safety:</strong>{" "}
                      ⭐ {car.safetyRating}/5
                    </p>

                    <p className="score">
                      Recommendation Score:
                      <span>
                        {" "}
                        {item.score ?? "N/A"}
                      </span>
                    </p>

                    {item.reason && (
                      <div className="reason">
                        <strong>🤖 AI Recommendation</strong>

                        <p>{item.reason}</p>
                      </div>
                    )}
                  </div>
                );
              })}

            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Recommend;