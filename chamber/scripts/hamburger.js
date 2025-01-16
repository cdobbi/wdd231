document
  .querySelector(".hamburger-menu")
  .addEventListener("click", function () {
    document.querySelector(".nav-links").classList.toggle("show");
    this.setAttribute(
      "aria-expanded",
      document.querySelector(".nav-links").classList.contains("show")
    );
  });
