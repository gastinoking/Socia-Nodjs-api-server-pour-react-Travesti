const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const pasport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const bcrypt = require("bcryptjs");
const key = require("../../config/keys");
const jwt = require("jsonwebtoken");

/**
 * @route GET api/users/test
 * @desc Test posts route
 * @access Public
 */
router.get("/test", (req, res) =>
  res.json({ msg: "Bienvenue sur /api/users/test" })
);

/**
 * @route POST api/users/register
 * @desc register
 * @access Public
 */
router.post("/register", async (req, res) => {
  const { errors, isValide } = validateRegisterInput(req.body);
  //Check validation

  if (!isValide) {
    return res.status(422).json(errors);
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      errors.email = "le Email est déja urilisé !";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //SIze
        r: "pg", //Rating
        d: "mm", //defaulte
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((error) => console.log(error));
        });
      });
    }
  } catch (error) {
    console.log("error = ", error);
  }
});

/**
 * @route POST api/users/login
 * @desc login
 * @access Public
 */
router.post("/login", async (req, res) => {
  const { errors, isValide } = validateLoginInput(req.body);

  if (!isValide) {
    return res.status(200).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      errors.email = " Aucun utilisateur ne correspond à ce email";
      return res.status(404).json(errors);
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        //    User correspond
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        };
        jwt.sign(
          payload,
          key.secretOrKey,
          { expiresIn: 3600 * 24 * 10 },
          (err, token) => {
            res.json({
              succes: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Login ou mot de pass invalide";
        return res.status(400).json(errors);
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});

/**
 * @route POST api/users/current
 * @desc Reture   current  user
 * @access Private
 */

router.get(
  "/current",
  pasport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
    });
  }
);

module.exports = router;
