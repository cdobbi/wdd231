import { discover } from "../data/discover.mjs";

const displayDiscover = (places) => {
  const cards = document.querySelector("div.cards");
  cards.innerHTML = "";

  places.forEach((place) => {
    let card = document.createElement("section");
    let h2 = document.createElement("h2");
    let address = document.createElement("p");
    let cost = document.createElement("p");
    let description = document.createElement("p");
    let photo = document.createElement("img");

    h2.textContent = place.name;
    address.innerHTML = `<span class="label">Address:</span> ${place.address}`;
    cost.innerHTML = `<span class="label">Cost:</span> ${place.cost}`;
    description.innerHTML = `<span class="label">Description:</span> ${place.description}`;

    photo.setAttribute("src", place.photo_link);
    photo.setAttribute("alt", `${place.name}`);
    photo.setAttribute("loading", "lazy");
    photo.setAttribute("width", "340");
    photo.setAttribute("height", "440");

    card.appendChild(h2);
    card.appendChild(address);
    card.appendChild(cost);
    card.appendChild(description);
    card.appendChild(photo);

    cards.appendChild(card);
  });
};

displayDiscover(discover);

const allButton = document.querySelector("#all");
const freeButton = document.querySelector("#free");
const paidButton = document.querySelector("#paid");

allButton.addEventListener("click", () => {
  displayDiscover(discover);
});

freeButton.addEventListener("click", () => {
  const freeDiscover = discover.filter(place => place.cost.toLowerCase() === "free");
  displayDiscover(freeDiscover);
});

paidButton.addEventListener("click", () => {
  const paidDiscover = discover.filter(place => place.cost.toLowerCase() !== "free");
  displayDiscover(paidDiscover);
});