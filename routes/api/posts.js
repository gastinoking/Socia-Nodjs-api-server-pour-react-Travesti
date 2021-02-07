const express = require("express");
const router = express.Router();
const mongoose = require("mongodb");
const passport = require("passport");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const validatePostInput = require("../../validation/post");
/**
 * @route GET api/posts/test
 * @desc Test posts route
 * @access Public
 */
router.get("/test", (req, res) =>
  res.json({ msg: "Bienvenue sur /api/users/posts" })
);

/**
 * @route POST api/posts
 * @desc Create posts route
 * @access Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const { errors, isValide } = validatePostInput(req.body);

    if (!isValide) {
      return res.status(401).json(errors);
    }
    console.log("ici");
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });

    newPost.save().then((data) => res.json(data));
  }
);

/**
 * @route GET api/posts
 * @desc Fetch all posts route
 * @access Public
 */
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .populate("user", ["name", "avatoar"])
    .then((data) => res.json(data))
    .catch((error) => res.status(404).json({ nopost: "pas de posts" }));
});

/**
 * @route GET api/posts/:id
 * @desc Fetch one post
 * @access Public
 */
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .sort({ date: -1 })
    .populate("user", ["name", "avatoar"])
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(404).json({ nopost: "pas de post pour ce id" })
    );
});

/**
 * @route GET api/posts/:id
 * @desc DETELE one post
 * @access Private
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Post.findById(req.params.id)
          .then((post) => {
            if (post.user.toString() !== req.user.id) {
              return res.status(401).json({
                notauthorized:
                  "vous n'est pas autorisé à accéder à cette resource !",
              });
            }
            post.remove().then(() => res.json({ success: true }));
          })
          .catch((errors) => res.json({ notfound: "Cet post n'existe pas" }));
      })
      .catch((errors) => res.json(errors));
  }
);

module.exports = router;
