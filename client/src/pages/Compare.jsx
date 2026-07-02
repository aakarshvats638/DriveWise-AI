import { useEffect, useState } from "react";
import axios from "axios";
import "./Compare.css";

const Compare = () => {
  const [cars, setCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);
  const [comparison, setComparison] = useState([]);

  const [loadingCars, setLoadingCars] = useState(true);
  const [loadingCompare, setLoadingCompare] = useState(false);

  const [error, setError] = useState("");

  // ============================
  // Fetch Cars
  // ============================

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoadingCars(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cars`
      );

      setCars(response.data.data || []);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load cars."
      );
    } finally {
      setLoadingCars(false);
    }
  };

  // ============================
  // Select Cars
  // ============================

  const handleCheckbox = (id) => {
    setError("");

    if (selectedCars.includes(id)) {
      setSelectedCars(selectedCars.filter((carId) => carId !== id));
      return;
    }

    if (selectedCars.length >= 3) {
      setError("You can compare a maximum of 3 cars.");
      return;
    }

    setSelectedCars([...selectedCars, id]);
  };

  // ============================
  // Compare Cars
  // ============================

  const handleCompare = async () => {
    if (selectedCars.length < 2) {
      setError("Please select at least 2 cars.");
      return;
    }

    setLoadingCompare(true);
    setComparison([]);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/compare`,
        {
          carIds: selectedCars,
        }
      );

      setComparison(response.data.data || []);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Comparison failed."
      );
    } finally {
      setLoadingCompare(false);
    }
  };

  return (
    <div className="compare-page">

      <div className="compare-container">

        <h1>⚖️ Compare My Shortlist</h1>

        <p className="subtitle">
          Select up to 3 cars and compare them side by side.
        </p>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {/* Loading */}

        {loadingCars ? (
          <div className="loading">

            <div className="spinner"></div>

            <p>Loading Cars...</p>

          </div>
        ) : (
          <div className="cars-grid">

            {cars.map((car) => (
              <div
                key={car._id}
                className="car-card"
              >
                <input
                  type="checkbox"
                  checked={selectedCars.includes(car._id)}
                  onChange={() =>
                    handleCheckbox(car._id)
                  }
                />

                <h3>
                  {car.make} {car.model}
                </h3>

                <h4>{car.variant}</h4>

                <p>
                  <strong>Price:</strong> ₹
                  {car.price.toLocaleString("en-IN")}
                </p>

                <p>
                  <strong>Fuel:</strong>{" "}
                  {car.specs.fuelType}
                </p>

                <p>
                  <strong>Transmission:</strong>{" "}
                  {car.specs.transmission}
                </p>

                <p>
                  <strong>Mileage:</strong>{" "}
                  {car.specs.mileage} km/l
                </p>

                <p>
                  <strong>Safety:</strong>{" "}
                  ⭐ {car.safetyRating}/5
                </p>

              </div>
            ))}

          </div>
        )}

        <button
          className="compare-btn"
          onClick={handleCompare}
          disabled={loadingCompare}
        >
          {loadingCompare
            ? "Comparing..."
            : "Compare Cars"}
        </button>

        {/* Loading Compare */}

        {loadingCompare && (
          <div className="loading">

            <div className="spinner"></div>

            <p>Comparing Cars...</p>

          </div>
        )}

        {/* Comparison */}

        {comparison.length > 0 && (

          <>
            <h2 className="table-title">
              Comparison Result
            </h2>

            <div className="table-wrapper">

              <table className="compare-table">

                <thead>
                  <tr>
                    <th>Car</th>
                    <th>Price</th>
                    <th>Fuel</th>
                    <th>Transmission</th>
                    <th>Mileage</th>
                    <th>Safety</th>
                    <th>Rating</th>
                  </tr>
                </thead>

                <tbody>

                  {comparison.map((car) => (
                    <tr key={car._id}>

                      <td>
                        {car.make} {car.model}
                        <br />
                        <small>{car.variant}</small>
                      </td>

                      <td>
                        ₹
                        {car.price.toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      <td>{car.specs.fuelType}</td>

                      <td>
                        {car.specs.transmission}
                      </td>

                      <td>
                        {car.specs.mileage} km/l
                      </td>

                      <td>
                        ⭐ {car.safetyRating}/5
                      </td>

                      <td>
                        ⭐ {car.averageRating}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          </>

        )}

      </div>

    </div>
  );
};

export default Compare;