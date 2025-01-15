document.addEventListener("DOMContentLoaded", () => {
  fetch("JSON/user.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      displayUserData(data);
    })
    .catch((error) => {
      console.error("Error fetching the JSON data:", error);
    });
});

function displayUserData(user) {
  const main = document.querySelector("main");

  // Create a container for user information
  const userContainer = document.createElement("div");
  userContainer.classList.add("user-container");

  // Family Name and Move-In Date
  const familyInfo = document.createElement("div");
  familyInfo.classList.add("family-info");
  familyInfo.innerHTML = `
        <h2>Family Name: ${user.family_name}</h2>
        <p>Move-In Date: ${formatDate(user.move_in_date)}</p>
        <p>Number of People: ${user.number_of_people}</p>
        <p>Visited by Bishopric: ${user.visited_by_bishopric ? "Yes" : "No"}</p>
    `;
  userContainer.appendChild(familyInfo);

  // Family Members List
  const membersSection = document.createElement("div");
  membersSection.classList.add("family-members");
  membersSection.innerHTML = `<h3>Family Members:</h3>`;

  const membersList = document.createElement("ul");
  membersList.classList.add("members-list");

  user.family_members.forEach((member) => {
    const memberItem = document.createElement("li");
    memberItem.innerHTML = `
            <strong>Name:</strong> ${member.name} <br>
            <strong>Gender:</strong> ${member.gender} <br>
            <strong>Birthdate:</strong> ${formatDate(member.birthdate)}
        `;
    membersList.appendChild(memberItem);
  });

  membersSection.appendChild(membersList);
  userContainer.appendChild(membersSection);

  main.appendChild(userContainer);
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString(undefined, options);
}
