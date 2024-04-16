const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//WHEN I visit the site for the first time
//THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
router.post('/', withAuth, async (req, res) => {
  try {
    
    
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;