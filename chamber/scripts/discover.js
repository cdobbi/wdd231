import { discover } from "../data/discover.mjs";

const displayPlaces = (places) => {
  const container = document.querySelector("div.cards");
  container.innerHTML = "";

  places.forEach((place) => {
    const card = document.createElement("section");
    card.classList.add("card");

    const title = document.createElement("h2");
    title.textContent = place.name;

    const address = document.createElement("p");
    address.innerHTML = `<span class="label">Address:</span> ${place.address}`;

    const cost = document.createElement("p");
    cost.innerHTML = `<span class="label">Cost:</span> ${place.cost}`;

    const description = document.createElement("p");
    description.innerHTML = `<span class="label">Description:</span> ${place.description}`;

    const photo = document.createElement("img");
    photo.setAttribute("src", place.photo_link);
    photo.setAttribute("alt", `${place.name}`);
    photo.setAttribute("loading", "lazy");
    photo.setAttribute("width", "340");
    photo.setAttribute("height", "440");

    const learnMoreButton = document.createElement("button");
    learnMoreButton.textContent = "Learn More";
    learnMoreButton.addEventListener("click", () => {
      window.location.href = place.learn_more_link;
    });

    card.appendChild(title);
    card.appendChild(address);
    card.appendChild(cost);
    card.appendChild(description);
    card.appendChild(photo);
    card.appendChild(learnMoreButton);

    container.appendChild(card);
  });
};

displayPlaces(discover);

const allButton = document.querySelector("#all");
const freeButton = document.querySelector("#free");
const paidButton = document.querySelector("#paid");

allButton.addEventListener("click", () => {
  displayPlaces(discover);
});

freeButton.addEventListener("click", () => {
  const freePlaces = discover.filter(place => place.cost.toLowerCase() === "free");
  displayPlaces(freePlaces);
});

paidButton.addEventListener("click", () => {
  const paidPlaces = discover.filter(place => place.cost.toLowerCase() !== "free");
  displayPlaces(paidPlaces);
});

// document.addEventListener('DOMContentLoaded', () => {
//   const lastVisitKey = 'lastVisit';
//   const now = new Date();
//   const lastVisit = localStorage.getItem(lastVisitKey);

//   if (lastVisit) {
//     const lastVisitDate = new Date(lastVisit);
//     const hoursSinceLastVisit = Math.floor((now - lastVisitDate) / (1000 * 60 * 60));
//     if (hoursSinceLastVisit < 24) {
//       const dialog = document.getElementById("welcomeBackDialog");
//       dialog.style.display = "block";
//     }
//   } else {
//     console.log('Welcome to our site!');
//   }

//   localStorage.setItem(lastVisitKey, now.toISOString());
// });

// const closeDialog = () => {
//   const dialog = document.getElementById("welcomeBackDialog");
//   dialog.style.display = "none";
// };

// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelector(".close-button").addEventListener("click", closeDialog);
// });

// window.addEventListener("click", (event) => {
//   const dialog = document.getElementById("welcomeBackDialog");
//   if (event.target === dialog) {
//     closeDialog();
//   }
// });