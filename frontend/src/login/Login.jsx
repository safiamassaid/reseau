import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

import loginImage from "../images/login.jpg";
import "../css/login.css";

function Login() {
  const [labelsAnimated, setLabelsAnimated] = useState(false);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animation when the component mounts
    setLabelsAnimated(true);
  }, []);

  const animateLabel = (text) => {
    return text.split("").map((letter, idx) => (
      <span key={idx} style={{ transitionDelay: `${idx * 50}ms` }}>
        {letter}
      </span>
    ));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data.user);
        if (data.Status === "Success") {
          localStorage.setItem("currentUser", JSON.stringify(data.user[0]));
          navigate("/reseau/page/Acc", { state: { email: email } });
        } else {
          // Handle login failure
          setError(data.Message);
        }
      } else {
        setError("Échec de la connexion");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Échec de la connexion");
    }
  }
  return (
    <div className="tt">
      <div className="image">
        <img src={loginImage} alt="login" width="350PX" />
      </div>

      <div className="container">
        <div className="saf">
          <form onSubmit={handleSubmit}>
            <div className="logo">
              <h1>
                Socié <span>Net</span>
              </h1>
              <img src={logo} alt="logo" />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className={`form-control ${labelsAnimated ? "animate" : ""}`}>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>{animateLabel("Email")}</label>
            </div>

            <div className={`form-control ${labelsAnimated ? "animate" : ""}`}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>{animateLabel("Mot de passe")}</label>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Connecter
              </button>
            </div>

            <p className="text">
              Vous n'avez pas de compte ?{" "}
              <Link to="/Signup" className="ms-2">
                Inscription
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
