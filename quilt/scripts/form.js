import { patterns } from "../data/patterns.mjs";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  const patternSelect = document.getElementById("pattern-select");
  const patternImage = document.getElementById("pattern-image");

  // Clear existing options
  patternSelect.innerHTML =
    '<option value="" disabled selected>Choose a pattern...</option>';

  // Populate the dropdown with patterns
  patterns.forEach((pattern) => {
    console.log(`Adding pattern: ${pattern.name}`);
    const option = document.createElement("option");
    option.value = pattern.id;
    option.textContent = pattern.name;
    patternSelect.appendChild(option);
  });

  // Update the image when a pattern is selected
  patternSelect.addEventListener("change", (event) => {
    const selectedPattern = patterns.find(
      (pattern) => pattern.id === event.target.value
    );
    if (selectedPattern) {
      patternImage.src = selectedPattern.image;
      patternImage.alt = selectedPattern.name;
    }
  });

  // Save form data to local storage on form submission
  const form = document.getElementById("design-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    localStorage.setItem("formData", JSON.stringify(formObject));
    window.location.href = form.action;
  });
});
