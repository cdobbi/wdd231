async function fetchAndDisplayMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok)
      throw new Error("Failed to fetch members.json: " + response.statusText);
    const members = await response.json(),
      shuffledMembers = shuffleArray(members),
      selectedMembers = shuffledMembers.slice(0, 4);
    displayMembers(selectedMembers);
  } catch (error) {
    console.error("Error fetching members:", error);
    const businessCardsContainer = document.querySelector(".business-cards");
    businessCardsContainer.innerHTML =
      "<p>Failed to load business members. Please try again later.</p>";
  }
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function displayMembers(members) {
  const container = document.querySelector(".business-cards");
  (container.innerHTML = ""),
    members.forEach((member) => {
      const memberCard = document.createElement("div");
      memberCard.classList.add("member-card"),
        (memberCard.innerHTML = `\n          <h3>${member.name}</h3>\n          <p>${member.address}</p>\n          <p>${member.phone}</p>\n          <p>${member.email}</p>\n        `),
        container.appendChild(memberCard);
    });
}
document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayMembers();
});

