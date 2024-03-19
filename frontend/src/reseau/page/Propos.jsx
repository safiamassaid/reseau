import React from 'react';
import './css/apr.css'; 
import {Link} from 'react-router-dom'
import logo from '../pht/logo.png';
import prf from '../pht/prf.jpg';
import monde from '../pht/apr (1).png';
import img from '../pht/apr (2).png';
import hello from '../pht/hello.png';
import Emoji from 'react-emoji-render';
import MonImage from '../pht/logo.png';
function Propos() {
    return(
    <div >
<nav>
  

<div className="logo">
<h1>Socié <span>Net</span></h1>
<img src={MonImage} alt="ui" width="30PX" />
</div>

<ul>

<li>

<Link to='/reseau/page/Acc'className="item"  style={{ '--hue': '200deg' }}>
  
<span className="icon mono" id="blur0" aria-hidden="true">
      <Emoji text=":house:" />
    </span>
    <span className="icon mono" aria-hidden="true">
      <Emoji text=":house:" />
    </span>
    <span
      className="icon midl"
      aria-hidden="true"
      style={{ backgroundImage: '-moz-element(#blur0)' }}
    >
      <Emoji text=":house:" />
    </span>
    <span className="icon grey" aria-hidden="true">
      <Emoji text=":house:" />
    </span>
  </Link>

</li>
<li>
<Link to='/reseau/page/Propos'className="item"  style={{ '--hue': '200deg' }}>
<span className="icon mono" id="blur1" aria-hidden="true">
      <Emoji text=":information_source:" />
    </span>
    <span className="icon mono" aria-hidden="true">
      <Emoji text=":information_source:" />
    </span>
    <span
      className="icon midl"
      aria-hidden="true"
      style={{ backgroundImage: '-moz-element(#blur1)' }}
    >
      <Emoji text=":information_source:" />
    </span>
    <span className="icon grey" aria-hidden="true">
      <Emoji text=":information_source:" />
    </span>
</Link>
</li>

<li>



</li>

<li>
<Link to='/reseau/page/Profil' className="item"  style={{ '--hue': '200deg' }}>
<span className="icon mono" id="blur3" aria-hidden="true">
      <Emoji text=":bust_in_silhouette:" />
    </span>
    <span className="icon mono" aria-hidden="true">
      <Emoji text=":bust_in_silhouette:" />
    </span>
    <span
      className="icon midl"
      aria-hidden="true"
      style={{ backgroundImage: '-moz-element(#blur3)' }}
    >
      <Emoji text=":bust_in_silhouette:" />
    </span>
    <span className="icon grey" aria-hidden="true">
      <Emoji text=":bust_in_silhouette:" />
    </span>
    </Link>
</li>



</ul>

<div className="id">

<img src={prf} alt="b" width="55PX" height="55PX" />
<div className="boule"></div>
<p>Massaidsafia</p>
</div>

</nav>

  
<div className="tttttt">


  
<div className="wrapper">
  <div className="contain">
    <h5>About</h5>
  </div>
</div>
    <div className="tout">

 <div className="tt">

      <div className="une">
      <div className="bloc">
  <img src={hello} alt="" width="60PX" />
  <p>HELLO on se retrouve sur  <h1>Socié <span>Net</span></h1>.</p>
</div>
<div className="bloc">
  <img src={monde} alt="" width="60PX"  />
  <p>Notre plateforme est un espace dynamique conçu pour connecter les personnes du monde entier. Ici, </p>
</div>
<div className="bloc">
  <img src={logo} alt="" width="50PX"  />
  <p>vous pourrez partager vos idées, découvrir de nouveaux horizons, et créer des liens significatifs avec d'autres membres passionnés comme vous voulez  </p>
</div>
<div className="bloc">
  <img src={img} alt="" width="60PX" />
  <p>Exprimez-vous à travers des publications, des photos, des vidéos.</p>
</div>
      </div>
 <div className="deux">


 </div>
 </div>
    </div>
    </div>
    </div>
    );
}
export default Propos;