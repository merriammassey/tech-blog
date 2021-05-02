const router = require("express").Router();
const { Post, User } = require("../../models");

// get all posts
router.get("/", (req, res) => {
  Post.findAll({
    //identify the columns to retrieve in this query
    order: [["created_at", "DESC"]],
    //JOIN user table
    include: [
      /* include the Comment model here:
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },*/
      {
        //define this object by referencing mode and attributes
        model: User,
        attributes: ["username"],
      },
    ],
  })
    //capture response in a Promise
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
