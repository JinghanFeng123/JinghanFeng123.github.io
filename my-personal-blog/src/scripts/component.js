// This file contains common JavaScript components for handling form input and dynamic updates to the page content.

document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profile-form');
    const profileDisplay = document.getElementById('profile-display');

    if (profileForm) {
        profileForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(profileForm);
            const profileData = {
                name: formData.get('name'),
                bio: formData.get('bio'),
                contact: formData.get('contact')
            };
            updateProfileDisplay(profileData);
            profileForm.reset();
        });
    }

    function updateProfileDisplay(data) {
        profileDisplay.innerHTML = `
            <h2>${data.name}</h2>
            <p>${data.bio}</p>
            <p>Contact: ${data.contact}</p>
        `;
    }
});