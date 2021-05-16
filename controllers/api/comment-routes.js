const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth.js");

router.post("/", withAuth, (req, res) => {
  // check the session
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id,
    }).catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  }

  /* console.log(window.location.href);
  if (
    window.location.href ===
    "https://serene-peak-86703.herokuapp.com/dashboard/edit/" + req.body.post_id
  ) {
    res.redirect("/dashboard/edit/" + req.body.post_id);
  } else { */
  res.redirect("/post/" + req.body.post_id);
  //}
});

router.get("/", (req, res) => {
  Comment.findAll()
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json;
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
