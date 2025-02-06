document.addEventListener("DOMContentLoaded", () => {
    const yearElement = document.querySelector("#year");
    const lastModifiedElement = document.querySelector("#lastModified");
  
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  
    if (lastModifiedElement) {
      const lastModifiedDate = new Date(document.lastModified);
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeStyle: "medium",
        dateStyle: "medium",
      });
      lastModifiedElement.textContent = formatter.format(lastModifiedDate);
    }
  });
  