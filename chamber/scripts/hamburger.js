document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links a");
    const mainContent = document.querySelector("main");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        mainContent.classList.toggle("shifted");
        const isActive = navLinks.classList.contains("active");
        hamburger.setAttribute("aria-expanded", isActive);
        hamburger.setAttribute(
            "aria-label",
            isActive ? "Close navigation" : "Open navigation"
        );
    });

    links.forEach((link) => {
        link.addEventListener("click", () => {
            if (navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                mainContent.classList.remove("shifted");
                hamburger.setAttribute("aria-expanded", "false");
                hamburger.setAttribute("aria-label", "Open navigation");
            }
        });
    });
});