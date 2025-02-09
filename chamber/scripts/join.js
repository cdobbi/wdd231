document.addEventListener("DOMContentLoaded", () => {
  // Add this code to handle the modal functionality
  const learnMoreButtons = document.querySelectorAll(".learn-more");
  const closeButtons = document.querySelectorAll(".close");

  learnMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal-id");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "block";
      } else {
        console.error(`Modal with ID '${modalId}' not found.`);
      }
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal-id");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "none";
      } else {
        console.error(`Modal with ID '${modalId}' not found.`);
      }
    });
  });

  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      event.target.style.display = "none";
    }
  });

  window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.showModal();
      modal.classList.add("open");
    } else {
      console.error(`Modal with ID '${modalId}' not found.`);
    }
  };

  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.close();
      modal.classList.remove("open");
    } else {
      console.error(`Modal with ID '${modalId}' not found.`);
    }
  };
});
