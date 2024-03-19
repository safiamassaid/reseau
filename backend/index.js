const express = require("express");
const mysql = require("mysql");

const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt"); // Ajoutez cette ligne pour utiliser bcrypt
const app = express();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./upload",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });
app.use(cors());
app.use(express.json());

app.use(express.static("upload"));

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "socienet",
});

app.get("/users/:id", function (req, res) {
  const userId = req.params.id;
  const sql = "SELECT * FROM user WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }
    const user = result[0];
    res.json(user);
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login request with email:", email);

  const query = "SELECT * FROM user WHERE  email=?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Error searching for user:", err);
      res
        .status(500)
        .json({ Status: "Failed", Message: "Error searching for user" });
    } else {
      if (results.length > 0) {
        const user = results[0];
        console.log("Password from request:", password);
        console.log("Hashed password from database:", user.password);

        const match = await bcrypt.compare(password, user.password);
        console.log("Match:", match);

        if (!match) {
          console.log("Password mismatch ");
          res.json({ Status: "Failed", Message: "Identifiants incorrects" });
        } else {
          res.json({ Status: "Success", user: results });
        }
      } else {
        console.log("User not found");
        res.json({ Status: "Failed", Message: "Utilisateur non trouvé" });
      }
    }
  });
});

app.post("/register", async (req, res) => {
  const { nom, email, bio, adresse, password, telephone, username } = req.body;
  const photo_profile = "defaultProfilePicture.jpg";
  const hashedPassword = await bcrypt.hash(password, 10);
  // Enregistrez hashedPassword dans la base de données
  // Hachez le mot de passe avec bcrypt

  const query =
    "INSERT INTO user (nom, email, bio, adresse, password, telephone, username, photo_profile) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [
      nom,
      email,
      bio,
      adresse,
      hashedPassword,
      telephone,
      username,
      photo_profile,
    ],
    (err, result) => {
      if (err) {
        console.error("Error registering user:", err);
        res
          .status(500)
          .json({ success: false, message: "Registration failed" });
      } else {
        res.json({ success: true, message: "Registration successful" });
      }
    }
  );
});

app.get("/posts", function (req, res) {
  const query = "SELECT * FROM post";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query: " + err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json({ posts: results });
  });
});

// Add a new route to fetch user data by email
app.get("/user/:email", (req, res) => {
  const email = req.params.email;
  console.log(email);
  const query = "SELECT * FROM user WHERE email=?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      res
        .status(500)
        .json({ Status: "Failed", Message: "Error fetching user data" });
    } else {
      if (results.length > 0) {
        const user = results[0];
        res.json({ Status: "Success", user });
      } else {
        res.json({ Status: "Failed", Message: "User not found" });
      }
    }
  });
});
app.get("/notif", (req, res) => {
  const query = "SELECT * FROM notf";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching notification data:", err);
      res.status(500).json({
        Status: "Failed",
        Message: "Error fetching notification data",
      });
    } else {
      if (results.length > 0) {
        // Send the array of notifications in the response
        res.json({ Status: "Success", notifications: results });
      } else {
        res.json({ Status: "Failed", Message: "No notifications found" });
      }
    }
  });
});
app.patch("/:id/profile", upload.single("photo_profile"), function (req, res) {
  // Vérifiez si un fichier a été téléchargé
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const photoProfileFile = req.file;
  const photoProfilePath = photoProfileFile.path;
  console.log("Photo profile uploaded to:", photoProfilePath);

  // Mettez à jour le chemin de la photo de profil dans la base de données
  const query = "UPDATE user SET photo_profile = ? WHERE id = ?";
  db.query(
    query,
    [photoProfileFile.filename, req.params.id],
    (err, results) => {
      if (err) {
        console.error("Error updating user data:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "User not found." });
      }

      // Envoyez une réponse avec le nom de fichier de la photo de profil mise à jour
      return res.status(200).json({ image: photoProfileFile.filename });
    }
  );
});

app.post("/addComment", async (req, res) => {
  const { contenu, idus, idpost } = req.body;
  const query = "INSERT INTO coment (contenu, idus, idpost) VALUES (?, ?, ?)";

  db.query(query, [contenu, idus, idpost], (err, result) => {
    if (err) {
      console.error("Error registering comment:", err);
      res.status(500).json({ success: false, message: "Registration failed" });
    } else {
      res.json({ success: true, message: "Registration successful" });
    }
  });
});

app.get("/:id/comment", function (req, res) {
  const idPost = req.params.id;
  const query = "SELECT * FROM coment WHERE idpost = ?";

  db.query(query, [idPost], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query: " + err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json({ comments: results });
  });
});

app.post("/:userId/addPost", upload.single("pht"), async (req, res) => {
  const { userId } = req.params;
  const { caption } = req.body;
  const pht = req.file;

  const query = "INSERT INTO post (usid, caption, pht) VALUES (?,?,?)";

  db.query(query, [userId, caption, pht.filename], (err, result) => {
    if (err) {
      console.error("Error registering user:", err);
      res.status(500).json({ success: false, message: "Registration failed" });
    } else {
      res.json({ success: true, message: "Registration successful" });
    }
  });
});
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
