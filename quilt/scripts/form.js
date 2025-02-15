import { patterns } from '../data/patterns.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const patternSelect = document.getElementById('pattern-select');
    const selectedOption = document.createElement('div');
    selectedOption.classList.add('selected-option');
    selectedOption.textContent = 'Choose a pattern...';
    patternSelect.appendChild(selectedOption);

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');
    patternSelect.appendChild(optionsContainer);

    const patternImage = document.getElementById('pattern-image');

    patterns.forEach(pattern => {
        const option = document.createElement('div');
        option.classList.add('option');
        option.innerHTML = `
            <img src="${pattern.image}" alt="${pattern.name}" style="width: 50px; height: 50px;">
            <span>${pattern.name}</span>
        `;
        option.addEventListener('click', () => {
            selectedOption.textContent = pattern.name;
            patternImage.src = pattern.image;
            patternImage.alt = pattern.name;
            optionsContainer.classList.remove('active');
        });
        optionsContainer.appendChild(option);
    });

    selectedOption.addEventListener('click', () => {
        optionsContainer.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        if (!patternSelect.contains(event.target)) {
            optionsContainer.classList.remove('active');
        }
    });

    // Save form data to local storage on form submission
    const form = document.getElementById('design-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        localStorage.setItem('formData', JSON.stringify(formObject));
        window.location.href = form.action;
    });
});