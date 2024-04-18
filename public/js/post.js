const CommentSubmitHandler = async (event) => {
  event.preventDefault();

  // Collect values from the comment form
  const commentText = document.querySelector('#new-comment').value.trim();
  const currentPostId = event.target.closest('.postData').getAttribute('data-post-id');
 
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
  
  const currentPostId = event.target.closest('.postData').getAttribute('data-post-id');
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

  const postTitle = document.querySelector('#update-post-title');
  const postContent = document.querySelector('#update-post-content');


  const title = document.querySelector('#post-title').textContent; 
   const content = document.querySelector('#post-content').textContent;

  postTitle.value = title;
  postContent.value = content;

  document.querySelector('#post-update').classList.remove("hidden");
  document.querySelector('#post-static').classList.add("hidden");
};

const PostUpdateSubmitHandler = async (event) => {



  const postTitle = document.querySelector('#update-post-title').value.trim();
  const postContent = document.querySelector('#update-post-content').value.trim();
  const currentPostId = event.target.closest('.postData').getAttribute('data-post-id');

  console.log('************************************HERE');
  if(1)
{
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/blog/post/${currentPostId}`, {
      method: 'PUT',
      body: JSON.stringify({ title: postTitle, content: postContent }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the /dashboard page
      //document.location.replace(`/dashboard/${currentPostId}`);
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
  .querySelector('#btn-update-submit')
  .addEventListener('click', PostUpdateSubmitHandler);

  document
  .querySelector('#btn-delete-post')
  .addEventListener('click', PostDeleteHandler);
