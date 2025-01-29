document.addEventListener("DOMContentLoaded", () => {
    console.log("hamburger.js loaded"); // Debugging line
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links a");
    const mainContent = document.querySelector("main");
  
    if (hamburger && navLinks && mainContent) {
        hamburger.setAttribute("aria-expanded", "false"); // Initialize aria-expanded
        hamburger.addEventListener("click", () => {
          navLinks.classList.toggle("active");
          // Remove this line if you don't want the 'shifted' class to be added
          // mainContent.classList.toggle("shifted");
          const isActive = navLinks.classList.contains("active");
          hamburger.setAttribute("aria-expanded", isActive);
          hamburger.setAttribute(
            "aria-label",
            isActive ? "Close navigation" : "Open navigation"
          );
          console.log(`Navigation toggled: ${isActive ? "Opened" : "Closed"}`); // Debugging line
        });
      
        links.forEach((link) => {
          link.addEventListener("click", () => {
            if (navLinks.classList.contains("active")) {
              navLinks.classList.remove("active");
              // Remove this line if you don't want the 'shifted' class to be added
              // mainContent.classList.remove("shifted");
              hamburger.setAttribute("aria-expanded", "false");
              hamburger.setAttribute("aria-label", "Open navigation");
              console.log("Navigation closed via link click"); // Debugging line
            }
          });
        });
    } else {
        console.error("Hamburger elements not found");
    }
});
