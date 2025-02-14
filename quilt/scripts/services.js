import { displayServices } from "./quilt.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const servicesContainer = document.getElementById("services-container");
  try {
    const response = await fetch("data/services.json");
    if (!response.ok) throw new Error("Network response was not ok");
    const services = await response.json();
    displayServices(services, servicesContainer);
  } catch (error) {
    console.error("Error fetching services:", error);
  }
});

export function displayServices(services, container) {
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.classList.add('service-card');
        serviceCard.innerHTML = `
            <h2>${service.title}</h2>
            <p>${service.description}</p>
            <ul>
                ${service.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
        container.appendChild(serviceCard);
    });
}
