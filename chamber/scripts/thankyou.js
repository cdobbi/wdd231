document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.toString()) {
      console.error("No query parameters found in the URL.");
    } else {
      const formData = Array.from(urlParams.entries());
      function getValue(key) {
        return urlParams.get(key) || "";
      }
  
      console.log("Form Data:", formData);
      const showInfo = document.querySelector("#results");
      if (showInfo) {
        showInfo.style.minHeight = "200px";
        showInfo.innerHTML = `
          <p><strong>First Name:</strong> ${getValue("first")}</p>
          <p><strong>Last Name:</strong> ${getValue("last")}</p>
          <p><strong>Organizational Title:</strong> ${getValue("orgTitle")}</p>
          <p><strong>Company Name:</strong> ${getValue("company")}</p>
          <p><strong>Email:</strong> <a href="mailto:${getValue("email")}">${getValue("email")}</a></p>
          <p><strong>Cell Phone:</strong> ${getValue("phone")}</p>
          <p><strong>Business Type:</strong> ${getValue("type")}</p>
          <p><strong>Business Description:</strong> ${getValue("description")}</p>
          <p><strong>Membership Level:</strong> ${getValue("level")}</p>
          <p><strong>Timestamp:</strong> ${getValue("timestamp")}</p>
        `;
      } else {
        console.error("Element with ID 'results' not found.");
      }
    }
  });