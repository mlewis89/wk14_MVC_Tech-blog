const router = require('express').Router();
const { Model } = require('sequelize');
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const PostData = await BlogPost.findAll({
      include: [{ model: User }]
    });
    console.log(PostData);
    const posts = PostData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render('homepage', { posts,logged_in: req.session.logged_in, });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    //const userData = await User.findByPk(req.session.user_id);
    //console.log(userData);
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/dashboard', async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    const userData = await User.findByPk(req.session.user_id,{
      include: [{ model: BlogPost }, { model: Comment }],
      attributes: { exclude: ['password'] },
    });

    console.log(userData);
    const user = userData.get({ plain: true });
    res.render('dashboard',{user, logged_in: req.session.logged_in,});
    return;
  }

  res.redirect('login');
});

module.exports = router;
