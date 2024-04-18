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

const PostDeleteHandler = async (event) => {
  
  const currentPostId = event.target.closest('.post').getAttribute('data-post-id');
  if(confirm(`Are you sure you want to delete this post?`))
{
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/blog/post/${currentPostId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the /dashboard page
      document.location.replace(`/dashboard`);
    } else {
      alert(response.statusText);
    }
  }

};

const PostUpdateHandler = async (event) => {
  
  const currentPostId = event.target.closest('.post').getAttribute('data-post-id');
  if(1)
{
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/blog/post/${currentPostId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the /dashboard page
      document.location.replace(`/dashboard`);
    } else {
      alert(response.statusText);
    }
  }

};


document
  .querySelector('.comment-form')
  .addEventListener('submit', CommentSubmitHandler);

  document
  .querySelector('#btn-update-post')
  .addEventListener('click', PostUpdateHandler);

  document
  .querySelector('#btn-delete-post')
  .addEventListener('click', PostDeleteHandler);
