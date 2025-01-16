const url =
  "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";

const cards = document.querySelector("#cards");

console.log("Starting fetch for prophet data...");

async function getProphetData(url) {
  try {
    const response = await fetch(url);
    console.log("Fetch response received:", response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Prophet data parsed:", data.prophets);
    displayProphets(data.prophets); // Reference the prophets array from the JSON data
  } catch (error) {
    console.error("Error fetching the prophet data:", error);
    cards.innerHTML =
      "<p>Sorry, there was an error loading the prophet data.</p>";
  }
}

getProphetData(url);

const displayProphets = (prophets) => {
  console.log("Displaying prophets:", prophets);
  prophets.forEach((prophet) => {
    // Create elements to add to the div.cards element
    let card = document.createElement("section");
    let fullName = document.createElement("h2"); // Created h2 element for the prophet's name
    let portrait = document.createElement("img");

    // Build the h2 content to show the prophet's full name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`; // Filled in with prophet's name and lastname

    // Build the image portrait by setting all the relevant attributes
    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute(
      "alt",
      `Portrait of ${prophet.name} ${prophet.lastname}, ${
        prophet.order
      }${getOrdinalSuffix(prophet.order)} prophet`
    ); // Filled in alt text with proper ordinal suffix
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "340");
    portrait.setAttribute("height", "440");

    // Optional: Add more details (e.g., birthdate, birthplace)
    let birthInfo = document.createElement("p");
    birthInfo.textContent = `Date of Birth: ${formatDate(
      prophet.birthdate
    )} | Place of Birth: ${prophet.birthplace}`;
    birthInfo.classList.add("birth-info");

    // Append the section(card) with the created elements
    card.appendChild(fullName); // Appended the h2 element
    card.appendChild(portrait);
    card.appendChild(birthInfo); // Appended additional information

    cards.appendChild(card);
  }); // end of arrow function and forEach loop
};

// Helper function to format dates
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString(undefined, options);
}

// Helper function to get ordinal suffixes for numbers
function getOrdinalSuffix(number) {
  const j = number % 10,
    k = number % 100;
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
}
