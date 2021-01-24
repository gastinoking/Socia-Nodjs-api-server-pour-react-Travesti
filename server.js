const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//Routes api
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

const app = express();

//bodyParser

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mogooseUrl;
//Connexion
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((data) => console.log(`Connected MongoDB: ${db}`))
  .catch((error) => console.log(error));

//Pasport
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Le serveur a démaré sur le port ${PORT} , et sur le lien http://localhost:${PORT}`
  )
);
