const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

const userData = require('./userData.json');
const BlogPostData = require('./blogPostData.json');
const CommentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of BlogPostData) {
    await BlogPost.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const posts = await BlogPost.findAll();

  for (const comment of CommentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
