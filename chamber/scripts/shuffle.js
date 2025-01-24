document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayMembers();

  const toggleViewBtn = document.getElementById("toggleViewBtn");
  const businessCardsContainer = document.querySelector(".business-cards");

  const savedView = localStorage.getItem("businessCardsView");
  if (savedView === "list") {
    businessCardsContainer.classList.add("list-view");
    toggleViewBtn.textContent = "Switch to Grid View";
  }

  toggleViewBtn.addEventListener("click", () => {
    businessCardsContainer.classList.toggle("list-view");

    if (businessCardsContainer.classList.contains("list-view")) {
      toggleViewBtn.textContent = "Switch to Grid View";
      localStorage.setItem("businessCardsView", "list");
    } else {
      toggleViewBtn.textContent = "Switch to List View";
      localStorage.setItem("businessCardsView", "grid");
    }
  });
});

async function fetchAndDisplayMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error("Failed to fetch members.json: " + response.statusText);
    }
    const members = await response.json();

    // Shuffle the members array
    const shuffledMembers = shuffleArray(members);

    // Select the first 3 members
    const selectedMembers = shuffledMembers.slice(0, 3);

    // Display the selected members
    displayMembers(selectedMembers);
  } catch (error) {
    console.error("Error fetching members:", error);
    const businessCardsContainer = document.querySelector(".business-cards");
    businessCardsContainer.innerHTML =
      "<p>Failed to load business members. Please try again later.</p>";
  }
}

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to display members
function displayMembers(members) {
  const container = document.querySelector(".business-cards");
  container.innerHTML = "";

  members.forEach((member) => {
    const memberCard = document.createElement("div");
    memberCard.classList.add("member-card");
    memberCard.innerHTML = `
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p>${member.email}</p>
      `;
    container.appendChild(memberCard);
  });
}
