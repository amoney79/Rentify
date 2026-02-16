document.addEventListener('DOMContentLoaded', () => {
    // Tab Logic for Property Details
    const tabButtons = document.querySelectorAll('.nav-tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');

                // Update Button states
                tabButtons.forEach(b => {
                    b.classList.remove('active', 'bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/20');
                    b.classList.add('bg-gray-50', 'dark:bg-gray-800/50', 'text-gray-400');
                });
                btn.classList.add('active', 'bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/20');
                btn.classList.remove('bg-gray-50', 'dark:bg-gray-800/50', 'text-gray-400');

                // Update Content states
                tabContents.forEach(content => {
                    if (content.id === targetTab) {
                        content.classList.remove('hidden');
                    } else {
                        content.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Interaction logic for Marketplace Buttons
    const toast = (message, type = 'success') => {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2';
            document.body.appendChild(container);
        }

        const el = document.createElement('div');
        el.className = `bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-up transition-all`;
        el.innerHTML = `
            <div class="${type === 'success' ? 'bg-green-500' : 'bg-primary'} size-2 rounded-full"></div>
            <p class="text-sm font-bold">${message}</p>
        `;
        document.getElementById('toast-container').appendChild(el);

        setTimeout(() => {
            el.classList.add('opacity-0', 'translate-y-4');
            setTimeout(() => el.remove(), 300);
        }, 3000);
    };

    // Add to Cart
    document.getElementById('add-to-cart')?.addEventListener('click', () => {
        toast('Property added to your cart!');
    });

    // Rent Now
    document.getElementById('rent-now')?.addEventListener('click', () => {
        toast('Redirecting to secure rental agreement...', 'primary');
        setTimeout(() => {
            window.location.href = 'schedule.html';
        }, 1500);
    });

    // Wishlist Toggle
    const wishlistBtn = document.getElementById('wishlist-btn');
    wishlistBtn?.addEventListener('click', () => {
        const icon = wishlistBtn.querySelector('.material-symbols-outlined');
        const isFilled = icon.classList.contains('fill-current');

        if (isFilled) {
            icon.classList.remove('fill-current');
            toast('Removed from favorites');
        } else {
            icon.classList.add('fill-current');
            toast('Added to favorites!');
        }
    });

    // Share logic
    document.getElementById('share-btn')?.addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Rentify - Luxury 2BR Loft',
                    text: 'Check out this amazing property on Rentify!',
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Share failed', err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast('Link copied to clipboard!');
        }
    });

    // Live Viewing
    document.getElementById('live-viewing-btn')?.addEventListener('click', () => {
        toast('Joining Live Viewing stream...', 'primary');
    });

    // General Marketplace Interactions (Categories, Search, etc.)
    document.querySelector('.mega-search-btn')?.addEventListener('click', () => {
        const input = document.querySelector('.mega-search-input');
        if (input?.value) {
            toast(`Searching for "${input.value}"...`, 'primary');
        } else {
            toast('Please enter a location or property type', 'primary');
        }
    });

    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', () => {
            const name = item.innerText.trim();
            toast(`Filtering by ${name}...`, 'primary');
        });
    });

    // Property Card Likes (Small heart icons on cards)
    document.querySelectorAll('.material-symbols-outlined').forEach(icon => {
        if (icon.innerText === 'favorite' && icon.parentElement.classList.contains('cursor-pointer')) {
            icon.parentElement.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (icon.classList.contains('fill-current')) {
                    icon.classList.remove('fill-current');
                    toast('Removed from saved properties');
                } else {
                    icon.classList.add('fill-current');
                    toast('Saved to your collection!');
                }
            });
        }
    });

    // Scroll effect for header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 20) {
            header?.classList.add('shadow-lg');
        } else {
            header?.classList.remove('shadow-lg');
        }
    });
});
