document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Example validation or form submission handling
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            // Handle form submission, e.g., send data to server
            console.log('Form submitted:', { email, password });
        } else {
            alert('Please fill in all required fields.');
        }
    });
});
