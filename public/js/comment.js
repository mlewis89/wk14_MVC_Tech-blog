const CommentSubmitHandler = async (event) => {
  event.preventDefault();

  // Collect values from the comment form
  const commentText = document.querySelector('#new-comment').value.trim();
  //const currentUserId = req.session.user_id;
  const currentPostId = event.target.closest('.post').getAttribute('data-post-id');
 
  const comment = {
    content: commentText,
    //user_id: currentUserId,
    post_id: currentPostId
  };

  if(comment) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/blog/comment', {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the /dashboard page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};


document
  .querySelector('.comment-form')
  .addEventListener('submit', CommentSubmitHandler);
