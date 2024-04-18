const PostSubmitHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const comment = document.querySelector('#new-comment').value.trim();

  if (comment) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/blog/post', {
      method: 'POST',
      body: JSON.stringify({ post }),
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
  .addEventListener('submit', PostSumbitHandler);
