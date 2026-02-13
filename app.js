const views = {
    home: `
        <header class="sticky top-0 z-40 bg-white/80 dark:bg-[#101622]/80 backdrop-blur-md px-4 pt-4 pb-2">
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                    <div class="bg-primary p-1.5 rounded-lg flex items-center justify-center">
                        <span class="material-symbols-outlined text-white text-xl">home_work</span>
                    </div>
                    <h1 class="text-xl font-bold tracking-tight">FindaHome</h1>
                </div>
                <div class="flex gap-3">
                    <button class="relative p-1">
                        <span class="material-symbols-outlined">notifications</span>
                        <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#101622]"></span>
                    </button>
                    <button class="p-1">
                        <span class="material-symbols-outlined">shopping_cart</span>
                    </button>
                </div>
            </div>
            <div class="flex gap-2 mb-2">
                <div class="relative flex-1">
                    <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                    <input class="w-full bg-gray-100 dark:bg-[#1c2433] border-none rounded-xl pl-10 pr-4 h-11 text-sm focus:ring-2 focus:ring-primary" placeholder="Search apartments, villas..." type="text"/>
                </div>
                <button onclick="router.navigate('filters')" class="bg-primary/10 text-primary w-11 h-11 rounded-xl flex items-center justify-center">
                    <span class="material-symbols-outlined">tune</span>
                </button>
            </div>
        </header>
        <main class="pb-24">
            <section class="px-4 py-3">
                <div class="overflow-x-auto flex gap-4 hide-scrollbar snap-x snap-mandatory">
                    <div class="min-w-full snap-start relative aspect-[21/9] rounded-2xl overflow-hidden bg-primary/20">
                        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBPRDGJXyz0FGhKnwAEopQHuCE73ByJplEc8CkGObIKDa7WH-FEgr82AKWpmycA97S86qhrgYAjVgQXQ0kmSJmNfu5qhH_JfuaPQav8gtfVVw51i06Zi9wfZQkIVtyAC8joSe7u_hxCjzoU7ttfxdWviivlPgT7oHeWzRCosqjFpmlBaAlXYhiwJwwCObP0d2kBfSW00a-R3bplDsZh9OwserqkoHwA6sm4nn7mJiorNCpzgDdJ0kD2ma0vjVVV_Zxit32JSbJznqA')"></div>
                        <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-6">
                            <span class="bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded w-fit mb-2">Featured</span>
                            <h2 class="text-white text-xl font-bold leading-tight">10% Off Your First<br/>Month's Rent</h2>
                            <p class="text-white/80 text-sm mt-1">Limited time offer in Kilimani</p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="py-2">
                <div class="flex overflow-x-auto gap-4 px-4 hide-scrollbar">
                    <div class="flex flex-col items-center gap-1.5 shrink-0">
                        <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <span class="material-symbols-outlined text-2xl">apartment</span>
                        </div>
                        <span class="text-xs font-medium">Apartment</span>
                    </div>
                    <div class="flex flex-col items-center gap-1.5 shrink-0">
                        <div class="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                            <span class="material-symbols-outlined text-2xl">bungalow</span>
                        </div>
                        <span class="text-xs font-medium">Villas</span>
                    </div>
                </div>
            </section>
            <div class="flex items-center justify-between px-4 pt-6 pb-3">
                <h2 class="text-lg font-bold">Recommended for You</h2>
                <button class="text-primary text-sm font-semibold">View All</button>
            </div>
            <div class="grid grid-cols-2 gap-3 px-4">
                <div onclick="router.navigate('property-details')" class="bg-white dark:bg-[#1c2433] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 cursor-pointer">
                    <div class="relative aspect-square">
                        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDislB9eDStdQfVeUXT-SyVYIktdYj4dn1rLs71l6k9U2PyNGYNNFrTSNc9vpmx-1nxZvV3C7xTOHKuL_z-JzyJlV_T9zSmkLpWqQELXWnwdeBWTC_gAwAsO4XuJ9XTTKaNGxd6KvkFkqfHdtlaykJTFfvzJjU7r5Dz5nFelagyTDehv6EwDvE3Dmm0Pv4IBvdDn6HaikyLJuu5BGtc6TRELsBd5pTZoYhKM13gtdCCDe07Kg4J7KzTaxaSxrK6staX7TwHfOMKMTQ')"></div>
                        <button class="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white">
                            <span class="material-symbols-outlined text-lg leading-none">favorite</span>
                        </button>
                        <div class="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-[10px] text-white px-1.5 py-0.5 rounded font-medium">Verified</div>
                    </div>
                    <div class="p-3">
                        <div class="flex items-baseline gap-1">
                            <span class="text-primary font-bold text-lg">$450</span>
                            <span class="text-[10px] text-gray-500 dark:text-gray-400">/mo</span>
                        </div>
                        <h3 class="text-sm font-semibold truncate mt-1">Luxury Studio Unit</h3>
                        <div class="flex items-center gap-1 text-gray-500 dark:text-gray-400 mt-1">
                            <span class="material-symbols-outlined text-xs">location_on</span>
                            <span class="text-[10px] truncate">Westlands, Nairobi</span>
                        </div>
                    </div>
                </div>
            </div>
            <button class="fixed bottom-24 right-4 bg-primary text-white flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg shadow-primary/30 z-40">
                <span class="material-symbols-outlined">map</span>
                <span class="text-sm font-bold">Map</span>
            </button>
        </main>
    `,
    filters: `
        <header class="sticky top-0 z-40 bg-white dark:bg-[#101622] border-b border-gray-200 dark:border-gray-800">
            <div class="flex items-center p-4 pb-2 justify-between">
                <div onclick="router.navigate('home')" class="text-gray-900 dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer">
                    <span class="material-symbols-outlined">arrow_back_ios</span>
                </div>
                <h2 class="text-gray-900 dark:text-white text-lg font-bold flex-1 text-center">Search & Filters</h2>
                <div class="w-12"></div>
            </div>
            <div class="px-4 py-3">
                <div class="flex w-full items-stretch rounded-xl h-12 overflow-hidden shadow-sm bg-gray-100 dark:bg-[#1c2433]">
                    <div class="text-gray-400 flex items-center justify-center pl-4">
                        <span class="material-symbols-outlined">search</span>
                    </div>
                    <input class="w-full border-none bg-transparent focus:ring-0 h-full px-4 pl-2 text-base" placeholder="Search locations..." value="Nairobi, Westlands"/>
                    <div class="text-primary flex items-center justify-center pr-4">
                        <span class="material-symbols-outlined">tune</span>
                    </div>
                </div>
            </div>
        </header>
        <main class="pb-32 px-4 pt-4">
            <section class="mb-6">
                <h3 class="text-lg font-bold mb-4">Price Range</h3>
                <div class="bg-gray-100 dark:bg-[#1c2433] p-6 rounded-2xl">
                    <div class="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full relative">
                        <div class="absolute left-1/4 right-1/4 h-full bg-primary rounded-full"></div>
                        <div class="absolute left-1/4 -top-2 size-5 bg-white border-2 border-primary rounded-full shadow-md"></div>
                        <div class="absolute right-1/4 -top-2 size-5 bg-white border-2 border-primary rounded-full shadow-md"></div>
                    </div>
                    <div class="flex justify-between mt-4 text-sm font-semibold">
                        <span>Ksh 15,000</span>
                        <span>Ksh 85,000</span>
                    </div>
                </div>
            </section>
            <section class="mb-6">
                <h3 class="text-lg font-bold mb-3">Property Type</h3>
                <div class="flex gap-2 overflow-x-auto no-scrollbar">
                    <button class="px-5 py-2 rounded-full bg-primary text-white text-sm font-medium border border-primary">All Types</button>
                    <button class="px-5 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-white text-sm font-medium border border-gray-200 dark:border-gray-700">Apartment</button>
                </div>
            </section>
            <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-4 bg-gradient-to-t from-white dark:from-[#101622] pt-8">
                <button onclick="router.navigate('home')" class="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30">Show 124 Results</button>
            </div>
        </main>
    `,
    'property-details': `
        <div class="relative">
            <div class="fixed top-0 z-50 flex w-full max-w-[480px] items-center justify-between p-4">
                <button onclick="router.navigate('home')" class="size-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white">
                    <span class="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <div class="flex gap-2">
                    <button class="size-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white">
                        <span class="material-symbols-outlined">favorite</span>
                    </button>
                    <button class="size-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white">
                        <span class="material-symbols-outlined">share</span>
                    </button>
                </div>
            </div>
            <div class="aspect-[4/5] bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBpoYbf3ZNwA43NOJ5rHCiHb6f86MvEYWR-HxtCbpznVLOwRK7XFj2ekhEW3oNjeLb3mGVZAPbeEl_vHbKYWURtQpJudJeXV5yV756utzkYPqNut2wl3VL92MNYePYLc3qtkNM9QOfPbmueM_shr1j7FB72ln7BoiirzzaR5MV3iilxRGm-1hNW64sjItp0FNpQst1RORFzR4eEBu62i0PITnMdRgjNSMZRkLPgOYvqG1wZvdf4Xivg3mQGjjm2oSqq-cFusUPvz9s')"></div>
            <div class="px-4 -mt-8 relative z-10 bg-white dark:bg-[#101622] rounded-t-[32px] pt-8 min-h-screen">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <span class="inline-flex items-center gap-1 rounded bg-primary/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary mb-2">
                            <span class="material-symbols-outlined !text-xs">verified</span> Verified Listing
                        </span>
                        <h1 class="text-2xl font-bold">Luxury 2-Bedroom Apartment</h1>
                        <div class="flex items-center gap-1 text-gray-500 mt-1">
                            <span class="material-symbols-outlined text-sm">location_on</span>
                            <span class="text-sm">Westlands, Nairobi</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-primary text-2xl font-bold font-display">$1,200</div>
                        <div class="text-gray-400 text-xs mt-1">/ month</div>
                    </div>
                </div>
                <h3 class="text-lg font-bold mb-3">About this space</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                    Experience high-end urban living in this sun-drenched sanctuary. Featuring floor-to-ceiling windows, premium smart home integration, and breathtaking city views.
                </p>
                <div class="grid grid-cols-4 gap-4 mb-8">
                    <div class="flex flex-col items-center gap-2">
                        <div class="size-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-primary">
                            <span class="material-symbols-outlined">wifi</span>
                        </div>
                        <span class="text-[10px] text-gray-500 font-bold uppercase">WiFi</span>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <div class="size-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-primary">
                            <span class="material-symbols-outlined">pool</span>
                        </div>
                        <span class="text-[10px] text-gray-500 font-bold uppercase">Pool</span>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <div class="size-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-primary">
                            <span class="material-symbols-outlined">fitness_center</span>
                        </div>
                        <span class="text-[10px] text-gray-500 font-bold uppercase">Gym</span>
                    </div>
                </div>
                <div onclick="router.navigate('booking-schedule')" class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-4 bg-white/80 dark:bg-[#101622]/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800">
                    <button class="w-full bg-primary text-white h-14 rounded-2xl font-bold flex items-center justify-center gap-2">Book Viewing Now</button>
                </div>
            </div>
        </div>
    `,
    chat: `
        <header class="sticky top-0 z-40 bg-white dark:bg-[#101622] border-b border-gray-200 dark:border-gray-800 p-4 flex items-center gap-4">
            <button onclick="router.navigate('home')" class="size-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <span class="material-symbols-outlined">arrow_back_ios_new</span>
            </button>
            <div class="flex items-center gap-3 flex-1">
                <div class="size-10 rounded-full bg-cover" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDuEATf7dZYNF-h_g3rZE-xxG7ykTdRZFUG6PiEwuhbQeRUfwPQkHmvj8Ltl3hcUF-iTKvo02OOnqk6ipPT7UPSrQmSTpiUBfbt4VlVxBJJoBslFpPaeVjHb83PU-pzyJMnu4a1vO671EaEGBXgPgwc5xl2NqqBVZAdQUynXGt5bSymKFwz-iCx-YuCm45pKTfJ9ihGVcthBX__cFtvHQ8Rgx-xySw4UzDB0lFyx7MiDYdF9TueVB2yTOPY2p-fzDE1-_6xS3A6HR8')"></div>
                <div>
                    <h3 class="font-bold">Sarah Johnson</h3>
                    <div class="flex items-center gap-1 text-[10px] text-primary font-bold">
                        <span class="material-symbols-outlined !text-xs">verified</span> VERIFIED AGENT
                    </div>
                </div>
            </div>
        </header>
        <main class="flex-1 p-4 space-y-4 overflow-y-auto pb-32">
            <div class="flex justify-center"><span class="text-[10px] uppercase font-bold text-gray-400">Today</span></div>
            <div class="flex items-end gap-2">
                <div class="max-w-[80%] bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl rounded-bl-none">
                    <p class="text-sm">Hello! The apartment in Kilimani is available for viewing this weekend. Shall we schedule a time?</p>
                </div>
            </div>
            <div class="flex items-end gap-2 justify-end">
                <div class="max-w-[80%] bg-primary text-white p-4 rounded-2xl rounded-br-none">
                    <p class="text-sm">Yes, Saturday morning at 10 AM works for me.</p>
                </div>
            </div>
        </main>
        <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-4 bg-white dark:bg-[#101622] border-t border-gray-200 dark:border-gray-800">
            <div class="flex gap-2">
                <input class="flex-1 bg-gray-100 dark:bg-gray-800 border-none rounded-xl px-4 py-3 text-sm" placeholder="Type a message..."/>
                <button class="bg-primary text-white size-12 rounded-xl flex items-center justify-center">
                    <span class="material-symbols-outlined">send</span>
                </button>
            </div>
        </div>
    `,
    'landlord-dashboard': `
        <header class="p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
            <div class="flex items-center gap-3">
                <div class="size-12 rounded-full border-2 border-primary overflow-hidden">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU0WBI3Zsk8CoNujzvZLFNYa55VlCKsC-PgS8OykghBr2dIoDRpmDhsZZGFeCSAAljCS1SY3iYHPblE9nFHhSkLLjVlqzuw-VVNfJbQ62bjUurZFCCuDJGw4d-_awUQgCtLtOZ0eWc2x6LPe9epEt6dfhVCcOgJHrQmPUDVJ5MvXLDL1L8BNQJS3qIFgu9QOfUUZeZltgI1GzA_C5nmxpSoX8KKlrjWlw-9NT4KmbLXbYknDgsJSHziHJ6AwFGYPRj_VY6rwzJ0sM" class="w-full h-full object-cover">
                </div>
                <div>
                    <h2 class="font-bold text-lg">James Mwangi</h2>
                    <p class="text-xs text-gray-500">Portfolio Manager</p>
                </div>
            </div>
            <button onclick="router.navigate('agent-onboarding')" class="text-xs font-bold text-primary border border-primary/20 px-3 py-1.5 rounded-full bg-primary/10">GO AGENT</button>
        </header>
        <main class="p-4 space-y-4 pb-32">
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <p class="text-xs text-gray-400 font-bold uppercase">Views</p>
                    <p class="text-2xl font-bold">12.4K</p>
                    <p class="text-[10px] text-green-500 font-bold">+12% vs last month</p>
                </div>
                <div class="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <p class="text-xs text-gray-400 font-bold uppercase">Bookings</p>
                    <p class="text-2xl font-bold">28</p>
                    <p class="text-[10px] text-green-500 font-bold">+5% vs last month</p>
                </div>
            </div>
            <h3 class="font-bold text-lg mt-6">Recent Notifications</h3>
            <div class="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex gap-4">
                <div class="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined">calendar_today</span>
                </div>
                <div>
                    <p class="text-sm font-bold">New Viewing Request</p>
                    <p class="text-xs text-gray-400 mt-1">Someone wants to see Unit 4B at Silver Towers tomorrow.</p>
                    <div class="flex gap-2 mt-3">
                        <button class="flex-1 bg-primary text-white text-xs py-2 rounded-lg font-bold">Accept</button>
                        <button class="flex-1 bg-gray-100 dark:bg-gray-700 text-xs py-2 rounded-lg font-bold">Decline</button>
                    </div>
                </div>
            </div>
        </main>
    `,
    'booking-schedule': `
        <header class="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-4">
            <button onclick="router.navigate('property-details')" class="size-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <span class="material-symbols-outlined">arrow_back_ios_new</span>
            </button>
            <h2 class="text-lg font-bold">Select Schedule</h2>
        </header>
        <main class="p-4 space-y-6 pb-32">
            <div class="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                <h3 class="font-bold mb-4">Choose Date</h3>
                <div class="grid grid-cols-7 gap-2 text-center text-xs font-bold">
                    <div class="text-gray-400">S</div><div class="text-gray-400">M</div><div class="text-gray-400">T</div><div class="text-gray-400">W</div><div class="text-gray-400">T</div><div class="text-gray-400">F</div><div class="text-gray-400">S</div>
                    <div class="p-2 opacity-30">27</div><div class="p-2 opacity-30">28</div><div class="p-2 bg-primary/10 text-primary rounded-lg border border-primary/20">29</div><div class="p-2">30</div><div class="p-2">1</div><div class="p-2">2</div><div class="p-2">3</div>
                </div>
            </div>
            <h3 class="font-bold">Available Slots</h3>
            <div class="grid grid-cols-2 gap-3">
                <button class="p-3 border-2 border-primary bg-primary/10 rounded-xl text-sm font-bold text-primary">09:00 AM</button>
                <button class="p-3 border-2 border-gray-100 dark:border-gray-700 rounded-xl text-sm font-bold">11:30 AM</button>
                <button class="p-3 border-2 border-gray-100 dark:border-gray-700 rounded-xl text-sm font-bold">02:00 PM</button>
                <button class="p-3 border-2 border-gray-100 dark:border-gray-700 rounded-xl text-sm font-bold">04:30 PM</button>
            </div>
            <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-4 bg-white dark:bg-[#101622] border-t border-gray-200 dark:border-gray-800">
                <button onclick="router.navigate('payment')" class="w-full bg-primary text-white h-14 rounded-2xl font-bold">Proceed to Payment</button>
            </div>
        </main>
    `,
    payment: `
        <header class="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <button onclick="router.navigate('booking-schedule')" class="size-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <span class="material-symbols-outlined">arrow_back_ios_new</span>
            </button>
            <h2 class="text-lg font-bold">Secure Payment</h2>
            <div class="w-10"></div>
        </header>
        <main class="p-4 space-y-6 flex flex-col items-center">
            <div class="text-center mt-8">
                <p class="text-gray-400 font-bold uppercase text-xs tracking-widest">Total Amount</p>
                <h1 class="text-5xl font-bold mt-2">KSh 1,500</h1>
            </div>
            <div class="w-full space-y-3">
                <div class="p-4 border-2 border-primary bg-primary/10 rounded-2xl flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="size-12 bg-green-500 rounded-xl flex items-center justify-center text-white"><span class="material-symbols-outlined">smartphone</span></div>
                        <div><p class="font-bold">M-Pesa</p><p class="text-xs text-gray-500">Fast & Secure</p></div>
                    </div>
                    <div class="size-6 border-2 border-primary rounded-full flex items-center justify-center"><div class="size-3 bg-primary rounded-full"></div></div>
                </div>
                <div class="p-4 border-2 border-gray-100 dark:border-gray-800 rounded-2xl flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="size-12 bg-blue-500 rounded-xl flex items-center justify-center text-white"><span class="material-symbols-outlined">credit_card</span></div>
                        <div><p class="font-bold">Card</p><p class="text-xs text-gray-500">Visa / Mastercard</p></div>
                    </div>
                    <div class="size-6 border-2 border-gray-300 rounded-full"></div>
                </div>
            </div>
            <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-4 bg-white dark:bg-[#101622] border-t border-gray-200 dark:border-gray-800">
                <button onclick="router.navigate('success')" class="w-full bg-primary text-white h-14 rounded-2xl font-bold">Pay Now</button>
            </div>
        </main>
    `,
    success: `
        <main class="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-[#101622]">
            <div class="size-24 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                <span class="material-symbols-outlined !text-6xl font-bold">check_circle</span>
            </div>
            <h1 class="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p class="text-gray-500 mb-8">Your viewing has been scheduled. The agent will contact you soon to finalize details.</p>
            <div class="w-full bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl mb-8 space-y-4">
                <div class="flex justify-between items-center"><span class="text-gray-400 font-medium">Date</span><span class="font-bold">Tuesday, Oct 24th</span></div>
                <div class="flex justify-between items-center"><span class="text-gray-400 font-medium">Time</span><span class="font-bold">10:30 AM</span></div>
                <div class="flex justify-between items-center"><span class="text-gray-400 font-medium">Agent</span><span class="font-bold">Sarah Johnson</span></div>
            </div>
            <button onclick="router.navigate('home')" class="w-full bg-primary text-white h-14 rounded-2xl font-bold">Back to Home</button>
        </main>
    `,
    'agent-onboarding': `
        <header class="p-4 flex justify-between items-center">
            <span onclick="router.navigate('landlord-dashboard')" class="material-symbols-outlined cursor-pointer">close</span>
            <h2 class="font-bold">Agent Onboarding</h2>
            <div class="w-6"></div>
        </header>
        <main class="p-8 flex-1 flex flex-col">
            <div class="bg-primary/20 aspect-video rounded-3xl flex items-center justify-center mb-8 relative overflow-hidden">
                <div class="bg-primary p-4 rounded-full shadow-xl shadow-primary/40 relative z-10"><span class="material-symbols-outlined text-white text-4xl">verified</span></div>
                <div class="absolute inset-0 bg-cover bg-center brightness-50" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDi9ekfuyG4ZMCQQeywG81RdUaioqR49I3Oe-jSXonJfbkYEP4rlBLilU1BquVH8iknox01NNg220loYWdJR3tFf7Ux4SXFy5Tu8aXtb8S1OfryWa2aK5xRaI75MNkskDAXfEczVeaMuhYZ9-WX_7_AVYL9OetEmRn4CFHEtB292qkS7KVj-eUxm72vPz4E__rDO4dkU7opd-YwiqjNR8uw5mB8PcIBMTSCy-q-48IiiW8c-fr3gfm7hOEQQ1q-VSRK06atuPFgO6s')"></div>
            </div>
            <h1 class="text-3xl font-bold mb-4 text-center">Boost Your Business</h1>
            <p class="text-gray-400 text-center mb-8 leading-relaxed">Verified agents receive 3x more leads and gain instant trust from potential tenants.</p>
            <div class="space-y-6 flex-1">
                <div class="flex gap-4"><div class="size-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary"><span class="material-symbols-outlined">badge</span></div><div><p class="font-bold">Trust Badge</p><p class="text-sm text-gray-500">Appear verified on all listings</p></div></div>
                <div class="flex gap-4"><div class="size-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary"><span class="material-symbols-outlined">trending_up</span></div><div><p class="font-bold">Top Placement</p><p class="text-sm text-gray-500">Your listings stay at the top</p></div></div>
            </div>
            <div class="pt-8">
                <button onclick="router.navigate('agent-upload')" class="w-full bg-primary text-white h-14 rounded-2xl font-bold">Get Started</button>
            </div>
        </main>
    `,
    'agent-upload': `
        <header class="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <button onclick="router.navigate('agent-onboarding')" class="size-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"><span class="material-symbols-outlined">arrow_back_ios_new</span></button>
            <h2 class="font-bold">Identity Verification</h2>
            <div class="text-primary font-bold text-sm">1/2</div>
        </header>
        <main class="p-6 space-y-6 pb-32">
            <h1 class="text-2xl font-bold">Upload ID and License</h1>
            <div class="space-y-4">
                <div><label class="text-sm font-bold block mb-2">ID / Passport Number</label><input class="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-xl p-4" placeholder="Enter ID number..."/></div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="aspect-square bg-gray-100 dark:bg-gray-800 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-2"><span class="material-symbols-outlined text-gray-400">add_a_photo</span><p class="text-[10px] uppercase font-bold text-gray-400">ID Front</p></div>
                    <div class="aspect-square bg-gray-100 dark:bg-gray-800 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-2"><span class="material-symbols-outlined text-gray-400">add_a_photo</span><p class="text-[10px] uppercase font-bold text-gray-400">ID Back</p></div>
                </div>
            </div>
            <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-4 bg-white dark:bg-[#101622] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <button onclick="router.navigate('liveness-check')" class="w-full bg-primary text-white h-14 rounded-2xl font-bold">Continue</button>
            </div>
        </main>
    `,
    'liveness-check': `
        <header class="p-4 flex items-center justify-between">
            <span class="material-symbols-outlined cursor-pointer" onclick="router.navigate('agent-upload')">arrow_back_ios</span>
            <h2 class="font-bold">Face Liveness</h2>
            <div class="text-primary font-bold text-sm">2/2</div>
        </header>
        <main class="p-8 flex-1 flex flex-col items-center text-center">
            <h1 class="text-2xl font-bold mb-2">Almost there!</h1>
            <p class="text-gray-400 text-sm mb-8 px-4">Slowly turn your head inside the frame to confirm identity.</p>
            <div class="size-64 rounded-full border-4 border-primary relative overflow-hidden bg-gray-900 group">
                <div class="absolute inset-0 bg-cover bg-center brightness-75 group-hover:brightness-100 transition-all" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5vsJ6mDBdboCFsh9JaBAyoUkJx_LTOgQI16joJ1Eg8C-KkjXHYeBitgDyv9fJshGXnmHuemv0TYeXp7Hyk0t_EQuNRtF6s3-W0ou8nAzD6Qp3J9XsDurYI-87NwE0-i6o8vQGoZb7ysi8-azKRHo17L56VMftPRh5HsqQTQKiPuRwyiAhkgxevgofim28NL4WtWYzWh3w_EQMomij4Aag9axtOZX3gQ4CpXD-gbT_Xw1EBBOZeowh-PCm60DDsyCysXhPNWWnOjc')"></div>
                <div class="absolute inset-0 border-[16px] border-[#101622]/80 rounded-full"></div>
                <div class="absolute top-1/2 left-0 w-full h-1 bg-primary/60 animate-pulse shadow-[0_0_15px_#135bec]"></div>
            </div>
            <div class="flex-1"></div>
            <button onclick="router.navigate('success')" class="w-full bg-primary text-white h-14 rounded-2xl font-bold shadow-lg shadow-primary/30">Finish Verification</button>
        </main>
    `,
    'admin-dashboard': `
        <header class="p-6 flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold">Admin Console</h1>
                <p class="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Platform Status: Active</p>
            </div>
            <div class="size-12 rounded-full overflow-hidden border-2 border-primary"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD68fJB-SrzHOyOdCdgNYcJm9qKNPc-0Qt9Z937_5eFZgwhXY8OUccaceUqVLxAn6pez9xeFx-G0gsM8jwbCzI3TaeyxD08-OgIGzyTxeg2R6zaMF_Zff1C50RxgfXiJOh90JTGn9qb-YZkoO0qwYRpvMVA5aufouOtXMKlko1N5W_GTyjdGjK7K04MD6Ha6V0Hb-tHtn8AbdeJDBfH2AvTYq1LuyQMuu0Zhg9ZqL8lQxcXXc11uVau3KTbYpo9fcdCgZbO-duwsdg" class="w-full h-full object-cover"></div>
        </header>
        <main class="p-6 space-y-4 pb-32">
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-amber-500/10 border border-amber-500/20 p-4 rounded-3xl"><h2 class="text-3xl font-bold text-amber-500">24</h2><p class="text-[10px] font-bold uppercase text-amber-500/80">Pending Verification</p></div>
                <div class="bg-primary/10 border border-primary/20 p-4 rounded-3xl"><h2 class="text-3xl font-bold text-primary">1.2K</h2><p class="text-[10px] font-bold uppercase text-primary/80">Active Agents</p></div>
            </div>
            <h3 class="font-bold text-lg mt-8 mb-4">Verification Requests</h3>
            <div onclick="router.navigate('document-review')" class="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center justify-between cursor-pointer">
                <div class="flex items-center gap-4">
                    <div class="size-12 rounded-xl bg-cover" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuClPl8FMaOEaa3Etq0qocSgHFbke21eSkXWWQVBeHPY9YgirFfWN41MhjBfOWWxmRrhmcspbnZOoaCEaIkHXELaZ6evJE64AbQKUzmlZctbJ95V3WjwviAb9o6Yzj9vpZ-Fvka9e5VhlKkyIBffHGVUtjuCvPD3LkWUtGkwBmVN1QSP7pdwNIFTA8ddfsvCZcANuP96yTbu8tL8EYk27hGT8ndp2D_Aqob77Kqgx-TQcEZH8CeJWzqeFgHbzw3ck2qbTn7xCR1VQkc')"></div>
                    <div><p class="font-bold">Sarah Jenkins</p><p class="text-xs text-gray-400">Agent ID: #4492</p></div>
                </div>
                <span class="material-symbols-outlined text-gray-400">chevron_right</span>
            </div>
        </main>
    `,
    'document-review': `
        <header class="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white/90 dark:bg-[#101622]/90 backdrop-blur-md">
            <button onclick="router.navigate('admin-dashboard')" class="size-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"><span class="material-symbols-outlined">arrow_back_ios_new</span></button>
            <h2 class="font-bold">Agent Audit</h2>
            <div class="size-10 flex items-center justify-center rounded-full bg-primary/10 text-primary"><span class="material-symbols-outlined">verified_user</span></div>
        </header>
        <main class="p-6 space-y-8 pb-32">
            <div><h1 class="text-3xl font-bold">Johnathan Doe</h1><p class="text-gray-400">Verified identity & professional license</p></div>
            <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2"><p class="text-[10px] font-bold uppercase text-gray-400">National ID</p><div class="aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC73-eHZQps8SWZp7qyeetPjE9GyosuXivOOUm9d0WaJ21fp6zMfL_vW-uk9pr5Bupmyaihb0i-codmiT85vnqUi92ddkiQgkpRDEBf7_2U7rE2k7ZsNG-VOAl-fqpZ7pymQ_TC1jNsLHrhBe5nFJvGfQw4tbOktC59qCo2wDtuZjIM682wpsR6ivswVGHSBvTr3GDOEh4HLY2yqypdkd7SaaOM59BXB-V2Nu9B2TSC7ouKibuK_RU2AGT3AFXDVU34s4lLVSaVoNE" class="w-full h-full object-cover"></div></div>
                <div class="space-y-2"><p class="text-[10px] font-bold uppercase text-gray-400">License</p><div class="aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuArF610VSmf5o2Q6FZj28SmyuP4mlSMQYce6qBfbo4iAGg1ZsEkSlM42Z7Yd8soywdlUGSUKotZvDXCE4mXCTp8Oe0BKtN2Foqlb7e-fQ360n4ssoBQwymJPl280ccdIJ2L0R02vx5sCE9yHibPKR46cS0kxloyN3uz1XC6QP-o6XnUPZ3hIxI-QGP7ajBc9IAngm7WCGKHB-GoHVpEgBqSKvBZTo2AzzuqFrjJyGQRZrOYYBeAITNFwJ6fRT2cLmi03YAxJSYGnzI" class="w-full h-full object-cover"></div></div>
            </div>
            <div class="bg-primary/10 p-4 rounded-3xl border border-primary/20">
                <div class="flex items-center justify-between mb-2"><h4 class="font-bold">Liveness Match</h4><span class="text-primary font-bold">98% Match</span></div>
                <p class="text-xs text-primary/80">Selfie biometric data matches the national ID document. Verified at 14:02 GMT+3</p>
            </div>
            <footer class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-4 bg-white dark:bg-[#101622] flex gap-4">
                <button onclick="router.navigate('admin-dashboard')" class="flex-1 bg-red-500/10 text-red-500 h-14 rounded-2xl font-bold">Reject</button>
                <button onclick="router.navigate('admin-dashboard')" class="flex-1 bg-primary text-white h-14 rounded-2xl font-bold shadow-lg shadow-primary/30">Approve</button>
            </footer>
        </main>
    `
};

const router = {
    currentView: null,
    navigate: function(viewId) {
        if (!views[viewId]) return;
        
        const container = document.getElementById('view-container');
        container.innerHTML = views[viewId];
        this.currentView = viewId;
        
        // Handle bottom nav visibility
        const nav = document.getElementById('main-nav');
        const hideNavOn = ['property-details', 'chat', 'payment', 'success', 'booking-schedule', 'agent-onboarding', 'agent-upload', 'liveness-check', 'document-review'];
        
        if (hideNavOn.includes(viewId)) {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
        }
        
        // Active indicator on nav
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('text-primary');
            item.classList.add('text-gray-400');
            if (item.dataset.view === viewId) {
                item.classList.add('text-primary');
                item.classList.remove('text-gray-400');
            }
        });

        // Scroll to top
        window.scrollTo(0, 0);
    }
};

// Initialize the app with the home view
document.addEventListener('DOMContentLoaded', () => {
    router.navigate('home');
});
