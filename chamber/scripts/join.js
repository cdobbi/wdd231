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

  const currentUrl = window.location.href;
  console.log("Current URL:", currentUrl);
  const queryString = currentUrl.split("?")[1];
  queryString || console.error("No query parameters found in the URL.");
  const formData = queryString ? queryString.split("&") : [];
  function getValue(key) {
    for (let element of formData)
      if (element.startsWith(`${key}=`))
        return decodeURIComponent(element.split("=")[1].replace(/\+/g, " "));
    return "";
  }
  console.log("Form Data:", formData);
  const showInfo = document.querySelector("#results");
  if (showInfo) {
    showInfo.style.minHeight = "200px";
    showInfo.innerHTML = `
    <p><strong>First Name:</strong> ${getValue("first")}</p>\n
    <p><strong>Last Name:</strong> ${getValue("last")}</p>\n
    <p><strong>Organizational Title:</strong> ${getValue("orgTitle")}</p>\n
    <p><strong>Company Name:</strong> ${getValue("company")}</p>\n
    <p><strong>Email:</strong> <a href="mailto:${getValue("email")}">${getValue(
      "email"
    )}</a></p>\n
    <p><strong>Cell Phone:</strong> ${getValue("phone")}</p>\n
    <p><strong>Business Type:</strong> ${getValue("type")}</p>\n
    <p><strong>Business Description:</strong> ${getValue("description")}</p>\n
    <p><strong>Membership Level:</strong> ${getValue("level")}</p>\n
    <p><strong>Timestamp:</strong> ${getValue("timestamp")}</p>\n   
    `;
  } else {
    console.error("Element with ID 'results' not found.");
  }
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput) {
    timestampInput.value = new Date().toISOString();
  } else {
    console.error("Element with ID 'timestamp' not found.");
  }

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
