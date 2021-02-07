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
 * @route DETELE api/posts/:id
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

/**
 * @route DETELE api/posts/like/:id
 * @desc DETELE one post
 * @access Private
 */
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Post.findById(req.params.id)
          .then((post) => {
            const countLike = post.likes.filter(
              (like) => like.user.toString() === req.user.id
            ).length;
            if (countLike > 0) {
              return res.json({ deja: "vous avez déja liker ce post " });
            }
            post.likes.unshift({ user: req.user.id });
            post.save().then((savPost) => res.json(savPost));
          })
          .catch((errors) => res.json({ notfound: "Cet post n'existe pas" }));
      })
      .catch((errors) => res.json(errors));
  }
);

/**
 * @route DETELE api/posts/unlike/:id
 * @desc unlike one post
 * @access Private
 */
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Post.findById(req.params.id)
          .then((post) => {
            const countLike = post.likes.filter(
              (like) => like.user.toString() === req.user.id
            ).length;
            if (countLike === 0) {
              return res.json({
                deja: "vous avez déja pas encore liker ce post ",
              });
            }
            const removeIndex = post.likes
              .map((p) => p.user)
              .indexOf(req.user.id);
            post.likes.splice(removeIndex, 1);

            // post.likes.unshift({ user: req.user.id });
            post.save().then((savPost) => res.json(savPost));
          })
          .catch((errors) => res.json({ notfound: "Cet post n'existe pas" }));
      })
      .catch((errors) => res.json(errors));
  }
);

/**
 * @route POST api/posts/comment/:id
 * @desc comment one post
 * @access Private
 */
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValide } = validatePostInput(req.body);

    if (!isValide) {
      return res.status(401).json(errors);
    }

    Post.findById(req.params.id).then((post) => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.body.user,
      };

      post.comments.unshift(newComment);

      post.save().then((post) => res.json(post));
    });
  }
);

/**
 * @route DELETE api/posts/comment/:id/:comment_id
 * @desc DELETE comment one post
 * @access Private
 */
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id).then((post) => {
      const existComment =
        post.comments.filter((c) => c.id.toString() === req.params.comment_id)
          .length === 0;
      if (existComment) {
        return res
          .status(404)
          .json({ notfound: "uncun commentaire ne correspond" });
      }
      const indexToRemoove = post.comments
        .map((c) => c.id.toString())
        .indexOf(req.params.comment_id);

      post.comments.splice(indexToRemoove, 1);
      post
        .save()
        .then((post) => res.json(post))
        .catch((err) => res.json({ error: err }));
      return res.json(post);
    });
  }
);

module.exports = router;
