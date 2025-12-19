// src/Pages/Home.js
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-text">
          <h1>Make Your City Safer</h1>
          <p>Report crimes instantly and help authorities respond faster.</p>
          <button onClick={() => navigate("/report/new")}>Report a Crime</button>
        </div>
        <div className="hero-image">
          <img src="/images/hero-banner.png" alt="City Safety" />
        </div>
      </section>
      <section className="about-brand">
        <h2>About SafeCity</h2>
        <p>
          SafeCity is a real-time crime reporting platform. Citizens can report
          incidents instantly, helping authorities respond quickly and efficiently.
        </p>
        <p>
          Our mission: Make every city safer with transparency, trust, and rapid action.
        </p>
      </section>

      <section className="features">
        <h2>Our Features</h2>
        <div className="cards">
          <div
            className="card"
            onClick={() => navigate("/report/new")}
            style={{ cursor: "pointer" }}
          >
            <img src="/images/report-crime.png" alt="report crime" />
            <h3>Citizen Reporting</h3>
          </div>
          <div
            className="card"
            onClick={() => navigate("/police")}
            style={{ cursor: "pointer" }}
          >
            <img src="/images/police-dashboard.png" alt="police dashboard" />
            <h3>Police Dashboard</h3>
          </div>

          <div
            className="card"
            onClick={() => navigate("/admin")}
            style={{ cursor: "pointer" }}
          >
            <img src="/images/admin-panel.png" alt="admin panel" />
            <h3>Admin Control</h3>
          </div>

          <div
            className="card"
            onClick={() => navigate("/myreports")}
            style={{ cursor: "pointer" }}
          >
            <img src="/images/my-reports.png" alt="my reports" />
            <h3>My Reports</h3>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
