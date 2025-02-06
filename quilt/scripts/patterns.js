// patterns.js
export async function fetchQuiltPatterns() {
  try {
    const response = await fetch("data/quiltPatterns.json"); // Replace with your actual API endpoint if using a remote API
    const data = await response.json();
    displayQuiltPatterns(data);
  } catch (error) {
    console.error("Error fetching quilt patterns:", error);
  }
}

function displayQuiltPatterns(data) {
  const container = document.getElementById("pattern-container");
  container.innerHTML = "";
  data.forEach((pattern) => {
    const patternElement = document.createElement("div");
    patternElement.innerHTML = `
        <h2>${pattern.name}</h2>
        <img src="${pattern.image}" alt="${pattern.name}">
        <p>${pattern.description}</p>
      `;
    container.appendChild(patternElement);
  });
}
