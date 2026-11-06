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

// County to Sublocations mapping dataset
    const sublocationData = {
        nairobi: ['Kitisuru', 'Parklands', 'Karura', 'Kangemi', 'Mountain View', 'Kimani', 'Kawangware','Gatina','Kileleshwa','Kabiro','Mutu-lni','Ngando','Riruta','Uthiru','Waithaka','Karen','Nairobi West','Mugumo-lni','Southh C','Nyayo Highrise','Laini Saba','Lindi','Woodley','Sarangome','Githurai','Kahawa West','Zimmerman','Roysambu','Kahawa Sukari','Kahawa Wendani','Clay City','Mwiki','Kasarani','Ruai','Baba Dogo','Utalii','Mathare Nortth','Lucky Summer','Korogocho','Imara Daima','Kwa Njenga','Kwa Reuben','Pipeline','Kware','Kayole North','Kayole Central','Kayole South','Komarock','Matopeni','Upper Savanna','Lower Savanna','Embakasi','Utawala','Mihango','Umoja','Kariobangi South','Viwandani','Harambee','Makongeni','Pumwani','EastLeigh North','EastLeigh South','Airbase','Ngara','Kariokor','Pangani','Landimawe','Mabatini','Huuruma','Ngei','Mlango Kubwa','Kiamaiko'],
        mombasa: ['Port Reitz', 'Kipevu', 'Airport', 'Changamwe', 'Mombasa CBD', 'Chaani', 'Jomvu', 'Miritini', 'Mikindani', 'Fort/Old Town', 'Mshomoroni', 'Bamburi', 'Mwakirunge', 'Mtopanga', 'Magogoni', 'Shanzu', 'Nyali', 'Bombolulu', 'Mkomani', 'Kongowea', 'Kadzandani', 'Mtongwe', 'Shika Adabu', 'Bofu/Shelly', 'Likoni', 'Timbwani', 'Makadara', 'Tudor', 'Tononoka', 'Shimanzi/Ganjoni', 'Majengo'],
        kisumu: ['Milimani', 'Kondele', 'Riat', 'Kisumu CBD', 'Nyalenda'],
        kilifi: ['Malindi', 'Kilifi Town', 'Watamu', 'Mtwapa', 'Kilifi Creek'],
        kwale: ['Msambweni', 'Lunga Lunga', 'Matuga', 'Kinango', 'Diani', 'Ukunda'],
        tanaRiver: ['Hola', 'Bura', 'Garsen'],
        lamu: ['Lamu Town', 'Mpeketoni', 'Faza', 'Kiunga'],
        taitaTaveta: ['Voi', 'Wundanyi', 'Taveta', 'Mwatate'],
        kiambu: ['Thika', 'Kiambu Town', 'Ruiru', 'Kikuyu', 'Limuru', 'Juja', 'Gatundu'],
        nakuru: ['Nakuru CBD', 'Naivasha', 'Gilgil', 'Molo', 'Njoro', 'Subukia'],
        nyeri: ['Nyeri Town', 'Karthini', 'Othaya', 'Mukurweini', 'Naro Moru'],
        nyandarua: ['Ol Kalou', 'Nyahururu', 'Engineer', 'Ruiru', 'Shamata'],
        kirinyaga: ['Kerugoya', 'Kutus', 'Baricho', 'Sagana', 'Wanguru'],
        muranga: ['Muranga Town', 'Kenol', 'Kangema', 'Maragua', 'Sabasaba'],
        marsabit: ['Marsabit Town', 'Moyale', 'Laisamis', 'Sololo'],
        isiolo: ['Isiolo Town', 'Garba Tulla', 'Merti'],
        meru: ['Meru CBD', 'Maua', 'Nkubu', 'Timau', 'Chuka'],
        tharakaNithi: ['Chuka', 'Kathwana', 'Marimanti', 'Mitheru'],
        embu: ['Embu Town', 'Runyenjes', 'Siakago', 'Kiritiri'],
        kitui: ['Kitui Town', 'Mwingi', 'Mutomo', 'Kyuso'],
        machakos: ['Machakos Town', 'Athi River', 'Mlolongo', 'Kangundo', 'Matuu'],
        makueni: ['Wote', 'Emali', 'Makindu', 'Sultan Hamud', 'Kibwezi'],
        turkana: ['Lodwar', 'Kakuma', 'Lokichoggio', 'Kalokol'],
        westPokot: ['Kapenguria', 'Sigor', 'Chepareria', 'Kacheliba'],
        samburu: ['Maralal', 'Baragoi', 'Wamba'],
        transNzoia: ['Kitale', 'Endebess', 'Kiminini', 'Cherangany'],
        uasinGishu: ['Eldoret CBD', 'Turbo', 'Moiben', 'Kesses', 'Soy'],
        elgeyoMarakwet: ['Iten', 'Kapsowar', 'Chebiemit'],
        nandi: ['Kapsabet', 'Nandi Hills', 'Mosoriot', 'Chemelil'],
        baringo: ['Kabarnet', 'Eldama Ravine', 'Marigat', 'Mogotio'],
        laikipia: ['Nanyuki', 'Nyahururu', 'Rumuruti', 'Doldol'],
        narok: ['Narok Town', 'Kilgoris', 'Ololulunga', 'Maara'],
        kajiado: ['Kajiado Town', 'Kitengela', 'Ongata Rongai', 'Ngong', 'Loitokitok', 'Namanga'],
        kericho: ['Kericho Town', 'Litein', 'Sotik', 'Kipkelion'],
        bomet: ['Bomet Town', 'Sotik', 'Mulot', 'Longisa'],
        kakamega: ['Kakamega Town', 'Mumias', 'Butere', 'Malava', 'Luandai'],
        vihiga: ['Mbale', 'Chavakali', 'Luanda', 'Vihiga Town'],
        bungoma: ['Bungoma Town', 'Webuye', 'Kimilili', 'Chwele', 'Kanduyi'],
        busia: ['Busia Town', 'Malaba', 'Port Victoria', 'Nambale'],
        siaya: ['Siaya Town', 'Bondo', 'Ugunja', 'Yala', 'Usenge'],
        homaBay: ['Homa Bay Town', 'Mbita', 'Oyugis', 'Ndhiwa', 'Kendu Bay'],
        migori: ['Migori Town', 'Rongo', 'Awendo', 'Isebania', 'Kehancha'],
        kisii: ['Kisii Town', 'Ogembo', 'Keroka', 'Nyamache'],
        nyamira: ['Nyamira Town', 'Keroka', 'Nyansiongo', 'Magombo'],
        garissa: ['Garissa Town', 'Dadaab', 'Masalani', 'Hulugho'],
        wajir: ['Wajir Town', 'Habaswein', 'Buna', 'Tarbaj'],
        mandera: ['Mandera Town', 'El Wak', 'Rhamu', 'Takaba']
    };

    const countySelect = document.getElementById('county-select');
    const sublocationSelect = document.getElementById('sublocation-select');

    if (countySelect && sublocationSelect) {
        countySelect.addEventListener('change', (e) => {
            const selectedCounty = e.target.value;
            
            // Clear current sublocations
            sublocationSelect.innerHTML = '<option value="">Select Area</option>';

            if (selectedCounty && sublocationData[selectedCounty]) {
                sublocationData[selectedCounty].forEach(area => {
                    const option = document.createElement('option');
                    option.value = area.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = area;
                    sublocationSelect.appendChild(option);
                });
                toast(`Loaded areas for ${countySelect.options[countySelect.selectedIndex].text}`, 'primary');
            }
        });

        sublocationSelect.addEventListener('change', (e) => {
            if (e.target.value) {
                const areaName = sublocationSelect.options[sublocationSelect.selectedIndex].text;
                toast(`Filtered by location: ${areaName}`, 'primary');
            }
        });
    }

    // Mobile Menu Toggle Logic
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('.material-symbols-outlined') : null;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');

            if (menuIcon) {
                if (mobileMenu.classList.contains('hidden')) {
                    menuIcon.textContent = 'menu';
                } else {
                    menuIcon.textContent = 'close';
                }
            }
        });
    }

    // Interaction logic for Marketplace Buttons
    const toast = (message, type = 'success') => {
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2';
            document.body.appendChild(toastContainer);
        }

        const el = document.createElement('div');
        el.className = `bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-up transition-all`;
        el.innerHTML = `
            <div class="${type === 'success' ? 'bg-green-500' : 'bg-primary'} size-2 rounded-full"></div>
            <p class="text-sm font-bold">${message}</p>
        `;
        toastContainer.appendChild(el);

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
        if (!icon) return;
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

    // Quick Filter Pills (index.html)
    document.querySelectorAll('.quick-filter-pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = pill.classList.contains('text-primary');
            if (isActive) {
                pill.classList.remove('text-primary', 'font-bold');
                pill.classList.add('text-gray-500');
                toast(`Removed filter: ${pill.innerText.trim()}`);
            } else {
                pill.classList.add('text-primary', 'font-bold');
                pill.classList.remove('text-gray-500');
                toast(`Applied filter: ${pill.innerText.trim()}`, 'primary');
            }
        });
    });

    // Generic Group Button Selector (Property Type, Bedrooms, etc.)
    const setupButtonGroup = (selector) => {
        const buttons = document.querySelectorAll(selector);
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => {
                    b.classList.remove('bg-primary', 'text-white', 'active', 'shadow-lg', 'shadow-primary/20');
                    b.classList.add('bg-white', 'dark:bg-gray-800', 'text-gray-400', 'dark:text-gray-400', 'border-gray-100', 'dark:border-gray-700');
                });
                btn.classList.add('bg-primary', 'text-white', 'active', 'shadow-lg', 'shadow-primary/20');
                btn.classList.remove('bg-white', 'dark:bg-gray-800', 'text-gray-400', 'dark:text-gray-400', 'border-gray-100', 'dark:border-gray-700', 'border-transparent');
                toast(`${btn.innerText.trim()} selected`, 'primary');
            });
        });
    };

    setupButtonGroup('.property-type-btn');
    setupButtonGroup('.bedroom-filter-btn');

    // Amenity Checkboxes
    document.querySelectorAll('.amenity-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const label = checkbox.nextElementSibling?.innerText.trim() || 'Amenity';
            if (checkbox.checked) {
                toast(`Added: ${label}`, 'success');
            } else {
                toast(`Removed: ${label}`);
            }
        });
    });

    // Price Range Slider (Simulation)
    document.getElementById('price-range-slider')?.addEventListener('click', () => {
        toast('Adjusting price range filter...', 'primary');
    });

    // Apply All Filters (Desktop & Mobile)
    ['apply-filters-desktop', 'apply-filters-mobile'].forEach(id => {
        document.getElementById(id)?.addEventListener('click', (e) => {
            if (id === 'apply-filters-mobile') e.preventDefault();
            toast('Updating results based on filters...', 'primary');
            setTimeout(() => {
                window.location.href = 'filters.html';
            }, 800);
        });
    });

    // Search button on filters.html
    document.querySelector('button.bg-primary.px-8.py-3.rounded-2xl')?.addEventListener('click', () => {
        const input = document.querySelector('input.bg-transparent.border-none.focus:ring-0');
        if (input?.value) {
            toast(`Updating results for "${input.value}"...`, 'primary');
        } else {
            toast('Updating current results...', 'primary');
        }
    });

    const categoryButtons = document.querySelectorAll('.category-item[data-category]');
    const marketplaceTitle = document.getElementById('marketplace-title');
    const marketplaceFilters = document.getElementById('marketplace-filters');
    const categorySidebar = document.getElementById('category-sidebar');
    const filterSidebar = document.getElementById('marketplace-filter-sidebar');
    const promoBanner = document.getElementById('property-grid');
    const recommendationSection = document.getElementById('recommendation-section');
    const listingSectionTitle = document.getElementById('listing-section-title');
    const listingCount = document.getElementById('listing-count');
    const propertyListings = document.getElementById('property-listings');
    const noListingsMessage = document.getElementById('no-listings-message');
    const loadMoreListings = document.getElementById('load-more-listings');
    const categorySearch = document.getElementById('category-property-search');
    const propertyCards = propertyListings?.querySelectorAll('[data-categories]') ?? [];

    const updateCategoryListings = (category) => {
        const searchTerm = categorySearch?.value.trim().toLowerCase() ?? '';
        let visibleCount = 0;

        propertyCards.forEach(card => {
            const matchesCategory = card.dataset.categories.split(' ').includes(category);
            const matchesSearch = card.querySelector('h3')?.textContent.toLowerCase().includes(searchTerm) ?? false;
            const isVisible = matchesCategory && matchesSearch;
            card.classList.toggle('hidden', !isVisible);
            if (isVisible) visibleCount += 1;
        });

        if (listingCount) {
            listingCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'listing' : 'listings'}`;
        }
        noListingsMessage?.classList.toggle('hidden', visibleCount > 0);
        loadMoreListings?.classList.toggle('hidden', visibleCount === 0);
    };

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            if (!category || !marketplaceFilters || !recommendationSection) return;

            if (listingSectionTitle) listingSectionTitle.textContent = button.dataset.label ?? 'Properties';
            marketplaceTitle?.classList.add('hidden');
            categorySidebar?.classList.add('hidden');
            filterSidebar?.classList.remove('hidden');
            promoBanner?.classList.add('hidden');
            marketplaceFilters.classList.add('category-results-layout');
            recommendationSection.classList.add('category-results-section');
            propertyListings?.classList.add('category-listings');
            marketplaceFilters.appendChild(recommendationSection);
            updateCategoryListings(category);
            recommendationSection.dataset.selectedCategory = category;
            recommendationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    categorySearch?.addEventListener('input', () => {
        const selectedCategory = recommendationSection?.dataset.selectedCategory;
        if (selectedCategory) updateCategoryListings(selectedCategory);
    });

    document.getElementById('clear-category-search')?.addEventListener('click', () => {
        if (categorySearch) categorySearch.value = '';
        const selectedCategory = recommendationSection?.dataset.selectedCategory;
        if (selectedCategory) updateCategoryListings(selectedCategory);
        categorySearch?.focus();
    });

    document.getElementById('back-to-categories')?.addEventListener('click', () => {
        if (!marketplaceFilters || !recommendationSection) return;

        marketplaceTitle?.classList.remove('hidden');
        categorySidebar?.classList.remove('hidden');
        filterSidebar?.classList.add('hidden');
        promoBanner?.classList.remove('hidden');
        marketplaceFilters.classList.remove('category-results-layout');
        recommendationSection.classList.remove('category-results-section');
        recommendationSection.dataset.selectedCategory = '';
        propertyListings?.classList.remove('category-listings');
        propertyCards.forEach(card => card.classList.remove('hidden'));
        noListingsMessage?.classList.add('hidden');
        loadMoreListings?.classList.remove('hidden');
        if (listingSectionTitle) listingSectionTitle.textContent = 'Recommended for You';
        if (listingCount) listingCount.textContent = '';
        if (categorySearch) categorySearch.value = '';
        marketplaceFilters.parentElement?.insertBefore(recommendationSection, marketplaceFilters.nextSibling);
    });

    // Property Card Likes (Small heart icons on cards)
    document.querySelectorAll('.material-symbols-outlined').forEach(icon => {
        if (icon.innerText === 'favorite' && icon.parentElement?.classList.contains('cursor-pointer')) {
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