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


