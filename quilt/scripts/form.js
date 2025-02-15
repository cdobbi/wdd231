// form.js
import { fetchQuiltPatterns } from "./gallery.js";
import { handleFormSubmission } from "./form.js";
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

export function handleFormSubmission(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const quiltData = {};
  formData.forEach((value, key) => {
    quiltData[key] = value;
  });
  localStorage.setItem("quiltData", JSON.stringify(quiltData));
  alert("I'll get back to you soon!");
}
