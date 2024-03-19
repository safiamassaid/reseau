import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const [profile, setProfile] = useState();
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [component, setComponent] = useState(0);
  const [caption, setDescription] = useState("");
  const [pht, setImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const a = localStorage.getItem("currentUser");

    setUser(JSON.parse(a));
  }, []);
  async function handelSubmit(e) {
    const a = localStorage.getItem("currentUser");

    const me = JSON.parse(a);
    e.preventDefault();
    setError("");
    const formData = new FormData();
    formData.append("photo_profile", profile);

    const res = await fetch(`http://localhost:8000/${user.id}/profile`, {
      method: "PATCH",
      body: formData,
    });
    if (!res.ok) {
      return setError("error uploading file");
    }
    const data = await res.json();
    setUser({ ...user, photo_profile: data.image });
    return navigate("/reseau/page/Acc");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("pht", pht);

      const res = await fetch(`http://localhost:8000/${user.id}/addPost`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        return setError("error uploading file");
      }
      const data = await res.json();
      setUser({ ...user, photo_profile: data.image });

      navigate("/reseau/page/Acc");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "20%",
          backgroundColor: "#F17007",
          padding: "20px",
          borderRight: "1px solid #ccc",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={`http://localhost:8000/${user?.photo_profile}`}
            alt="Profile"
            style={{
              width: "220PX",
              height: "220PX",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid white",
            }}
          />
          <h3 style={{ margin: "10px 0",
        color:"white",
        fontSize:"1.7rem",
        }}>{user.nom}  {user.prenom} </h3>
        </div>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <li>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                borderBottom:"1PX solid white",
                fontSize: "17px",
                color:"white",
              }}
              onClick={() => setComponent(2)}
            >
              Mes informations
            </button>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
             borderBottom:"1PX solid white",
                color:"white",
                fontSize: "17px",
              }}
              onClick={() => setComponent(0)}
            >
              Modifier la photo de profile
            </button>
          </li>

          <li>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                borderBottom:"1PX solid white",
                color:"white",
                fontSize: "17px",
              }}
              onClick={() => setComponent(1)}
            >
              Nouvelle publication
            </button>
          </li>
          <div className="div">

      <Link to="/reseau/page/Acc" className="bton"
      
      style={{
        display:"flex"
        ,
        justifyContent:"center",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
   
        color:"white",
        fontSize: "20px",
      }}
      >
                    {" "}
                    acceuil{" "}
                  </Link></div>
        </ul>
      </div>

      {component === 0 && (
        <div   className="pfr"  style={{ 
          background:"white",
          width: "80%" }}>
          <div
            style={{
              height: "100dvh",
              width: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto",
            }}
          >
            <img
              src={`http://localhost:8000/${user?.photo_profile}`}
              alt="Profile"
              style={{
                width: "400px",
                height: "400px",
                marginTop: "-100px",
                aspectRatio: "1/1",
                overflow: "hidden",
                borderRadius: "50%",
                objectFit: "cover",

                border: "1px solid white",
              }}
              height="400"
              width="200"
            />


            <h2> photo de profil</h2>
            <form onSubmit={handelSubmit}>
              <label
                style={{
                  margin: "15px",
                  fontSize: "1.1rem",
                  color: "#161616",
                  width:"800PX",
                  fontWeight: "bold",
                }}
              >
                {" "}
               Modifier photo de profil{" "}
              </label>
              <input
                id="coverPicture"
                onChange={(e) => setProfile(e.target.files[0])}
                style={{
                  appearance: "none",
                  border: "1px solid #CBD5E0",
                  borderRadius: "0.375rem",
                  boxShadow:
                    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                  color: "#4A5568",
                  padding: "0.75rem 0.75rem",
                  width: "100%",
                  margin: "25px 0",
                }}
                type="file"
              />
              <button
             style={{
              padding: "15px",
              width: "100%",
              backgroundColor: "#F17007",
              color: "white",
              border:"none",
            }}
              >
                Submit
              </button>
              {error && (
                <p
                  style={{
                    color: "#dc3545",
                    fontSize: ".7rem",
                    backgroundColor: "pink",
                    padding: "15px",
                  }}
                >
                  {error}
                </p>
              )}
            </form>
          </div>  
        </div>
      )}

      {component === 1 && (
        <div   className="pub"
          style={{
            height: "100vh",
            width: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
            background:"white",
          }}
        >
          <div className="frm">
          <h2  >Cree votre Publication</h2>
          <form

            onSubmit={handleSubmit}
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <label htmlFor="caption" style={{ marginBottom: "10px" }}>
              Description:
            </label>
            <textarea
              id="description"
              value={caption}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100%",
                minHeight: "100px",
                marginBottom: "20px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
                resize: "vertical",
              }}
              required
            />
            <label htmlFor="image" style={{ marginBottom: "10px" }}>
              Image:
            </label>
            <input
              type="file"
              id="pht"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ marginBottom: "20px" }}
              required
            />
            <button
              type="submit"
               style={{
            padding: "15px",
            width: "100%",
            backgroundColor: "#F17007",
            color: "white",
            border:"none",
          }}
            >
              Submit
            </button>
            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
          </form>
        </div>   </div>
      )}
      {component === 2 && (
        <div style={{ width: "80%" }}>
          <div
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto",
              background:"white",
            }}
          >
            <h2> Informations</h2>
            <div>
              <p>
                <strong>Nom:</strong> {user.nom}
              </p>
              <p>
                <strong>Prénom:</strong> {user.username}
              </p>
              <p>
                <strong>Address:</strong> {user.adresse}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Telephone:</strong> {user.telephone}
              </p>
              <p>
                <strong>Bio:</strong> {user.bio}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
