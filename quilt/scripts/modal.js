// modal.js
export function toggleModal(imageSrc) {
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modal-image");
  modalImage.src = imageSrc;
  modal.classList.toggle("visible");
}

export function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("visible");
}
