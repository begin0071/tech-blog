// Function to add a new comment to a blog post
const addComment = async (evt) => {
  evt.preventDefault();
  console.log(evt.target); // log the target element
  console.log(evt.target.getAttribute("blog-id")); // log the "blog-id" attribute of the target element
  const commentText = document.querySelector("#comment-text").value.trim();

  if (commentText) {
    console.log(
      `evt.target.getAttribute("blog-id") ${evt.target.getAttribute(
        "blog-id"
      )}`
    );
    // Sends POST request to the server 
    const response = await fetch(
      `/api/blog/${evt.target.getAttribute("blog-id")}`,
      {
        method: "POST",
        body: JSON.stringify({
          content: commentText,
          name: evt.target.getAttribute("name-id"),
          blog_id: evt.target.getAttribute("blog-id"),
          user_id: evt.target.getAttribute("user-id"),
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    // If the response is OKredirect to the blog post page else show an alert message
    if (response.ok) {
      document.location.replace(
        `/api/blog/${evt.target.getAttribute("blog-id")}`
      );
    } else {
      alert(response);
    }
  }
};

// Function to update an existing comment on a blog post
const modifyComment = async (evt) => {
  const commentText = document.querySelector("#comment-text").value.trim();
  // Sending put request
  const response = await fetch(
    `/api/blog/${evt.target.getAttribute("blog-id")}`,
    {
      method: "PUT",
      body: JSON.stringify({
        comment_id: evt.target.getAttribute("comment-id"),
        content: commentText,
      }),
      headers: { "Content-Type": "application/json" },
    }
  );
  
  document.location.replace(
    `/api/blog/${evt.target.getAttribute("blog-id")}`
  );
};


const removeComment = async (evt) => {
  // Sending a delete request
  const response = await fetch(
    `/api/blog/${evt.target.getAttribute("blog-id")}`,
    {
      method: "DELETE",
      body: JSON.stringify({
        comment_id: evt.target.getAttribute("comment-id"),
      }),
      headers: { "Content-Type": "application/json" },
    }
  );

  document.location.replace(
    `/api/blog/${evt.target.getAttribute("blog-id")}`
  );
};

// Added event listeners to the edit and "Delete buttons for each comment 
document.querySelectorAll(".edit-comment-btn").forEach((editCmt) => {
  editCmt.addEventListener("click", modifyComment);
});


document.querySelector("#comment-btn").addEventListener("click", addComment);

document.querySelectorAll(".delete-comment-btn").forEach((deleteCmt) => {
  deleteCmt.addEventListener("click", removeComment);
});
