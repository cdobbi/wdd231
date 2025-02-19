document.addEventListener("DOMContentLoaded", async () => {
    const patternSelect = document.getElementById("pattern-select");
    const patternImage = document.getElementById("pattern-image");
    const modal = document.getElementById("pattern-modal");
    const modalContent = document.getElementById("modal-content");
    const closeModal = document.getElementById("close-modal");
  
    // Fetch patterns data from JSON file
    const response = await fetch('data/patterns.json');
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
  });

// // Include the patterns data directly
// const patterns = [
//   {
//     id: "pattern1",
//     name: "Pattern 1",
//     image: "images/thumb1.webp",
//   },
//   {
//     id: "pattern2",
//     name: "Pattern 2",
//     image: "images/thumb2.webp",
//   },
//   {
//     id: "pattern3",
//     name: "Pattern 3",
//     image: "images/thumb3.webp",
//   },
//   {
//     id: "pattern4",
//     name: "Pattern 4",
//     image: "images/thumb4.webp",
//   },
//   {
//     id: "pattern5",
//     name: "Pattern 5",
//     image: "images/thumb5.webp",
//   },
//   {
//     id: "pattern6",
//     name: "Pattern 6",
//     image: "images/thumb6.webp",
//   },
//   {
//     id: "pattern7",
//     name: "Pattern 7",
//     image: "images/thumb7.webp",
//   },
//   {
//     id: "pattern8",
//     name: "Pattern 8",
//     image: "images/thumb8.webp",
//   },
//   {
//     id: "pattern9",
//     name: "Pattern 9",
//     image: "images/thumb9.webp",
//   },
//   {
//     id: "pattern10",
//     name: "Pattern 10",
//     image: "images/thumb10.webp",
//   },
//   {
//     id: "pattern11",
//     name: "Pattern 11",
//     image: "images/thumb11.webp",
//   },
//   {
//     id: "pattern12",
//     name: "Pattern 12",
//     image: "images/thumb12.webp",
//   },
//   {
//     id: "pattern13",
//     name: "Pattern 13",
//     image: "images/thumb13.webp",
//   },
//   {
//     id: "pattern14",
//     name: "Pattern 14",
//     image: "images/thumb14.webp",
//   },
//   {
//     id: "pattern15",
//     name: "Pattern 15",
//     image: "images/thumb15.webp",
//   },
// ];

// document.addEventListener("DOMContentLoaded", () => {
//   const patternSelect = document.getElementById("pattern-select");
//   const patternImage = document.getElementById("pattern-image");

//   // Clear existing options
//   patternSelect.innerHTML =
//     '<option value="" disabled selected>Choose a pattern...</option>';

//   // Populate the dropdown with patterns
//   patterns.forEach((pattern) => {
//     const option = document.createElement("option");
//     option.value = pattern.id;
//     option.textContent = pattern.name;
//     patternSelect.appendChild(option);
//   });

//   // Update the image when a pattern is selected
//   patternSelect.addEventListener("change", (event) => {
//     const selectedPattern = patterns.find(
//       (pattern) => pattern.id === event.target.value
//     );
//     if (selectedPattern) {
//       patternImage.src = selectedPattern.image;
//       patternImage.alt = selectedPattern.name;
//     }
//   });

//   // Save form data to local storage on form submission
//   const form = document.getElementById("design-form");
//   form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const formData = new FormData(form);
//     const formObject = {};

//     // Collect single choice inputs
//     formData.forEach((value, key) => {
//       if (!formObject[key]) {
//         formObject[key] = value;
//       } else if (Array.isArray(formObject[key])) {
//         formObject[key].push(value);
//       } else {
//         formObject[key] = [formObject[key], value];
//       }
//     });

//     // Capture multiple selections for Pattern Styles and Stitch Style
//     formObject["Pattern Styles"] = getCheckedValues("Feature");
//     formObject["Stitch Style"] = getCheckedValues("Style");

//     localStorage.setItem("formData", JSON.stringify(formObject));
//     window.location.href = form.action;
//   });

//   function getCheckedValues(name) {
//     const checkboxes = document.querySelectorAll(
//       `input[name="${name}"]:checked`
//     );
//     return Array.from(checkboxes).map((cb) => cb.value);
//   }
// });
