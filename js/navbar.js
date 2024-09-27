document.addEventListener('DOMContentLoaded', async () => {
    const navbarContainer = document.getElementById('navbar-container');

    try {
        const response = await fetch('templates/navbar.html');

        if (!response.ok) {
            throw new Error(`Failed to load navbar template: ${response.status} ${response.statusText}`);
        }

        const text = await response.text();

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text.trim();

       const template = tempDiv.querySelector('template');
        if (template) {
            navbarContainer.appendChild(document.importNode(template.content, true));

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
});
