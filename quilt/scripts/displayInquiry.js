document.addEventListener('DOMContentLoaded', () => {
    const inquiryDetails = document.getElementById('inquiry-details');
    const formData = JSON.parse(localStorage.getItem('formData'));

    if (formData) {
        inquiryDetails.innerHTML = `
            <p><strong>Pattern:</strong> ${formData.Pattern}</p>
            <p><strong>Binding:</strong> ${formData.Binding ? 'Yes' : 'No'}</p>
            <p><strong>Completion Date:</strong> ${formData['Date Of Purchase']}</p>
            <p><strong>Features:</strong> ${formData.Feature}</p>
            <p><strong>Style:</strong> ${formData.Style}</p>
            <p><strong>Message:</strong> ${formData['Written message']}</p>
            <p><strong>Contact Details:</strong> ${formData['User Name']}</p>
        `;
    } else {
        inquiryDetails.innerHTML = '<p>No inquiry details found.</p>';
    }
});