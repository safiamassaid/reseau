import React, { useState, useEffect } from "react";
import "../css/login.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

function Signup() {
  const animateLabel = (text) => {
    return text.split("").map((letter, idx) => (
      <span key={idx} style={{ transitionDelay: `${idx * 50}ms` }}>
        {letter}
      </span>
    ));
  };

  const [labelsAnimated, setLabelsAnimated] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [adresse, setAdresse] = useState('');
  const [bio, setBio] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setLabelsAnimated(true);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmationPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    const userData = {
      
      nom,
      prenom,
      username,
      email,
      telephone,
      bio,
      adresse,
      password,
      confirmationPassword,
    };

    try {

      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        throw new Error("Échec de l'inscription");
      }

      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Échec de l'inscription");
    }
  }


  return (
    <div className="tt">
      <div className="container">
        <div className="saf">
      
          <form className="inc" onSubmit={handleSubmit}>
   
            <div className="logo">
              <h1>
                Socié <span>Net</span>
              </h1>
              <img src={logo} alt="logo" />
            </div>
            {message && <p  className="succ" >{message}</p>}
            <div className={`clas ${labelsAnimated ? 'animate' : ''}`}>
              <div className="form-control">
                <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
                <label>{animateLabel('Nom')}</label>
              </div>

              <div className="form-control">
                <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                <label>{animateLabel('Prénom')}</label>
              </div>
            </div>
            <div className="form-control">
                <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} required />
                <label>{animateLabel('Bio')}</label>
              </div>
            

            <div className={`clas ${labelsAnimated ? 'animate' : ''}`}>
              <div className="form-control">
                <input type="text"
                 value={username}
                 onChange={(e)=>setUsername(e.target.value)}
                   required />
                <label>{animateLabel('Nom d\'utilisateur')}</label>
              </div>

              <div className="form-control">
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>{animateLabel('Email')}</label>
              </div>
            </div>

            <div className={`clas ${labelsAnimated ? 'animate' : ''}`}>
              <div className="form-control">
                <input type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} required />
                <label>{animateLabel('Adresse')}</label>
              </div>

              <div className="form-control">
                <input type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
                <label>{animateLabel('Numéro de téléphone')}</label>
              </div>
            </div>

            <div className={`clas ${labelsAnimated ? 'animate' : ''}`}>
              <div className="form-control">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <label>{animateLabel('Mot de passe')}</label>
              </div>

              <div className="form-control">
                <input type="password" value={confirmationPassword} onChange={(e) => setConfirmationPassword(e.target.value)} required />
                <label>{animateLabel('Confirmer votre mot de passe')}</label>
              </div>
            </div>

            <div className="bt">
              <button type="submit" className="btn">S'inscrire</button>
            </div>

        

            <p className="text">
              Vous avez déjà un compte ?{' '}
              <Link to="/" className="ms-2">
                Connexion
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;