const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

/**
 * @route GET api/profile/test
 * @desc Test posts route
 * @access Public
 */
router.get("/test", (req, res) =>
  res.json({ msg: "Bienvenue sur /api/users/profiles" })
);

/**
 * @route GET api/profile
 * @desc get user profil
 * @access Private
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "Pas encore de profile pour cet utilisateur !";
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch((err) => res.status(404).json());
  }
);

module.exports = router;
