function getData() {
  fetch("http://localhost:3000/news", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("news");
      console.log(data.data.theNews);
      const newsdata = data.data.theNews;
      const parentElement = document.getElementById("swiper-wrapperr");
      newsdata.forEach((item, index) => {
        const childElement = document.createElement("div");
        childElement.className = `cardd`;
        childElement.className = `swiper-slide`;
        childElement.id = `swiper-slide-${index}`;
        childElement.innerHTML = `
          <div class="image-overlay" id="image-overlay-${index}">
              <img src=${item.photo} alt="h">
          </div>
              `;
        parentElement.appendChild(childElement);
      }); // This was missing
    });
}

getData();
