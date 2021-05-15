const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

//get all posts and render them to homepage
router.get("/", (req, res) => {
  //look at session number and compare to application>cookies>sessionID
  console.log(req.session);
  Post.findAll({
    attributes: ["id", "title", "post_body", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      //serialize the array
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      // serialize object to specific properties
      res.render("homepage", { posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  //if session exists, redirect to homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
