function getData() {
  fetch("http://localhost:3000/reviews", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("reviews");
      console.log(data.data.reviews);
      const reviewsdata = data.data.reviews;
      const parentElement = document.getElementById("userreviews");
      reviewsdata.forEach((item, index) => {
        const childElement = document.createElement("div");
        childElement.className = `user-comment`;
        childElement.id = `user-comment-${index}`;
        childElement.innerHTML = `
        <div class="comment-header">
            <div class="user-info">
              <div class="name">${item.user}</div>
            </div>
            <div class="user-rating" id="user-ratings-${index}">

            </div>
          </div>
          <div class="comment">
            ${item.comment}
          </div>
          <div class="reaction">
            <i class="fa-regular fa-thumbs-up"></i>
            <i class="fa-regular fa-thumbs-down"></i>
          </div>
        `;
        parentElement.appendChild(childElement);

        var numberOfStars = item.rating;
        var ratingElement = document.getElementById(`user-ratings-${index}`);
        for (var i = 0; i < numberOfStars; i++) {
          var starElement = document.createElement("i");
          starElement.className = `fa fa-star`;
          ratingElement.appendChild(starElement);
        }
        var l = 5 - i;
        for (var j = 0; j < l; j++) {
          var starElement = document.createElement("i");
          starElement.className = `fa-regular fa-star`;
          ratingElement.appendChild(starElement);
        }
      });
      const childElement = document.createElement("div");
      childElement.innerHTML = `
      <div class="reviews-count">${reviewsdata.length} reviews</div>
      `;
      parentElement.appendChild(childElement);
    })
    .catch(function (error) {
      console.log(error);
      alert("An error occurred while fetching the data.");
    });
}

getData();
