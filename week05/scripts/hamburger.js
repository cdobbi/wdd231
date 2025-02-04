document.addEventListener(
  "DOMContentLoaded",

  function () {
    // Hamburger Menu Functionality
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navLinks = document.querySelector(".nav-links");

    if (hamburgerMenu && navLinks) {
      hamburgerMenu.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        const isActive = navLinks.classList.contains("active");
        hamburgerMenu.setAttribute("aria-expanded", isActive);
      });
    }
  }
);
