import { fetchQuiltPatterns } from "./patterns.js";
import { handleFormSubmission } from "./formHandler.js";
import { toggleModal, closeModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchQuiltPatterns();

  document
    .getElementById("form")
    .addEventListener("submit", handleFormSubmission);

  document.querySelectorAll(".quilt-image").forEach((image) => {
    image.addEventListener("click", () => toggleModal(image.src));
  });

  document.getElementById("close-modal").addEventListener("click", closeModal);
});

window.addEventListener('DOMContentLoaded', (event) => {
    const images = document.querySelectorAll('.animatable');
    images.forEach(img => {
        img.animate([
            { transform: 'translate(0, 0)', filter: 'brightness(0.5)' },
            { transform: 'translate(0, -60%)', filter: 'brightness(1)' }
        ], {
            duration: 2000,
            iterations: Infinity,
            direction: 'alternate'
        });
    });
});

