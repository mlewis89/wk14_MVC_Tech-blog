const router = require('express').Router();
const { Model } = require('sequelize');
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const PostData = await BlogPost.findAll({
      include: [{ model: User }]
    });
    const posts = PostData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render('homepage', { posts,logged_in: req.session.logged_in, });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/dashboard',withAuth, async (req, res) => {
  // If the user is already logged in, redirect the request to another route

    const userData = await User.findByPk(req.session.user_id,{
      include: [{ model: BlogPost }, { model: Comment }],
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });
    res.render('dashboard',{user, logged_in: req.session.logged_in});
    return;

});

router.get('/posts/:id', withAuth, async (req, res) => {
  // If the user is already logged in, redirect the request to another route

    const postData = await BlogPost.findByPk(req.params.id,{include: [{model: User, attributes: ['name']},{model: Comment, include: {model: User, attributes: ['name']}}]});
    // Serialize data so the template can read it
    console.log(postData);
    const post = postData.get({ plain: true });
    console.log(post);
    
    res.render('post', {post, logged_in: req.session.logged_in});
    return;
  
});

module.exports = router;
