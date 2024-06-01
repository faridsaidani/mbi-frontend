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
            window.location.href = "/admineatte.html";
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

function resetPassword(newPassword, token) {
  fetch(`/resetPassword/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: newPassword }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("Error:", error);
    });
}

document
  .getElementById("password-change-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let newPassword = document.getElementById("new-password").value;
    let token = localStorage.getItem("token");
    resetPassword(newPassword, token);
  });
