import React from "react";
import { useEffect, useState, useRef } from "react";
import "./css/acc.css";


import cmtr from "../pht/cmtr.png";
import love from "../pht/love (1).png";
import x from "../pht/x.png";
import env from "../pht/send.png";
import MonImage from "../pht/logo.png";

import { Link, useLocation } from "react-router-dom";
import Emoji from "react-emoji-render";
import "./css/header.css";

function Acc() {
  const location = useLocation();
  const userEmail = location.state?.email;
  const [userData, setUserData] = useState(null);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState();
  const flag = useRef(0);

  useEffect(() => {
    console.log(flag.current);
    if (flag.current < 10) {
      console.log(flag.current);

      flag.current = flag.current + 1;
      const a = localStorage.getItem("currentUser");

      setUser(JSON.parse(a));
      if (user) {
        fetch(`http://localhost:8000/user/${user?.email}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("User data response:", data);

            if (data.Status === "Success") {
              setUserData(data.user);
            } else {
              console.error("Error fetching user data:", data.Message);
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
    }
  }, [user]);

  const [showExplosion, setShowExplosion] = useState(false);
  const [explosionStyle, setExplosionStyle] = useState({});

  const handleLoveClick = (event) => {
    setExplosionStyle({
      display: "block",
      left: `100px`,
      top: `-10px`,
    });
    setShowExplosion(true);

    setTimeout(() => {
      setShowExplosion(false);
    }, 1000); // La durée pendant laquelle l'explosion de cœur est affichée en millisecondes
  };

  const [showModal, setShowModal] = useState(false);
  const [idpost, setIdPost] = useState();
  const [comments, setComments] = useState();

  const handleModalOpen = (id) => {
    setIdPost(id);
    setShowModal(true);
    fetch(`http://localhost:8000/${id}/comment`)
      .then((res) => res.json())
      .then((data) => {
        const postsWithUser = [];
        data.comments.forEach((post) => {
          fetch(`http://localhost:8000/users/${post.idus}`)
            .then((res) => res.json())
            .then((userData) => {
              const postWithUser = { ...post, user: userData };
              postsWithUser.push(postWithUser);

              console.log("User data response:", postWithUser);
              if (postsWithUser.length === data.comments.length) {
                setComments(postsWithUser);
              }
            });
        });
        console.log("User data response:", data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const [posts, setPosts] = useState([]);
  /*   useEffect(() => {
    fetch("http://localhost:8000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts));
  }, []); */

  useEffect(() => {
    fetch("http://localhost:8000/posts")
      .then((res) => res.json())
      .then((data) => {
        const postsWithUser = [];
        data.posts.forEach((post) => {
          fetch(`http://localhost:8000/users/${post.usid}`)
            .then((res) => res.json())
            .then((userData) => {
              const postWithUser = { ...post, user: userData };
              postsWithUser.push(postWithUser);

              if (postsWithUser.length === data.posts.length) {
                setPosts(postsWithUser);
              }
            });
        });
      });
  }, []);

  async function sendComment(e) {
    const a = localStorage.getItem("currentUser");

    const me = JSON.parse(a);

    e.preventDefault();
    console.log(idpost);
    if (comment === "") {
      alert("commentaire vide !");
    } else {
      const data = {
        contenu: comment,
        idus: me.id,
        idpost: idpost,
      };

      try {
        const res = await fetch("http://localhost:8000/addcomment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          const responseData = await res.json();

          alert("Commentaire ajouté avec succès");
          setShowModal(false);
        } else {
          alert("Échec de la connexion");
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi de la requête:", error);
      }
    }
  }

  return (
    <div>
      {userData && (
        <div className="acc">
          <nav>
            <div className="logo">
              <h1>
                Socié <span>Net</span>
              </h1>
              <img src={MonImage} alt="ui" width="30PX" />
            </div>

            <ul>
              <li>
                <Link
                  to="/reseau/page/Acc"
                  className="item"
                  style={{ "--hue": "200deg" }}
                >
                  <span className="icon mono" id="blur0" aria-hidden="true">
                    <Emoji text=":house:" />
                  </span>
                  <span className="icon mono" aria-hidden="true">
                    <Emoji text=":house:" />
                  </span>
                  <span
                    className="icon midl"
                    aria-hidden="true"
                    style={{ backgroundImage: "-moz-element(#blur0)" }}
                  >
                    <Emoji text=":house:" />
                  </span>
                  <span className="icon grey" aria-hidden="true">
                    <Emoji text=":house:" />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/reseau/page/Propos"
                  className="item"
                  style={{ "--hue": "200deg" }}
                >
                  <span className="icon mono" id="blur1" aria-hidden="true">
                    <Emoji text=":information_source:" />
                  </span>
                  <span className="icon mono" aria-hidden="true">
                    <Emoji text=":information_source:" />
                  </span>
                  <span
                    className="icon midl"
                    aria-hidden="true"
                    style={{ backgroundImage: "-moz-element(#blur1)" }}
                  >
                    <Emoji text=":information_source:" />
                  </span>
                  <span className="icon grey" aria-hidden="true">
                    <Emoji text=":information_source:" />
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/reseau/page/Profil"
                  className="item"
                  style={{ "--hue": "200deg" }}
                >
                  <span className="icon mono" id="blur3" aria-hidden="true">
                    <Emoji text=":bust_in_silhouette:" />
                  </span>
                  <span className="icon mono" aria-hidden="true">
                    <Emoji text=":bust_in_silhouette:" />
                  </span>
                  <span
                    className="icon midl"
                    aria-hidden="true"
                    style={{ backgroundImage: "-moz-element(#blur3)" }}
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

              <img
                src={`http://localhost:8000/${userData?.photo_profile}`}
                alt="b"
                width="55PX"
                height="55PX"
              />
              <div className="boule"></div>
              <p>{userData.nom}{userData.prenom} </p>
            </div>
          </nav>
          <div className=" vertical-section">
      

            <div className="pub">
              {posts?.map((post) => (
                <div className="pab" key={post.id}>
                  <div className="id">
                    <img
                      src={`http://localhost:8000/${post?.user?.photo_profile}`}
                      alt="b"
                      width="55PX"
                      height="55PX"
                    />
                    <h2>
                      {post.user.nom} {post.user.username}
                    </h2>
                  </div>
                  <div className="awal">
                    <p>{post.caption} </p>
                  </div>
                  <div className="image">
                    <img
                      src={`http://localhost:8000/${post.pht}`}
                      alt="rfgv"
                    />
                  </div>
                  <div className="dawn">
                    <div className="btn">
                      <div className="love-button-container">
                        <button
                          className="love-button"
                          onClick={handleLoveClick}
                        >
                          <p>Love</p>
                          <img src={love} width="40PX" alt="dhfbvf" />
                          {showExplosion && (
                            <div
                              className="explosion"
                              style={explosionStyle}
                            ></div>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="btn">
                      <div className="modal-button-container">
                        <button
                          className="love-button"
                          onClick={() => handleModalOpen(post.id)}
                        >
                          commentaire
                          <img src={cmtr} alt="URF" width="40PX" />
                        </button>
                        {showModal && (
                          <div className="modal-overlay">
                            <div className="modal">
                              <span
                                className="close"
                                onClick={handleModalClose}
                              >
                                <img src={x} alt="shb" width="50PX" />
                              </span>
                              <div className="comment">
                                {comments?.map((comment) => (
                                  <div className="ida">
                                    <img
                                      src={`http://localhost:8000/${comment?.user?.photo_profile}`}
                                      alt="b"
                                      width="55PX"
                                      height="55PX"
                                    />
                                    <div className="cmt">
                                      <h2>
                                        {comment?.user?.nom}
                                        {comment?.user?.username}
                                      </h2>
                                      <p>{comment.contenu}</p>
                                    </div>
                                  </div>
                                ))}
                                <div className="acc">
                                  <form>
                                    <input
                                      type="text"
                                      name="comment"
                                      id="cm"
                                      onChange={(e) =>
                                        setComment(e.target.value)
                                      }
                                    />
                                    <div className="rou">
                                      {/* <input
                                        name="image"
                                        alt="fkvb"
                                       
                                      /> */}
                                      <img
                                        src={env}
                                        alt="KJDFV"
                                        width="55PX"
                                        height="55PX"
                                        onClick={(e) => sendComment(e)}
                                      />
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Acc;
