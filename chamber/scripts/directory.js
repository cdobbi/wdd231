document.addEventListener("DOMContentLoaded", () => {
  // Fetch and Display Business Cards from JSON
  fetch("data/members.json") // Ensure the path is correct
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch members.json: " + response.statusText);
      }
      return response.json();
    })
    .then((members) => {
      const businessCardsContainer = document.querySelector(".business-cards");
      members.forEach((member) => {
        const card = document.createElement("div");
        card.classList.add("business-card");

        card.innerHTML = `
                    <img src="${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>
                        ${member.address.replace(/,/g, "<br>")}<br>
                        ${member.phone}<br>
                        <a href="mailto:${member.email}">${member.email}</a>
                    </p>
                `;

        businessCardsContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error loading business members:", error);
      const businessCardsContainer = document.querySelector(".business-cards");
      businessCardsContainer.innerHTML =
        "<p>Failed to load business members. Please try again later.</p>";
    });

  // Toggle View Functionality
  const toggleViewBtn = document.getElementById("toggleViewBtn");
  const businessCardsContainer = document.querySelector(".business-cards");

  // Initialize view based on localStorage
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
