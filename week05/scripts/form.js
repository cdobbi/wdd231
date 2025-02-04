// form.js
export function handleFormSubmission(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const quiltData = {};
  formData.forEach((value, key) => {
    quiltData[key] = value;
  });
  localStorage.setItem("quiltData", JSON.stringify(quiltData));
  alert("Form submitted successfully!");
}
