const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// User model
const User = require("../../models/User");
const Profile = require("../../models/Profile");

const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationeInput = require("../../validation/education");

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
      .populate("user", ["name", "avatar"])
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

/**
 * @route GET api/profile/handle/handle
 * @desc get user profil by handle
 * @access Public
 */

router.get("/handle/:handle", async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.findOne({
      handle: req.params.handle,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      errors.noprofile = "Aucun profile ne correspond à : " + req.params.handle;
      return res.json(errors);
    }
    return res.status(404).json(profile);
  } catch (e) {
    errors.noprofile = "Un problème est survenu : ";
    errors.errors = e.toString();
    return res.status(404).json(errors);
  }
});

/**
 * @route GET api/profile/user/user_id
 * @desc get user profil by user_id
 * @access Public
 */

router.get("/user/:user_id", async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      errors.noprofile =
        "Aucun profile ne correspond à : " + req.params.user_id;
      return res.status(404).json(errors);
    }
    return res.json(profile);
  } catch (e) {
    errors.noprofile = "Un problème est survenu : ";
    errors.errors = e.toString();
    return res.status(404).json(errors);
  }
});

/**
 * @route GET api/profile/all
 * @desc get all profil
 * @access Public
 */
router.get("/all", async (req, res) => {
  const errors = {};
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    if (!profiles) {
      errors.noprofile = "Aucun profile trouvé";
      return res.status(404).json(errors);
    }
    return res.json(profiles);
  } catch (e) {
    errors.noprofile = "Un problème est survenu : ";
    errors.errors = e.toString();
    return res.status(404).json(errors);
  }
});

/**
 * @route POST api/profile
 * @desc SAVE user profil
 * @access Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValide } = validateProfileInput(req.body);

    // Check Errors
    if (!isValide) {
      return res.status(401).json(errors);
    }
    //Get fields
    const profileFields = {};

    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    //Split in to Array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    // /Social
    profileFields.social = {};

    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    if (req.body.date) profileFields.date = req.body.date;

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        //Create

        // Check if handle exixt
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = " handle existe déja !";
            res.status(400).json(errors);
          }
          // Save Profile
          new Profile(profileFields)
            .save()
            .then((profile) => res.json(profile));
        });
      }
    });
  }
);

/**
 * @route POST api/profile/experience
 * @desc SAVE user profil experience
 * @access Private
 */
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValide } = validateExperienceInput(req.body);

    // Check Errors
    if (!isValide) {
      return res.status(401).json(errors);
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      profile.experience.unshift(newExp);

      try {
        const saveProfile = await profile.save();
        res.json(saveProfile);
      } catch (error) {
        res.status(422).json(error);
      }
    } catch (error) {
      res.status(422).json(error);
    }
  }
);

/**
 * @route POST api/profile/education
 * @desc SAVE user profil education
 * @access Private
 */
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValide } = validateEducationeInput(req.body);

    // Check Errors
    if (!isValide) {
      return res.status(401).json(errors);
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      profile.education.unshift(newEdu);

      try {
        const saveProfile = await profile.save();
        res.json(saveProfile);
      } catch (error) {
        res.status(422).json(error);
      }
    } catch (error) {
      res.status(422).json(error);
    }
  }
);

/**
 * @route DELETE api/profile/experience/exp_id
 * @desc DELETE user profil experience
 * @access Private
 */
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      const removeIndex = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id);

      profile.experience.splice(removeIndex, 1);
      console.log(removeIndex);

      try {
        const saveProfile = await profile.save();
        res.json(saveProfile);
      } catch (error) {
        res.status(422).json(error);
      }
    } catch (error) {
      res.status(422).json(error);
    }
  }
);

/**
 * @route DELETE api/profile/education/edu_id
 * @desc DELETE user profil education
 * @access Private
 */
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    errors = {};
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      const removeIndex = profile.education
        .map((item) => item.id)
        .indexOf(req.params.edu_id);

      profile.education.splice(removeIndex, 1);
      if (removeIndex === -1) {
        errors.message = "L'education d'existe pas !";
        return res.status(404).json(errors);
      }
      try {
        const saveProfile = await profile.save();
        res.json(saveProfile);
      } catch (error) {
        res.status(422).json(error);
      }
    } catch (error) {
      res.status(422).json(error);
    }
  }
);

/**
 * @route DELETE api/profile/
 * @desc DELETE user and profil
 * @access Private
 */
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOneAndRemove({ user: req.user.id });

      try {
        const saveProfile = await User.findByIdAndRemove({ _id: req.user.id });
        res.json({ succes: true });
      } catch (error) {
        res.status(422).json(error);
      }
    } catch (error) {
      res.status(422).json(error);
    }
  }
);

module.exports = router;
