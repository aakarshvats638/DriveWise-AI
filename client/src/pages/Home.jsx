import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
        <nav className="navbar">
            <h2> DriveWise Ai</h2>
            <div className="nav-links">
            <span onClick={()=>navigate("/")}>Home</span>
            <span onClick={()=>navigate("/recommend")}>Find Me A Car</span>
           <span onClick={()=>navigate("/compare")}>Compare</span>
        </div>

        </nav>
      <section className="hero">
        <div className="overlay">
          <h1>DriveWise Ai</h1>
          <h3>AI car Recommendation Platform</h3>
          <p>
            Find the perfect car for your lifestyle with intelligent
            recommendations and compare your shortlisted cars effortlessly.
          </p>
        </div>
      </section>

      <section className="features">
        <div className="card" onClick={() => navigate("/recommend")}>
          <div className="icon">🚙</div>

          <h2>Find Me a Car</h2>

          <p>
            Tell us your budget and preferences, and we'll recommend the best
            cars for you.
          </p>

          <button>Get Started</button>
        </div>

        <div className="card" onClick={() => navigate("/compare")}>
          <div className="icon">⚖️</div>

          <h2>Compare My Shortlist</h2>

          <p>
            Compare multiple cars side by side based on price, mileage,
            transmission and safety.
          </p>

          <button>Compare Cars</button>
        </div>
        <div className="card">
            <h2>Explore Cars</h2>
            <p> Browse top rated, newly launched and trending cars with details specification and real ownership review</p>

        </div>
        <button >Explore</button>
      </section>
    </div>
  );
};

export default Home;