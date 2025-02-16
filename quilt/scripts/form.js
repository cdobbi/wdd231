// Include the patterns data directly
const patterns = [
  {
    id: "pattern1",
    name: "Pattern 1",
    image: "images/thumb1.webp",
  },
  {
    id: "pattern2",
    name: "Pattern 2",
    image: "images/thumb2.webp",
  },
  {
    id: "pattern3",
    name: "Pattern 3",
    image: "images/thumb3.webp",
  },
  {
    id: "pattern4",
    name: "Pattern 4",
    image: "images/thumb4.webp",
  },
  {
    id: "pattern5",
    name: "Pattern 5",
    image: "images/thumb5.webp",
  },
  {
    id: "pattern6",
    name: "Pattern 6",
    image: "images/thumb6.webp",
  },
  {
    id: "pattern7",
    name: "Pattern 7",
    image: "images/thumb7.webp",
  },
  {
    id: "pattern8",
    name: "Pattern 8",
    image: "images/thumb8.webp",
  },
  {
    id: "pattern9",
    name: "Pattern 9",
    image: "images/thumb9.webp",
  },
  {
    id: "pattern10",
    name: "Pattern 10",
    image: "images/thumb10.webp",
  },
  {
    id: "pattern11",
    name: "Pattern 11",
    image: "images/thumb11.webp",
  },
  {
    id: "pattern12",
    name: "Pattern 12",
    image: "images/thumb12.webp",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const patternSelect = document.getElementById("pattern-select");
  const patternImage = document.getElementById("pattern-image");

  // Clear existing options
  patternSelect.innerHTML =
    '<option value="" disabled selected>Choose a pattern...</option>';

  // Populate the dropdown with patterns
  patterns.forEach((pattern) => {
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
