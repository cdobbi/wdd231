async function fetchBusinessMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok)
      throw new Error("Failed to fetch members.json: " + response.statusText);
    const members = await response.json();
    displayBusinessCards(members);
  } catch (error) {
    console.error("Error loading business members:", error);
    const businessCardsContainer = document.querySelector(".business-cards");
    businessCardsContainer.innerHTML =
      "<p>Failed to load business members. Please try again later.</p>";
  }
}
function displayBusinessCards(members) {
  const businessCardsContainer = document.querySelector(".business-cards");
  (businessCardsContainer.innerHTML = ""),
    members.forEach((member) => {
      const card = document.createElement("div");
      card.classList.add("business-card"),
        (card.innerHTML = `\n        <img src="${member.image}" alt="${
          member.name
        }">\n        <h3>${
          member.name
        }</h3>\n        <p>\n          ${member.address.replace(
          /,/g,
          "<br>"
        )}<br>\n          ${member.phone}<br>\n          <a href="mailto:${
          member.email
        }">${member.email}</a>\n        </p>\n      `),
        businessCardsContainer.appendChild(card);
    });
}
document.addEventListener("DOMContentLoaded", () => {
  fetchBusinessMembers();
  const toggleViewBtn = document.getElementById("toggleViewBtn"),
    businessCardsContainer = document.querySelector(".business-cards"),
    savedView = localStorage.getItem("businessCardsView");
  "list" === savedView &&
    (businessCardsContainer.classList.add("list-view"),
    (toggleViewBtn.textContent = "Switch to Grid View")),
    toggleViewBtn.addEventListener("click", () => {
      businessCardsContainer.classList.toggle("list-view"),
        businessCardsContainer.classList.contains("list-view")
          ? ((toggleViewBtn.textContent = "Switch to Grid View"),
            localStorage.setItem("businessCardsView", "list"))
          : ((toggleViewBtn.textContent = "Switch to List View"),
            localStorage.setItem("businessCardsView", "grid"));
    });
});
