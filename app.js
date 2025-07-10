document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic "Last Login" Time ---
    // This simple script makes the MySpace page feel more authentic
    // by displaying the current date and time, just like the real site did.
    
    const lastLoginElement = document.getElementById('last-login');

    if (lastLoginElement) {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        const formattedTime = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });

        lastLoginElement.textContent = `${formattedDate}, ${formattedTime}`;
    }

});