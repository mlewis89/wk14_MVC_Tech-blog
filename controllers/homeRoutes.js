const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    
    
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;