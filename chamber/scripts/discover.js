import { discover } from "../data/discover.mjs";

const displayDiscover = (places) => {
  const cards = document.querySelector("div.cards");
  cards.innerHTML = "";

  places.forEach((place, index) => {
    let card = document.createElement("section");
    card.classList.add("card");
    let h2 = document.createElement("h2");
    let address = document.createElement("p");
    let cost = document.createElement("p");
    let description = document.createElement("p");
    let photo = document.createElement("img");
    let learnMoreButton = document.createElement("button");

    h2.textContent = place.name;
    address.innerHTML = `<span class="label">Address:</span> ${place.address}`;
    cost.innerHTML = `<span class="label">Cost:</span> ${place.cost}`;
    description.innerHTML = `<span class="label">Description:</span> ${place.description}`;

    photo.setAttribute("src", place.photo_link);
    photo.setAttribute("alt", `${place.name}`);
    photo.setAttribute("loading", "lazy");
    photo.setAttribute("width", "340");
    photo.setAttribute("height", "440");

    learnMoreButton.textContent = "Learn More";
    learnMoreButton.addEventListener("click", () => {
      window.location.href = place.learn_more_link;
    });

    card.appendChild(h2);
    card.appendChild(address);
    card.appendChild(cost);
    card.appendChild(description);
    card.appendChild(photo);
    card.appendChild(learnMoreButton);

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

document.addEventListener('DOMContentLoaded', () => {
  const lastVisitKey = 'lastVisit';
  const now = new Date();
  const lastVisit = localStorage.getItem(lastVisitKey);

  if (lastVisit) {
    const lastVisitDate = new Date(lastVisit);
    const daysSinceLastVisit = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24));
    alert(`Welcome back! It's been ${daysSinceLastVisit} days since your last visit.`);
  } else {
    console.log('Welcome to our site!');
  }

  localStorage.setItem(lastVisitKey, now.toISOString());
});