import "../stylings/Landing.css";
import Background from "./Background.jsx";

export default function Landing() {
  return (
    <>
      
      <Background />

  
      <div className="landing-page">
        <div className="landing-container">
          <h1>Welcome to Habit-Reboot</h1>

          <p className="quote">
            “Small habits, repeated daily, create remarkable change.”
          </p>

          <p className="description">
            Habit-Reboot helps you track, reflect, and regain control of your
            daily routines — without pressure or guilt.
          </p>

          <div className="features">
            <p> Track habits effortlessly</p>
            <p> Visualize your progress</p>
            <p> Reset and restart anytime</p>
          </div>
        </div>
      </div>
    </>
  );
}
