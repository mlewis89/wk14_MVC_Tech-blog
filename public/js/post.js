const PostSubmitHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const postTitle = document.querySelector('#new-post-title').value.trim();
  const postContent = document.querySelector('#new-post-content').value.trim();

  if (postTitle && postContent ) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/blog/post', {
      method: 'POST',
      body: JSON.stringify({ title: postTitle, content: postContent }),
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
  .querySelector('.post-form')
  .addEventListener('submit', PostSubmitHandler);
