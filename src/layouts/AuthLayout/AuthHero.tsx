import "./AuthHero.css";

const AuthHero = () => {
  return (
    <div className="auth-hero">
      <div className="logo-container">
        <div className="logo-icon">
          <div className="logo-inner"></div>
        </div>
        <span>EV Lane</span>
      </div>

      <div className="badge">⚡ Enterprise EV Management Platform</div>

      <h1>
        Power the Future of
        <br />
        <span>EV Charging</span>
      </h1>

      <p>
        Manage vendors, stations, chargers, and sessions from a single platform.
        Real-time monitoring, analytics, and settlements — all in one place.
      </p>

      <div className="stats">
        <div className="stat-card">
          <h3>108</h3>
          <span>Active Stations</span>
        </div>
        <div className="stat-card">
          <h3>7,640</h3>
          <span>Sessions Today</span>
        </div>
        <div className="stat-card">
          <h3>₹24.8L</h3>
          <span>Revenue MTD</span>
        </div>
      </div>
    </div>
  );
};

export default AuthHero;
