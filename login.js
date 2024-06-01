document.addEventListener("DOMContentLoaded", (event) => {
  document
    .querySelector(".loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var email = document.querySelector("#email").value;
      var password = document.querySelector("#password").value;

      var data = {
        email: email,
        password: password,
      };

      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            localStorage.setItem("token", data.token);
            console.log(data);
            window.location.href = "/adminehome.html";
          } else {
            // Show an error message
            alert("Invalid email or password");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
});

document.addEventListener("DOMContentLoaded", (event) => {
  document
    .querySelector(".signupForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      var username = document.querySelector("#username-signup").value;
      var email = document.querySelector("#email-signup").value;
      var password = document.querySelector("#password-signup").value;
      console.log(username, email, password);
      var data = {
        name: username,
        email: email,
        password: password,
      };

      fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            // Redirect to the dashboard or home page
            console.log(data);
            localStorage.setItem("token", data.token);
            window.location.href = "/adminehome.html";
          } else {
            // Show an error message
            if (data.error.code === 11000) {
              alert(
                "Username already exists. Please choose a different username."
              );
            } else {
              alert("Signup failed ");
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          if (error.error.code === 11000) {
            // Duplicate key error
            res.status(400).json({
              status: "fail",
              message:
                "Username already exists. Please choose a different username.",
            });
          } else {
            // Other errors
            res.status(500).json({
              status: "error",
              message: "An error occurred while creating the user.",
            });
          }
        });
    });
});
