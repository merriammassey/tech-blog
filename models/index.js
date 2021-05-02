const User = require("./User");
const User = require("./User");
const Post = require("./Post");

//reference for the id column in the User model to link to user_id in the Post model.
User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});
module.exports = { User, Post };
