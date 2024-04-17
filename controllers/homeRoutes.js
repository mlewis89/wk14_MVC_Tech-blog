const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/',withAuth, async (req, res) => {
  try {
    const PostData = await BlogPost.findAll({
      include: [{ model: User }]
    });
    console.log(PostData);
    const posts = PostData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render('homepage', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
