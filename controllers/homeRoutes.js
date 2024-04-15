const router = require('express').Router();
const {User, BlogPost } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
    const PostData = await BlogPost.findAll().catch((err) => { 
        res.json(err);
      });
        const posts = PostData.map((dish) => dish.get({ plain: true }));
        res.render('all', { posts });
      
  
    
  } catch (err) {
    res.status(400).json(err);
  }
}); 

module.exports = router;