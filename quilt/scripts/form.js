document.addEventListener("DOMContentLoaded", async () => {
    const patternSelect = document.getElementById("pattern-select");
    const patternImage = document.getElementById("pattern-image");
    const modal = document.getElementById("pattern-modal");
    const modalContent = document.getElementById("modal-content");
    const closeModal = document.getElementById("close-modal");
  
    try {
      // Fetch patterns data from JSON file
      const response = await fetch("data/patterns.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const patterns = await response.json();
  
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
  
      // Update the image and open modal when a pattern is selected
      patternSelect.addEventListener("change", (event) => {
        const selectedPattern = patterns.find(
          (pattern) => pattern.id === event.target.value
        );
        if (selectedPattern) {
          patternImage.src = selectedPattern.image;
          patternImage.alt = selectedPattern.name;
  
          // Populate and open modal
          modalContent.innerHTML = `
            <span class="close" id="close-modal">&times;</span>
            <h2>${selectedPattern.name}</h2>
            <img src="${selectedPattern.image}" alt="${selectedPattern.name}" />
            <p>${selectedPattern.description}</p>
            <p class="price">Price per square inch: $${selectedPattern.pricePerSquareInch.toFixed(
              2
            )}</p>
          `;
          modal.style.display = "block";
  
          // Add event listener to close button inside modal content
          document.getElementById("close-modal").addEventListener("click", () => {
            modal.style.display = "none";
          });
        }
      });
  
      // Close modal when clicking on the close button
      closeModal.addEventListener("click", () => {
        modal.style.display = "none";
      });
  
      // Save form data to local storage on form submission
      const form = document.getElementById("design-form");
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const formObject = {};
  
        // Collect single choice inputs
        formData.forEach((value, key) => {
          if (!formObject[key]) {
            formObject[key] = value;
          } else if (Array.isArray(formObject[key])) {
            formObject[key].push(value);
          } else {
            formObject[key] = [formObject[key], value];
          }
        });
  
        // Capture multiple selections for Pattern Styles and Stitch Style
        formObject["Pattern Styles"] = getCheckedValues("Feature");
        formObject["Stitch Style"] = getCheckedValues("Style");
  
        localStorage.setItem("formData", JSON.stringify(formObject));
        window.location.href = form.action;
      });
  
      function getCheckedValues(name) {
        const checkboxes = document.querySelectorAll(
          `input[name="${name}"]:checked`
        );
        return Array.from(checkboxes).map((cb) => cb.value);
      }
    } catch (error) {
      console.error("Error loading patterns:", error);
      alert("There was an error loading the patterns. Please try again later.");
    }
  });