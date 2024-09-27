document.addEventListener('DOMContentLoaded', async () => {
    const navbarContainer = document.getElementById('navbar-container');

    try {
        // Fetch the navbar template content from the navbar.html file
        const response = await fetch('templates/navbar.html');

        // Check if the fetch was successful
        if (!response.ok) {
            throw new Error(`Failed to load navbar template: ${response.status} ${response.statusText}`);
        }

        // Parse the text response
        const text = await response.text();

        // Create a temporary element to hold the fetched HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text.trim();

        // Extract the template content and insert it into the navbar container
        const template = tempDiv.querySelector('template');
        if (template) {
            navbarContainer.appendChild(document.importNode(template.content, true));

            // Dynamically load the CSS file for the navbar
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'css/navbar.css';
            document.head.appendChild(link);
        } else {
            console.error('Navbar template element not found in the loaded HTML.');
        }
    } catch (error) {
        console.error('Error loading navbar template:', error);
    }

    // Ensure no JavaScript interference with link clicks
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (event) => {
            // Ensure this does not prevent the default anchor behavior
            console.log(`Navigating to: ${item.href}`);
        });
    });
});
