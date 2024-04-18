const CommentSubmitHandler = async (event) => {
  event.preventDefault();

  // Collect values from the comment form
  const commentText = document.querySelector('#new-comment').value.trim();
  const currentPostId = event.target.closest('.post').getAttribute('data-post-id');
 
if(commentText && currentPostId)
{
    // Send a POST request to the API endpoint
    const response = await fetch('/api/blog/comment', {
      method: 'POST',
      body: JSON.stringify({content: commentText, post_id: currentPostId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the /dashboard page
      document.location.replace(`/posts/${currentPostId}`);
    } else {
      alert(response.statusText);
    }
  }

};


document
  .querySelector('.comment-form')
  .addEventListener('submit', CommentSubmitHandler);
