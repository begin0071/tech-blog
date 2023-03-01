const logoutHandler = async () => {
  const response = await fetch("/api/login/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response);
  }
};

document.querySelector("#logout").addEventListener("click", logoutHandler);
