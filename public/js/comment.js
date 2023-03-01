const addComment = async (evt) => {
  evt.preventDefault();
  console.log(evt.target);
  console.log(evt.target.getAttribute("blog-id"));
  const commentText = document.querySelector("#comment-text").value.trim();

  if (commentText) {
    console.log(
      `evt.target.getAttribute("blog-id") ${evt.target.getAttribute(
        "blog-id"
      )}`
    );
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
    if (response.ok) {
      document.location.replace(
        `/api/blog/${evt.target.getAttribute("blog-id")}`
      );
    } else {
      alert(response);
    }
  }
};

const modifyComment = async (evt) => {
  const commentText = document.querySelector("#comment-text").value.trim();
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

document.querySelectorAll(".edit-comment-btn").forEach((editCmt) => {
  editCmt.addEventListener("click", modifyComment);
});

document.querySelector("#comment-btn").addEventListener("click", addComment);

document.querySelectorAll(".delete-comment-btn").forEach((deleteCmt) => {
  deleteCmt.addEventListener("click", removeComment);
});
