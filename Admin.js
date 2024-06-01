function convertDate(input) {
  const date = new Date(input);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
let token = localStorage.getItem("token");
document.getElementById("spinner").style.display = "block";

function getUsers() {
  fetch("http://localhost:3000/dashboard/students", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("spinner").style.display = "none";

      console.log(data.data.students);
      let students = data.data.students;
      let table = document.querySelector("table");
      let tbody = table.querySelector("tbody");
      tbody.innerHTML = "";
      students.forEach((student) => {
        let row = document.createElement("tr");

        row.innerHTML = `
                  <td class="name">${student.name}</td>
                  <td class="id">${student._id}</td>
                  <td class="date">${convertDate(student.createdAt)}</td>
                  <td><button class="details-button"><a href="#">See More</a></button></td>
                  <td><button class="delete-button" style="background-color: red;">Delete</button></td>
                  `;

        tbody.appendChild(row);
      });
    })
    .catch((error) => {
      document.getElementById("spinner").style.display = "none";

      console.error(error);
    });
}

function getAverageRating() {
  fetch("http://localhost:3000/Average-rating", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("average rating");
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

getUsers();

function deleteStudent(id) {
  console.log("deleteStudent called with ID:", id);

  fetch(`http://localhost:3000/students/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("DELETE request successful");
      // Remove the student row from the table or refresh the table here
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

document.querySelector("table").addEventListener("click", function (event) {
  const row = event.target.closest("tr");
  const buttons = row.querySelectorAll("button");
  const deleteButton = buttons[buttons.length - 1];

  if (event.target === deleteButton) {
    const idCell = row.querySelector(".id");
    const id = idCell.textContent;
    if (confirm("Are you sure you want to delete this student?")) {
      deleteStudent(id);
      row.remove();
    }
    row.remove();
  }
});
