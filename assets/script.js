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
    
    /* Reveal on scroll for cards and sections */
    const revealSelector = '.interactive-card, .feature-card, .product-card, .hero, .stats-container';
    const revealElems = document.querySelectorAll(revealSelector);
    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElems.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    /* Simple tilt effect for interactive cards */
    const tiltCards = document.querySelectorAll('.interactive-card');
    tiltCards.forEach(card => {
        card.classList.add('tilt');
        card.style.transition = 'transform 0.25s ease, box-shadow 0.25s ease';
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const rx = (-y) * 6; // rotateX
            const ry = (x) * 6;  // rotateY
            card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* Modal: waitlist open/close */
    const modal = document.getElementById('waitlist-modal');
    const openButtons = document.querySelectorAll('.open-waitlist');
    const closeBtn = modal ? modal.querySelector('.modal-close') : null;

    function openModal() {
        if (!modal) return;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        const firstInput = modal.querySelector('input[name="name"]');
        if (firstInput) firstInput.focus();
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    openButtons.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    }));

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
});
