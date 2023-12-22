const root = document.querySelector(".row");
const submit = document.querySelector(".submit");
const input = document.querySelector(".search");

const api = "https://api.spaceflightnewsapi.net/v3/articles";
let data = [];
async function fetchApi(url) {
  let response = await fetch(url);
  if (response.status === 200) {
    data = await response.json();
    console.log(data);
    renderData(data);
  }
}
fetchApi(api);

function renderData(e) {
  root.textContent = "";
  if (e.length) {
    e.forEach((element) => {
      console.log(element);
      const card = document.createElement("div");
      card.className = "card col-lg-3";

      const img = document.createElement("img");
      img.src = element.imageUrl;
      img.className = "card-img-top";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const title = document.createElement("h3");
      title.textContent = element.title;
      title.className = "card-title";

      const text = document.createElement("p");
      text.textContent = `${element.summary.slice(0, 50)}...`;
      text.classList = "card-title";

      cardBody.appendChild(title);
      cardBody.appendChild(text);
      card.appendChild(img);
      card.appendChild(cardBody);
      root.appendChild(card);
    });
  }
}

submit.addEventListener("click", (e) => {
  let searchData = data.filter((element) =>
    element.title.toLowerCase().includes(input.value.toLowerCase())
  );
  renderData(searchData);
});
