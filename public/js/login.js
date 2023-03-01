// This function handles thelogin form
const handleLoginFormSubmit = async (event) => {
  event.preventDefault();

  const userEmail = document.querySelector("#email-login").value.trim();
  const userPassword = document.querySelector("#password-login").value.trim();

  if (userEmail && userPassword) {
    const response = await fetch("/api/login/login", {
      method: "POST",
      body: JSON.stringify({ email: userEmail, password: userPassword }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

// This function handles the signup form
const handleSignupFormSubmit = async (event) => {
  event.preventDefault();

  const userName = document.querySelector("#username-signup").value.trim();
  const userEmail = document.querySelector("#email-signup").value.trim();
  const userPassword = document.querySelector("#password-signup").value.trim();

  if (userName && userEmail && userPassword) {
    const response = await fetch("/api/login/signup", {
      method: "POST",
      body: JSON.stringify({ name: userName, email: userEmail, password: userPassword }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(
        "Please enter a valid email and ensure your password is at least 8 symbols long"
      );
    }
  }
};





document
  .querySelector(".login-form")
  .addEventListener("submit", handleLoginFormSubmit);

document
  .querySelector(".signup-form")
  .addEventListener("submit", handleSignupFormSubmit);
