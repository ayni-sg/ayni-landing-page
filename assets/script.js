document.addEventListener('DOMContentLoaded', () => {
    // Check if user just submitted a FormSubmit funnel request
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
        toast.style.color = '#FFFFFF';
        toast.style.padding = '16px 32px';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
        toast.style.zIndex = '10000';
        toast.style.fontWeight = '600';
        toast.innerText = '✨ Application Received! Welcome to Ayni Social.';
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transition = 'opacity 0.5s ease';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 5000);
        
        // Clean up window history state transparently
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});
