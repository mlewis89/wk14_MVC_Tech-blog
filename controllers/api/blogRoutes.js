const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//WHEN I visit the site for the first time
//THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in

router.post('/post', withAuth, async (req, res) => {
  try {
    
    //console.log(req.body, req.session.user_id);
    const newPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    //console.log('new Post Added', newPost)
    res.status(200).json(newPost);
    
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/comment', withAuth, async (req, res) => {
  try {
    
    //console.log(req.body, req.session.user_id);
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    //console.log('newComment Added', newComment)
    res.status(200).json(newComment);
    
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/post/:id', withAuth, async (req, res) => {
  try {
    console.log('HERRE')
    //console.log(req.body, req.session.user_id);
    const deletedPost = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });;
    //console.log('new Post Added', newPost)
    res.status(200).json(deletedPost);
    
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/post/:id', withAuth, async (req, res) => {
  try {
    
    //console.log(req.body, req.session.user_id);
    const newPost = await BlogPost.update(  {...req.body},
      {
      where: {id : req.params.id},
    });
    //console.log('new Post Added', newPost)
    res.status(200).json(newPost);
    
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;