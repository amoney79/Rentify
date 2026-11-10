document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (appContainer && currentPage.toLowerCase() !== 'index.html') {
        Array.from(appContainer.children)
            .filter((element) => element.tagName === 'HEADER' && element.querySelector('nav'))
            .forEach((header) => {
                header.classList.add('site-navigation-header');
                header.querySelector(':scope > nav')?.remove();

                Array.from(header.children).forEach((child) => {
                    if (child.matches('a[href="profile.html"]') || child.querySelector('a[href="profile.html"]')) {
                        child.remove();
                    }
                });
            });

        const backIcons = ['arrow_back', 'arrow_back_ios', 'arrow_back_ios_new'];
        const backLink = Array.from(document.querySelectorAll('a')).find((link) => {
            const icon = link.querySelector('.material-symbols-outlined');
            return icon && backIcons.includes(icon.textContent.trim());
        });
        const toolbar = document.createElement('div');
        toolbar.className = 'page-toolbar';

        const backButton = backLink || document.createElement('a');
        backButton.href = backLink?.getAttribute('href') || 'index.html';
        backButton.className = 'page-back-button';
        backButton.setAttribute('aria-label', 'Go back to the previous page');
        backButton.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">arrow_back</span>';

        backButton.addEventListener('click', (event) => {
            if (window.history.length < 2 || !document.referrer) return;

            try {
                const referrer = new URL(document.referrer);
                if (referrer.protocol === window.location.protocol && referrer.host === window.location.host) {
                    event.preventDefault();
                    window.history.back();
                }
            } catch {
                return;
            }
        });

        toolbar.append(backButton);
        appContainer.prepend(toolbar);
    }

    document.querySelectorAll('nav.fixed.bottom-0').forEach((nav) => nav.remove());

    if (appContainer) {
        const mobileNav = document.createElement('nav');
        mobileNav.className = 'mobile-site-nav';
        mobileNav.setAttribute('aria-label', 'Main navigation');

        const pageRoutes = [
            { href: 'index.html', label: 'Marketplace', icon: 'home', pages: ['index.html'] },
            { href: 'filters.html', label: 'Explore', icon: 'explore', pages: ['filters.html'] },
            { href: 'chat.html', label: 'Messages', icon: 'chat_bubble', pages: ['chat.html'] },
            { href: 'profile.html', label: 'Profile', icon: 'account_circle', pages: ['profile.html', 'admin.html', 'review.html', 'onboarding.html', 'upload.html', 'liveness.html'] },
        ];
        const activePage = pageRoutes.find((route) => route.pages.includes(currentPage.toLowerCase()))
            || pageRoutes[0];

        pageRoutes.forEach((route) => {
            const link = document.createElement('a');
            link.href = route.href;
            link.className = `mobile-site-nav-link${route === activePage ? ' is-active' : ''}`;
            if (route === activePage) link.setAttribute('aria-current', 'page');
            link.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">${route.icon}</span><span>${route.label}</span>`;
            mobileNav.appendChild(link);
        });

        appContainer.appendChild(mobileNav);
    }

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
        nairobi: ['Kitisuru', 'Parklands', 'Karura', 'Kangemi', 'Mountain View', 'Kilimani', 'Kawangware','Gatina','Kileleshwa','Kabiro','Mutu-lni','Ngando','Riruta','Uthiru','Waithaka','Karen','Nairobi West','Mugumo-lni','Southh C','Nyayo Highrise','Laini Saba','Lindi','Woodley','Sarangome','Githurai','Kahawa West','Zimmerman','Roysambu','Kahawa Sukari','Kahawa Wendani','Clay City','Mwiki','Kasarani','Ruai','Baba Dogo','Utalii','Mathare Nortth','Lucky Summer','Korogocho','Imara Daima','Kwa Njenga','Kwa Reuben','Pipeline','Kware','Kayole North','Kayole Central','Kayole South','Komarock','Matopeni','Upper Savanna','Lower Savanna','Embakasi','Utawala','Mihango','Umoja','Kariobangi South','Viwandani','Harambee','Makongeni','Pumwani','EastLeigh North','EastLeigh South','Airbase','Ngara','Kariokor','Pangani','Landimawe','Mabatini','Huuruma','Ngei','Mlango Kubwa','Kiamaiko'],
        mombasa: ['Port Reitz', 'Kipevu', 'Airport', 'Changamwe', 'Mombasa CBD', 'Chaani', 'Jomvu', 'Miritini', 'Mikindani', 'Fort/Old Town', 'Mshomoroni', 'Bamburi', 'Mwakirunge', 'Mtopanga', 'Magogoni', 'Shanzu', 'Nyali', 'Bombolulu', 'Mkomani', 'Kongowea', 'Kadzandani', 'Mtongwe', 'Shika Adabu', 'Bofu/Shelly', 'Likoni', 'Timbwani', 'Makadara', 'Tudor', 'Tononoka', 'Shimanzi/Ganjoni', 'Majengo'],
        kilifi: ['Shella', 'Maweni', 'Watamu', 'Mtwapa', 'Kibaoni','Chera wa Mae','Misufini','Kwa Mike','Shingila','Uwanja Water','Kwa Mwango','Mtaani','Kavenya','Naivas','Kaya','Mephi','Kwa Mwango','Mkoroshoni','Jacaranda','Garoda','Turtle Bay','Ganda','Tezo','Sokoni','Dabaso','Matsangoni','Mtepeni','Mnarani','Chasimba','Junju','Gadze','Bamba','Jaribuni','Sokoke','Marafa','Gongoni','Garashi','Sabaki','Mariakani','Rabai','Kambe','Kaloleni','Kayafungo','Mwanamwinga'],
        kisumu: ['Kajulu', 'Kolwa East', 'Manyatta B', 'Nyalenda A', 'Nyalenda B', 'South West Kisumu', 'Central Kisumu', 'Kisumu North', 'West Kisumu', 'North West Kisumu', 'Railways', 'Migosi', 'Shaurimoyo Kaloleni', 'Market Milimani', 'Kondele', 'North Seme', 'West Seme', 'Central Seme', 'East Seme', 'East Kano/Wawidhi', 'Awasi/Onjiko', 'Ahero', 'Kabonyo/Kanyagwal', 'Kobura', 'Miwani', 'Ombeyi', "Masogo/Nyang'oma", 'Chemelil', 'Muhoroni/Koru', 'South East Nyakach', 'West Nyakach', 'Central Nyakach', 'North Nyakach', 'South West Nyakach', 'Kisumu Railway Station', 'Kibuye', 'Migosi Estate', 'Milimani Estate', 'Kisumu CBD', 'Kondele Junction', 'Manyatta Estate', 'Nyalenda Phase 1', 'Nyalenda Phase 2', 'Tom Mboya Estate', 'Migingo', 'Obunga Area', 'Kajulu Hills', 'Ahero Town', 'Awasi Trading Centre', 'Chemelil Sugar', 'Muhoroni Town', 'Koru', 'Miwani Sugar Area', 'Kobura Centre', 'Ratta Market', 'Kombewa', 'Othany', 'Sondu', 'Pap Onditi', 'Nyabondo Plateau'],
        kwale: ['Gombato Bongwe', 'Ukunda', 'Kinondo', 'Ramisi', 'Pongwe/Kikoneni', 'Dzombo', 'Mwereni', 'Vanga', 'Tsimba Golini', 'Waa', 'Tiwi', 'Kubo South', 'Mkongani', 'Ndavaya', 'Puma', 'Kinango', 'Mackinnon Road', 'Chengoni/Samburu', 'Mwavumbo', 'Diani', 'Ukunda Town', 'Airstrip', 'Kinondo Village', 'Chale Area', 'Ramisi Sugar Area', 'Gombato', 'Bongwe', 'Tiwi Beach', 'Waa Beach', 'Kombani', 'Mkongani Centre', 'Kinango Town', 'Mackinnon', 'SGR Area', 'Dzombo Centre', 'Vanga Border Town', 'Shimoni Channel', 'Kikoneni Town', 'Mwereni Centre', 'Mwavumbo Village', 'Samburu Trading Centre', 'Ndavaya Centre', 'Puma Centre', 'Kubo Area', 'Golini', 'Tsimba', 'Diani Beach', 'Leisure Lodge', 'Nomad Beach'],
        tanaRiver: ['Kipini East', 'Garsen South', 'Kipini West', 'Garsen Central', 'Garsen West', 'Garsen North', 'Kinakomba', 'Mikinduni', 'Chewani', 'Wayu', 'Chewele', 'Hirimani', 'Bangale', 'Sala', 'Madogo', 'Garsen Town', 'Tarasaa', 'Oda', 'Ngao', 'Hewani', 'Assa Area', 'Kipini Town', 'Tana Delta', 'Kipini Beach Area', 'Minjila', 'Kinakomba Centre', 'Mikinduni Centre', 'Chewani Trading Centre', 'Wayu Centre', 'Bangale Trading Centre', 'Hirimani Settlement', 'Chewele Centre', 'Sala Gate Area', 'Madogo Town', 'Highway Stopover'],
        lamu: ['Faza', 'Kiunga', 'Basuba', 'Shella', 'Mkomani', 'Hindi', 'Mkunumbi', 'Hongwe', 'Witu', 'Bahari', 'Shela Beach', 'Peponi Area', 'Lamu Old Town', 'Seafront', 'Lamu Waterfront', 'Hindi Town', 'Mkunumbi Centre', 'Hongwe Village', 'Witu Town', 'Faza Island', 'Kiunga Marine Reserve', 'Kiwayuu', 'Basuba Coast'],
        taitaTaveta: ['Chala', 'Mahoo', 'Bomani', 'Mboghoni', 'Mata', 'Wundanyi/Mbale', 'Werugha', 'Wumingu/Kishushe', 'Mwanda/Mgange', "Rong'e", 'Mwatate', 'Bura', 'Chawia', 'Wusi/Kishamba', 'Mbololo', 'Sagalla', 'Kaloleni', 'Marungu', 'Kasigau', 'Ngolia', 'Lake Chala', 'Chala Town', 'Mahoo Centre', 'Taveta Town Area', 'Mboghoni Market', 'Mata Settlement', 'Wundanyi Town', 'Taita Hills', 'Werugha Centre', 'Kishushe', 'Mining Area', 'Mgange Hills', 'Mwatate Town', "Rong'e Village", 'Bura Mission Area', 'Chawia Forest', 'Wusi', 'Kishamba', 'Mbololo Hills', 'Sagalla Hills', 'Voi Town Area', 'Marungu Settlement', 'Kasigau Wildlife Corridor', 'Ngolia Village'],
        kiambu: ['Kiamwangi', 'Kiganjo', 'Ndarugu', 'Ngenda', 'Gituamba', 'Githobokoni', 'Chania', "Mang'u", 'Murera', 'Theta', 'Juja', 'Witeithie', 'Kalimoni', 'Township', 'Kamenu', 'Hospital', 'Gatuanyaga', 'Ngoliba', 'Gitothua', 'Biashara', 'Gatongora', 'Kahawa Sukari', 'Kahawa Wendani', 'Kiuu', 'Mwiki', 'Mwihoko', 'Githunguri', 'Githiga', 'Ikinu', 'Ngewa', 'Komothai', "Ting'ang'a", 'Ndumberi', 'Riabai', 'Cianda', 'Karuri', 'Ndenderu', 'Muchatha', 'Kihara', 'Gitaru', 'Muguga', 'Nyadhuna', 'Kabete', 'Uthiru', 'Karai', 'Nachu', 'Sigona', 'Kikuyu', 'Kinoo', 'Bibirioni', 'Limuru Central', 'Ndeiya', 'Limuru East', 'Ngecha Tigoni', 'Kinale', 'Kijabe', 'Nyanduma', 'Kamburu', 'Lari/Kirenga', 'JKUAT', 'Juja Town', 'Witeithie Estate', 'Corner Brook', 'Kahawa Sukari Estate', 'Kahawa Wendani Estate', 'Membley', 'Mwihoko Estate', 'Kinoo Town', 'Kikuyu Town', 'Uthiru Shopping Centre', 'Kabete Veterinary Area', 'Ruaka Area', 'Two Rivers', 'Ruaka', 'Banana', 'Kihara Village', 'Kiambu Town', 'Limuru Town', 'Tigoni Tea Farms', 'AIC Kijabe Hospital', 'Kinale Forest Area', 'Thika-Garissa Highway', 'Blue Post Area', 'Thika CBD', 'Ruiru CBD', 'Eastern Bypass Area'],
        nakuru: ['Mariashoni', 'Elburgon', 'Turi', 'Molo', 'Mau Narok', 'Mauche', 'Kihingo', 'Nessuit', 'Lare', 'Njoro', 'Biashara', 'Hells Gate', 'Lake View', 'Mai Mahiu', 'Maiella', 'Olkaria', 'Naivasha East', 'Viwandani', 'Gilgil', 'Elementaita', 'Mbaruk/Eburu', 'Malewa West', 'Murindati', 'Amalo', 'Keringet', 'Kiptagich', 'Tinet', 'Kiptororo', 'Nyota', 'Sirikwa', 'Kamara', 'Subukia', 'Waseges', 'Kabazi', 'Menengai West', 'Soin', 'Visoi', 'Mosop', 'Solai', 'Dundori', 'Kabatini', 'Kiamaina', 'Lanet/Umoja', 'Bahati', 'Barut', 'London', 'Kaptembwo', 'Kapkures', 'Rhoda', 'Shaabab', 'Kivumbini', 'Flamingo', 'Menengai', 'Nakuru East', 'Naivasha Town', 'Karagita', "Hell's Gate National Park", 'Mai Mahiu Town', 'Geothermal Area', 'Moi South Lake Road', 'Gilgil Town', 'Lake Elementaita', 'Molo Town', 'Elburgon Town', 'Egerton University', 'Njoro Town', 'Kiamunyi', 'Lanet', 'Kenya Army Barracks', 'Bahati Centre', 'Kaptembwo Estate', 'Rhoda Estate', 'Kivumbini Estate', 'Flamingo Estate', 'Menengai Crater', 'Nakuru CBD East'],
        nyeri: ['Dedan Kimanthi', 'Wamagana', 'Aguthi/Gaaki', 'Mweiga', 'Naromoru Kiamathaga', 'Mwiyogo/Endarasha', 'Mugunda', 'Gatarakwa', 'Thegu River', 'Kabaru', 'Gakawa', 'Ruguru', 'Magutu', 'Iriaini', 'Konyu', 'Kirimukuyu', 'Karatina Town', 'Mahiga', 'Iria-Ini', 'Chinga', 'Karima', 'Gikondi', 'Rugi', 'Mukurwe-ini West', 'Mukurweini Central', 'Kiganjo/Mathari', 'Rware', 'Gatitu/Muruguru', "Ruring'u", 'Kamakwa/Mukaro', 'Karatina CBD', 'Solio Ranch', 'Mweiga Town', 'Naro Moru Town', 'Kiganjo', 'Nyeri-Nairobi Highway', 'Kamakwa Shopping Centre', "Ruring'u Estate", 'Nyeri CBD', 'Muruguru', 'Chinga Town', 'Othaya Town', 'Mukurweini Town', 'Endarasha Area', 'Gakawa Trading Centre', 'Kabaru Centre', 'Ruguru Area'],
        nyandarua: ['Engineer', 'Gathara', 'North Kinangop', 'Murungaru', 'Njabini/Kiburu', 'Wanjohi', 'Kipipiri', 'Geta', 'Githioro', 'Karau', 'Kanjuiri Ridge', 'Mirangine', 'Kaimbaga', 'Rurii', 'Gathanji', 'Gatimu', 'Weru', 'Charagita', 'Leshau/Pondo', 'Kiriita', 'Central', 'Shamata', 'Leshau', 'Ukueni', 'Engineer Town', 'Njabini Town', 'North Kinangop Centre', 'Murungaru Trading Centre', 'Kipipiri Town', 'Wanjohi Valley', 'Geta Forest Area', 'Githioro Centre', 'Karau Trading Centre', 'Mirangine Town', 'Kaimbaga Area', 'Rurii Market', 'Gathanji Centre', 'Charagita Settlement', 'Shamata Town', 'Ndaragwa Town', 'Leshau Centre', 'Kiriita Market'],
        kirinyaga: ['Mutithi', 'Kangai', 'Thiba', 'Wamumu', 'Nyangati', 'Murinduko', 'Kabare', 'Baragwi', 'Njukiini', 'Ngariama', 'Karumandi', 'Mukure', 'Kiine', 'Kariti', 'Mutira', 'Kanyekini', 'Kerugoya', 'Inoi', 'Mugumo-Ini', 'Tebere', 'Kerugoya Town', "Wang'uru Town", 'Kagio', 'Kianyaga Area', 'Kutus Town', 'Kabare Centre', 'Baragwi Market', 'Karumandi Town', 'Ngariama Centre', 'Njukiini Centre', 'Mutithi Market', 'Kangai Village', 'Thiba Shopping Centre', 'Wamumu Centre', 'Nyangati Trading Centre', 'Murinduko Area', 'Kiine Area', 'Mukure Market', 'Kariti Centre', 'Mugumo-Ini Market'],
        muranga: ['Kangema', 'Kanyenyaini', 'Muguru', 'Rwathia', 'Gitugi', 'Kamacharia', 'Kihumbu-ini', 'Wangu', 'Mugoiri', 'Mbiri', 'Townships', 'Mugumo-Ini', 'Kimathi', 'Kangari', 'Kinyona', 'Kigumo', 'Muthithi', 'Kahumbu', 'Kimorori/Wempa', 'Makuyu', 'Kambiti', 'Kamahuha', 'Ichagaki', 'Nginda', "Ng'araria", 'Muruka', 'Kagundu-Ini', 'Gaichanjiru', 'Ithiru', 'Ruchu', 'Ithanga', 'Kakuzi/Mitubiri', 'Gatura', 'Kariara', "Murang'a Town", 'Kangari Town', 'Makuyu Town', 'Kakuzi Estate', 'Del Monte Area', 'Kenol Town', 'Kandara Town', 'Ithanga Centre', 'Kariara Market', 'Gatura Centre', 'Kigumo Town', 'Aberdare Area', 'Gitugi Centre', 'Kamacharia Town', 'Kangema Town', 'Kanyenyaini Market', 'Rwathia Village', 'Mugoiri Centre', 'Mbiri Market'],
        marsabit: ['Butiye', 'Sololo', 'Heillu/Manyatta', 'Golbo', 'Moyale Township', 'Dukana', 'Maikona', 'Turbi', 'North Horr', 'Illeret', 'Sagante/Jaldesa', 'Karare', 'Marsabit Central', 'Loiyangalani', 'Kargi/South Horr', 'Korr/Ngurunit', 'Logologo', 'Laisamis', 'Ngurunit', 'Moyale Town', 'Sololo Town', 'Butiye Centre', 'Golbo Trading Centre', 'North Horr Town', 'Dukana Border Area', 'Lake Turkana Eastern Shore', 'Maikona Town', 'Turbi Centre', 'Marsabit Town', 'Karare Settlement', 'Loiyangalani Town', 'Lake Turkana', 'Logologo Centre', 'Laisamis Town', 'Ngurunit Oasis', 'Korr Town', 'Kargi', 'South Horr'],
        isiolo: ['Wabera', 'Bulla Pesa', 'Chari', 'Cherab', 'Ngare Mara', 'Burat', 'Oldo/Nyiro (Oldonyiro)', 'Garbatulla', 'Kinna', 'Sericho', 'Isiolo Town CBD', 'Bula Pesa Estate', 'Burat Estate', 'Oldonyiro Town', 'Ngaremara Centre', 'Chari Settlement', 'Cherab Area', 'Garbatulla Town', 'Kinna Conservancy Area', 'Sericho Town'],
        meru: ['Maua', 'Kangeta', 'Igembe East', 'Akachiu', 'Kanuni', "Akirang'ondu", 'Athiru Ruujine', 'Igembe Central', 'Njia', 'Antuambui', 'Ntunene', 'Antubetwe Kiongo', 'Naathu', 'Amwathi', 'Athwana', 'Akithii', 'Kianjai', 'Nkomo', 'Mbeu', 'Thangatha', 'Mikinduri', 'Kiguchwa', 'Muthara', 'Karama', 'Municipality', 'Ntima East', 'Ntima West', 'Nyaki West', 'Nyaki East', 'Mwanganthia', 'Abothuguchi Central', 'Abothuguchi West', 'Kiagu', 'Kibirichia', 'Mitunguu', 'Igoji East', 'Igoji West', 'Abogeta East', 'Abogeta West', 'Timau', 'Kisima', 'Kiirua/Naari', 'Ruiri/Rwarera', 'Meru Town CBD', 'Makutano', 'Meru Town', 'Meru Central', 'Meru University Area', 'Nkubu Road Area', 'Timau Town', 'Kisima Trading Centre', 'Naari', 'Kiirua Hospital Area', 'Meru National Polytechnic Area', 'Kibirichia Town', 'Maua Town', 'Kangeta Market', 'Mikinduri Town', 'Kianjai Market', 'Muthara Centre', 'Mitunguu Town', 'Igoji Market', 'Igoji Centre', 'Nkubu Area', 'Nkubu Town', 'Kiagu Market', 'Nkabune Area', 'Kithoka Area'],
        tharakaNithi: ['Mugwe', 'Igambang\'ombe', 'Magumoni', 'Mitheru', 'Mwimbi', 'Muthambi', 'Ganga', 'Chogoria', 'Marimanti', 'Nkondi', 'Chiakariga', 'Tharaka', 'Mukothima', 'Chuka Town', 'Chuka University', 'Magumoni Centre', 'Kathwana', 'Mitheru Market', 'Chogoria Town', 'Chogoria Hospital', 'Muthambi Centre', 'Mwimbi Town', 'Ganga Market', 'Mitheru Trading Centre', 'Marimanti Town', 'Chiakariga Market', 'Mukothima Centre', 'Nkondi Area', 'Gatunga', 'Tunyai'],
        embu: ['Ruguru/Ngandori', 'Kithimu', 'Nginda', 'Mbeti North', 'Kirimari', 'Gaturi South', 'Gaturi North', 'Kaagari South', 'Kaagari North', 'Central Ward', 'Kyeni North', 'Kyeni South', 'Mwea', 'Makima', 'Mbeti South', 'Mavuria', 'Kiambere', 'Nthawa', 'Muminji', 'Evurore', 'Ngandori Market', 'Kithimu Centre', 'Nginda Village', 'Embu Town Outskirts', 'Gaturi Area', 'Runyenjes Town', 'Kianjokoma', 'Kibugu', 'Kaaga Area', 'Kaaga Market', 'Kiritiri', 'Makima Mission', 'Kiambere Dam', 'Mavuria Centre', 'Siakago Area', 'Nthawa Market', 'Muminji Centre', 'Evurore Trading Centre'],
        kitui: ['Kisasi', 'Mbitini', 'Kwavonza/Yatta', 'Kanyangi', 'Miambani', 'Township', 'Kyangwithya West', 'Mulango', 'Kyangwithya East', 'Town Ward', 'Ikanga/Kyatune', 'Mutomo', 'Mutha', 'Ikutha', 'Kanziko', 'Zombe/Mwitika', 'Chuluni', 'Nzambani', 'Voo/Kyamatu', 'Endau/Malalani', 'Ngomeni', 'Kyuso', 'Mumoni', 'Tseikuru', 'Tharaka', 'Migwani', 'Kyome/Thaana', 'Central', 'Kanyekiini', 'Nguutani', 'Kivou', 'Nguni', 'Nuu', 'Mui', 'Waita', 'Kwa Vonza', 'Kisasi Centre', 'Mbitini Market', 'Kanyangi Town', 'Kitui Town CBD', 'Kitui Central Business District', 'Mulango Market', 'Kyangwithya', 'Ithookwe Area', 'Mutomo Town', 'Tsavo East Border Area', 'Zombe', 'Nzambani Rock', 'Endau Town', 'Mutitu', 'Tseikuru Town', 'Kyuso Town', 'Ngomeni Centre', 'Mumoni Hills', 'Migwani Town', 'Kyome', 'Nguutani', 'Waita', 'Nguni Market', 'Nuu Centre', 'Mui Basin', 'Waita Centre', 'Kitui Town', 'Matinyani'],
        machakos: ['Kivaa', 'Masinga Central', 'Ekalakala', 'Muthesya', 'Ndithini', 'Ndalani', 'Matuu', 'Kithimani', 'Ikombe', 'Katangi', 'Kangundo North', 'Kangundo Central', 'Kangundo East', 'Kangundo West', 'Tala', 'Matungulu North', 'Matungulu East', 'Matungulu West', 'Kyeleni', 'Mitaboni', 'Kathiani Central', 'Upper Kaewa/Iveti', 'Lower Kaewa/Kaani', 'Akala', 'Athi River', 'Kinanie', 'Muthwani', 'Syokimau/Mulolongo', 'Katani', 'Kalama', 'Mua', 'Mutituni', 'Machakos Central', 'Mumbuni North', 'Muvuti/Kiima Kimwe', 'Kola', 'Mbiuni', 'Makutano/Mwala', 'Masii', 'Muthetheni', 'Wamunyu', 'Masinga Town', 'Masinga Dam', 'Kivaa Market', 'Ndithini Centre', 'Matuu Town', 'Kithimani Centre', 'Katangi Town', 'Ikombe Market', 'Kangundo Town', 'Kangundo Road', 'Tala Town', 'Kyeleni Market', 'Matungulu Centre', 'Kathiani Town', 'Iveti Hills', 'Kaani', 'Athi River Town', 'EPZ', 'Syokimau', 'Mulolongo', 'Katani Estate', 'Kinanie Area', 'Muthwani Centre', 'Machakos Town', "People's Park", 'Mua Hills', 'Mumbuni', 'Mwala Town', 'Masii Town', 'Makutano', 'Mbiuni'],
        makueni: ['Tulimani', 'Mbooni', 'Kithungo/Kitundu', 'Kiteta/Kisau', 'Waia/Kako', 'Kalawa', 'Kasikeu', 'Mukaa', 'Kiima Kiu/Kalanzoni', 'Ukia', 'Dwa/Kisasi', 'Kee', 'Kilungu', 'Ilima', 'Wote', 'Muvau/Kikumini', 'Mavindini', 'Kitise/Kithuki', 'Ngaa', 'Makindu', 'Nguumo', 'Kikumbulyu North', 'Kikumbulyu South', 'Nzaui/Kilili/Kalamba', 'Masongaleni', 'Mtito Andei', 'Thange', 'Ivingoni/Nzambani', 'Mbooni Town', 'Tawa', 'Kalawa Market', 'Kisau', 'Kiteta', 'Kasikeu Town', 'Mukaa Centre', 'Sultan Hamud Area', 'Ukia Centre', 'Kilungu Town', 'Kee Market', 'Kisasi Centre', 'Ilima Market', 'Wote Town', 'Kikumini Centre', 'Mavindini Market', 'Kitise Centre', 'Ngaa Market', 'Makindu Town', 'Makindu Sikh Temple', 'Kibwezi', 'Kalamba', 'Kikumbulyu', 'Mtito Andei', 'Tsavo Area', 'Masongaleni', 'Thange', 'Kibwezi Town', 'Sultan Hamud'],
        turkana: ['Kerio Delta', "Kang'atotha", 'Kalokol', 'Lodwar Township', 'Kanamkemer', 'Kaeris', 'Lake Zone', 'Lapur', 'Kaaleng/Kaikor', 'Kibish', 'Kakuma', 'Lopur', 'Letea', 'Songot', "Kaliyang'a/Namoruputh", 'Kaputir', 'Katilu', 'Lobokat', 'Kalapata', 'Lokichar', 'Lorengippi', 'Turkwel', 'Loima', 'Lokiriama/Lorengippi', 'Kapedo/Napeitom', 'Katilia', 'Lokori/Kochodin', 'Lokichaar', 'Lodwar Town', 'Kalokol Town', 'Lodwar CBD', 'Kanamkemer Estate', 'Kibish Border Area', 'Kaaleng', 'Kaikor', 'Lake Turkana Shore', 'Kakuma Refugee Camp', 'Lopur Centre', 'Kakuma Town Area', 'Songot Centre', 'Lokichoggio Region', 'Lokichar Town', 'Katilu Centre', 'Oil Exploration Area', 'Lokiriama', 'Kapedo', 'Lokori', 'Kochodin', 'Lodwar', 'Lokichoggio', 'Lake Turkana'],
        westPokot: ['Riwo', 'Kapenguria', 'Mnagei', 'Siyoi', 'Endugh', 'Lomut', 'Weiwei', 'Sekerr', 'Masool', 'Chesegon', 'Suam', 'Kodich', 'Kapchok', 'Kasei', 'Kiwawa', 'Chepareria', 'Batei', 'Lelan', 'Tapach', 'Sook', 'Kapenguria Town', 'Mnagei Centre', 'Siyoi Market', 'Chelangat Area', 'Lomut Centre', 'Weiwei Valley', 'Sekerr Hills', 'Masool Centre', 'Chesegon Trading Centre', 'Suam Border Post', 'Kodich Centre', 'Kasei Market', 'Kacheliba Town', 'Chepareria Town', 'Lelan Centre', 'Tapach Forest Area', 'Ortum Area', 'Batei Market', 'Ortum', 'Suam', 'Kacheliba', 'Sekerr', 'Kodich'],
        samburu: ['Lodokejek', 'Suguta Marmar', 'Maralal', 'Loosuk', 'Poro', 'El Barta', 'Nachola', 'Ndoto', 'Nyiro', 'Angata Nanyokie', 'Waso', 'Wamba West', 'Wamba East', 'Wamba North', 'Maralal Town', 'Loosuk Centre', 'Poro Trading Centre', 'Baragoi Town', 'Nachola Centre', 'Ndoto Mountains', 'Mt. Nyiro', 'Angata Area', 'Archers Post', 'Wamba Town', 'Buffalo Springs Area', 'Isiolo-Samburu Border', 'Baragoi', 'Wamba', 'Buffalo Springs'],
        transNzoia: ['Kwanza', 'Keiyo', 'Bidii', 'Kapomboi', 'Endebess', 'Matumbei', 'Chepchoina', 'Kinyoro', 'Matisi', 'Tuwani', 'Saboti', 'Machewa', 'Kiminini', 'Waitaluk', 'Sirende', 'Hospital', 'Sikhendu', 'Nabiswa', 'Motosiet', 'Sitatunga', 'Kaplamai', 'Makutano', 'Sinyereri', 'Cherang’any/Suwerwa', 'Chepsiro/Kiptoror', 'Kwanza Town', 'Kapomboi Centre', 'Keiyo Market', 'Bidii Area', 'Endebess Town', 'Chepchoina Settlement Scheme', 'Mount Elgon Area', 'Matisi Estate', 'Saboti Centre', 'Kinyoro Market', 'Tuwani Area', 'Machewa Centre', 'Kiminini Town', 'Sikhendu Market', 'Waitaluk Centre', 'Kitale Hospital Area', 'Nabiswa', 'Makutano Centre', 'Kaplamai Trading Centre', 'Saiwa Swamp Area', 'Cherangany Hills', 'Suwerwa Centre', 'Kitale'],
        uasinGishu: ['Kapsomba', 'Kuinet/Kapsuswa', 'Soy', 'Ziwa', "Moi's Bridge", 'Segero/Barsombe', 'Huruma', 'Kapsaos', 'Kamagut', 'Kiplombe', 'Ngenyilel', 'Tapsagoi', 'Tembelio', 'Sergoit', 'Karuna/Meibeki', 'Moiben', 'Kimumu', 'Kapsoya', 'Kaptagat', 'Ainabkoi/Olare', 'Simat/Kapseret', 'Langas', 'Racecourse', 'Cheptiret/Kipchamo', 'Ngeria', 'Megun', 'Kipkenyo', 'Tulwet/Chuiyat', 'Tarakwa', 'Tulwet', 'Cheplaskei', "Moi's Bridge Centre", 'Soy Centre', 'Kuinet', 'Kapsomba', 'Turbo Town', 'Huruma Estate', 'Kamagut', 'Eldoret Airport Road', 'Moiben Town', 'Kimumu Estate', 'Sergoit', 'Kapsoya Estate', 'Kaptagat Forest', 'Ainabkoi Centre', 'Simat', 'Langas Estate', 'Racecourse Estate', 'Kipkenyo Area', 'Ngeria Centre', 'University of Eldoret Area', 'Kesses Town', 'Moi University Area', 'Burnt Forest', 'Eldoret', 'Kapsoya', 'Kimumu', 'Turbo', 'Kaptagat', 'Kesses', 'University of Eldoret', 'Moi University'],
        elgeyoMarakwet: ['Kapyego', 'Sambirir', 'Endo', 'Embobut / Embulot', 'Lelan', 'Sengwer', "Cherang'any/Chebororwa", 'Moiben/Kuserwo', 'Kapsowar', 'Tambach', 'Kamariny', 'Kapchemutwa', 'Kipkenyo', 'Metkei', 'Kabiemit', 'Chepkorio', 'Soy North', 'Soy South', 'Kapyego Town', 'Tot Centre', 'Chesoi', 'Embobut Forest', 'Endo Valley', 'Kapsowar Town', 'AIC Hospital', 'Lelan Centre', 'Sengwer Area', 'Chebororwa Market', 'Kuserwo Centre', 'Tambach Town', 'Kamariny Stadium', 'Iten Viewpoint Area', 'Kapchemutwa Centre', 'Kabiemit', 'Metkei', 'Soy Centre', 'Kerio Valley', 'Iten', 'Tambach', 'Chepkorio', 'Tot', 'Lelan'],
        nandi: ['Songhor/Soba', 'Tindiret', 'Chemelil/Chemase', 'Kapsimotwo', 'Kapkangani', 'Kabwareng', 'Terik', 'Kemeloi-Maraba', 'Kobujoi', 'Kaptumo/Kaboi', 'Nandi Hills', 'Chepkunyuk', "Ol'lessos", 'Kapchorua', "Chemundu/Kapng'etuny", 'Chepkumia', 'Kapsabet', 'Kilibwoni', 'Kosirai', 'Kapsaos', 'Taito', 'Koyo/Ndurio', 'Chemelil/Muhoroni Border', 'Chepterwai', 'Kipkaren', 'Kurgung/Surungai', 'Kabiyet', 'Ndalat', 'Chemelil', 'Songhor', 'Nandi Hills Border Area', 'Tinderet Town', 'Kobujoi', 'Kaptumo', 'Kabwareng', 'Kemeloi', 'Nandi Hills Town', "Ol'lessos Town", 'Kapchorua Centre', 'Chemundu Area', 'Kapsabet Town', 'Kilibwoni', 'Kosirai', 'Chepkumia', 'Emgwen Area', 'Kapsaos', 'Koyo', 'Ndurio', 'Kabiyet', 'Ndalat', 'Kipkaren', 'Chepterwai', 'Mosoriot', 'Kapsabet', 'Nandi Hills', 'Tinderet'],
        baringo: ['Tirioko', 'Kolowa', 'Ribkwo', 'Silale', 'Loiyamorock', 'Tangulbei/Korossi', 'Churo/Amaya', 'Barwessa', 'Kabartonjo', 'Saimo/Kipsaraman', 'Saimo/Soi', 'Bartabwa', 'Kabarnet', 'Sacho', 'Tenges', 'Ewalel/Chapchap', 'Kapropita', 'Marigat', 'Ilchamus', 'Mochongoi', 'Mukutani', 'Mogotio', 'Emining', 'Kisanana', 'Lembus', 'Lembus Kwen', 'Ravine', 'Mumberes/Maji Mazuri', 'Lembus/Perkerra', 'Koibatek', 'Kabarnet Town', 'Marigat Town', 'Mogotio Town', 'Eldama Ravine Town', 'Eldama Ravine Area', 'Lake Baringo Area', 'Mukutani Centre', 'Tangulbei', 'Churo Trading Centre', 'Tiaty Region', 'Kabarnet', 'Marigat', 'Mogotio', 'Eldama Ravine', 'Lake Baringo', 'Bartabwa', 'Tiaty'],
        laikipia: ['Ol-Moran', 'Rumuruti Township', 'Githiga', 'Marmanet', 'Igwamiti', 'Salama', 'Ngobit', 'Tigithi', 'Thingithu', 'Nanyuki', 'Umande', 'Sosian', 'Segera', 'Mugogodo West', 'Mugogodo East', 'Nanyuki Town', 'Nanyuki Airstrip Area', 'Nanyuki Outskirts', 'Tigithi Centre', 'Ngobit Trading Centre', 'Rumuruti Town', 'Ol Moran Town', 'Marmanet Town', 'Igwamiti Centre', 'Salama Trading Centre', 'Segera Conservancy', 'Sosian Ranch', 'Il Ngwesi Area', 'Mukogodo Forest Area', 'Rumuruti', 'Ol Moran', 'Mukogodo', 'Laikipia Nature Conservancies'],
        narok: ['Olokurto', 'Narok Town', 'Nkareta', 'Olorropil', 'Melili', 'Mosiro', 'Ildamat', 'Keekonyokie', 'Suswa', 'Majimoto', "Ololulung'a", 'Melelo', 'Loita', 'Sogoo', 'Ilmotiok', 'Mara', 'Siana', 'Naikarra', 'Kilgoris Central', 'Keyian', 'Angata Barikoi', 'Shankoe', 'Kimintet', 'Lolgorian', 'Ilkerin', 'Ololmasani', 'Bomet-Narok Road Area', 'Melili Town', 'Nkareta Centre', 'Suswa Town', 'Suswa Conservancy', 'Mosiro Centre', 'Keekonyokie Area', 'Narok South HQ', 'Loita Hills', 'Loita Forest', 'Sekenani Gate Area', 'Hot Springs Area', 'Sogoo Centre', 'Maasai Mara', 'Siana Conservancy', 'Talek', 'Kilgoris Town', 'Keyian Centre', 'Lolgorian Town', 'Trans Mara Area', 'Sekenani', 'Kilgoris'],
        kajiado: ['Purko', 'Ildamat', 'Dalalekutuk', 'Matapato North', 'Matapato South', 'Kaputiei North', 'Kitengela', 'Oloosirkon/Sholinke', 'Kenyawa-Poka', 'Imaroro', 'Keekonyokie', 'Iloodokilani', 'Magadi', "Ewuaso Oonkidong'i", 'Entonet/Lenkisim', 'Mbirikani/Eselenkei', 'Kuku', 'Rombo', 'Kimana', 'Kajiado Town', 'Purko Centre', 'Isinya Road Area', 'Kitengela Town', 'Kitengela North', 'Sholinke Area', 'Poka Centre', 'Imaroro Area', 'Kiserian', 'Magadi Town', 'Lake Magadi', 'Kona Baridi', 'Kimana Town', 'Rombo Area', 'Amboseli Region', 'Eselenkei Conservancy', 'Entonet Centre', 'Ongata Rongai', 'Ngong', 'Amboseli', 'Sholinke', 'Isinya'],
        kericho: ['Kapsoit', 'Ainamoi', 'Kipchebor', 'Kapkugerwet', 'Kipchimchim', 'Waldai', 'Kabianga', 'Cheptororiet/Seretut', 'Chaik', 'Kipkelion', 'Litein', 'Cheboin', 'Chemosot', 'Kapkatet', 'Londiani', 'Kedowa/Kimugul', 'Chepseon', 'Tendeno/Sorget', 'Kunyak', 'Kamasian', 'Chilchila', 'Sigowet', 'Kapleleartet', 'Soliat', 'Soin', 'Simotwet', 'Kericho Town', 'Kipchimchim Estate', 'Green Stadium Area', 'Kapsoit Centre', 'Kabianga University Area', 'Sosiot', 'Belgut Centre', 'Litein Town', 'Kapkatet Hospital', 'Cheboin Centre', 'Chemosot Market', 'Londiani Town', 'Kedowa Centre', 'Sorget', 'Chepseon Market', 'Kipkelion Town', 'Kamasian Centre', 'Chilchila Market', 'Sigowet Centre', 'Soin Market', 'Simotwet Area', 'Kapleleartet', 'Kedowa', 'Chepseon'],
        bomet: ['Silibwet Township', 'Singorwet', 'Chesoen', 'Mutarakwa', 'Merigi', 'Longisa', 'Kembu', 'Chemaner', "Kong'asis", 'Nyangores', 'Sigor', 'Chebunyo', 'Siongiroi', 'Ndanai/Abosi', 'Chemagel', 'Kipsonoi', 'Kapletundo', 'Rongena/Manaret', 'Kimulot', 'Mogogosiek', 'Boito', 'Embomos', 'Chepchabas', 'Bomet Town', 'Silibwet', 'Merigi Centre', 'Singorwet Market', 'Longisa Hospital', 'Kembu Centre', 'Chemaner Market', 'Siongiroi Town', 'Sigor Centre', 'Nyangores Market', "Kong'asis Area", 'Sotik Town', 'Ndanai', 'Kapletundo', 'Chemagel', 'Chepngaina', 'Mogogosiek Centre', 'Kimulot', 'Boito', 'Chepchabas Market', 'Sotik'],
        kakamega: ['Mautuma', 'Lugari', 'Lumakanda', 'Chekalini', 'Chevaywa', 'Lwandeti', 'Likuyani', 'Sango', 'Kongoni', 'Nzoia', 'Sinoko', 'West Kabras', 'Chemuche', 'East Kabras', 'Butali/Chegulo', 'Manda-Shivanga', 'Shirugu-Mugai', 'South Kabras', 'Butsotso East', 'Butsotso South', 'Butsotso Central', 'Sheywe', 'Mahiakalo', 'Shirere', 'Ingotse-Matiha', 'Shinoyi-Shikomari-Esumeyia', 'Bunyala West', 'Bunyala East', 'Bunyala Central', 'Mumias Central', 'Mumias North', 'Etenje', 'Musanda', 'Lusheya/Lubinu', 'Malaha/Isongo/Makunga', 'East Wanga', 'Koyonzo', 'Kholera', 'Khalaba', 'Mayoni', 'Namamali', 'Marama West', 'Marama Central', 'Marema North', 'Marama South', 'Marama East', 'Kisa North', 'Kisa East', 'Kisa West', 'Kisa Central', 'Isukha North', 'Murhanda', 'Isukha Central', 'Isukha South', 'Isukha East', 'Isukha West', 'Idakho South', 'Idakho East', 'Idakho North', 'Idakho Central', 'Idakho West', 'Lumakanda Town', 'Mautuma Centre', 'Chekalini Market', 'Turbo-Lugari Road', 'Matunda', 'Kongoni Centre', 'Likuyani Town', 'Nzoia Settlement', 'Malava Town', 'Butali', 'Shivanga', 'Kabras Area', 'Kakamega CBD', 'Amalemba', 'Navakholo Town', 'Chavakali Road Area', 'Ingotse', 'Mumias Town', 'Mumias Sugar Area', 'Shianda', 'Makunga', 'Matungu Town', 'Koyonzo Market', 'Namamali Centre', 'Butere Town', 'Marama Area', 'Khwisero', 'Ebuyangu', 'Kisa Area', 'Kakamega Forest', 'Shinyalu', 'Lirhanda', 'Isecheno', 'Ikolomani', 'Gold Mines Area', 'Rosterman', 'Kakamega Town', 'Mumias'],
        vihiga: ['Lugaga-Wamuluma', 'South Maragoli', 'Central Maragoli', 'Mungoma', 'Lyaduywa/Izava', 'West Sabatia', 'Chavakali', 'North Maragoli', 'Wodanga', 'Busali', 'Shiru', 'Gisambai', 'Shamakhokho', 'Banja', 'Muhudu', 'Tambua', 'Jepkoyai', 'Luanda Township', 'Wemilabi', 'Mwibona', 'Luanda South', 'Emabungo', 'North East Bunyore', 'Central Bunyore', 'West Bunyore', 'Mbale Town', 'Majengo', 'Chavakali Road', 'Maragoli Hills', 'Chavakali Town', 'Sabatia', 'Busali Market', 'Hamisi Town', 'Gisambai Market', 'Luanda Town', 'Emuhaya Road', 'Mwibona Centre', 'Esibuye', 'Ekwanda', 'Luanda-Emuhaya Area', 'Bunyore', 'Mbale', 'Luanda', 'Hamisi', 'Maragoli', 'Emuhaya'],
        bungoma: ['Cheptais', 'Chesikaki', 'Chepyuk', 'Kaptama', 'Elgon', 'Namwela', 'Malakisi/South Kulisiru', 'Lwandanyi', 'Kabuchai/Chwele', 'West Nalondo', 'Bwake/Luuya', 'Mukuyuni', 'South Bukusu', 'Bumula', 'Khasoko', 'Kabula', 'Kimaeti', 'West Bukusu', 'Bukembe West', 'Bukembe East', 'Township', 'Khalaba', 'Musikoma', "East Sang'alo", 'Mihuu', 'Ndivisi', 'Maraka', 'Misikhu', 'Sitikho', 'Matulo', 'Bokoli', 'Kimilili', 'Kibingei', 'Maeni', 'Kamukuywa', 'Mbakalo', 'Naitiri/Kabuyefwe', 'Milima', 'Ndalu/Tabani', 'Tongaren', 'Soysambu/Mitua', 'Cheptais Town', 'Kaptama Centre', 'Chepyuk Settlement Scheme', 'Mt. Elgon National Park Area', 'Malakisi Town', 'Lwandanyi Centre', 'Namwela Market', 'Chwele Town', 'Kabuchai Market', 'Mukuyuni Centre', 'Bumula Town', 'Kimaeti Market', 'Nabuyole', 'Kabula Centre', 'Bungoma Town CBD', 'Khalaba Estate', 'Musikoma Market', 'Bukembe Centre', 'Bukembe Township', 'Webuye Town', 'Pan Paper Area', 'Ndivisi Market', 'Misikhu Town', 'Bokoli Centre', 'Matulo Market', 'Kimilili Town', 'Kamukuywa Market', 'Maeni Centre', 'Naitiri Town', 'Tongaren Centre', 'Ndalu Market', 'Milima Area', 'Bungoma Town', 'Webuye', 'Chwele', 'Malakisi', 'Kaptama', 'Naitiri', 'Kimaeti'],
        busia: ['Malaba Central', 'Malaba North', 'Angurai South', 'Angurai North', 'Angurai East', 'Angorom', 'Chakol South', 'Chakol North', 'Amukura West', 'Amukura East', 'Amukura Central', 'Nambale Township', 'Bukhayo North/Waltsi', 'Bukhayo East', 'Bukhayo Central', 'Bukhayo West', 'Mayenje', 'Matayos South', 'Busibwabo', 'Burumba', 'Marachi West', 'Kingandole', 'Marachi Central', 'Marachi East', 'Elugulu', 'Nangina', "Ageng'a Nanguba", 'Bwiri', 'Namboboto/Nambuku', 'Bunyala Central', 'Bunyala North', 'Bunyala West', 'Bunyala South', 'Bunyala East', 'Malaba Border Town', 'Angurai Centre', 'Malaba Customs Area', 'Amagoro', 'Chakol', 'Amukura', 'Angorom', 'Nambale Town', 'Walatsi', 'Bukhayo', 'Matayos Town', 'Mayenje Centre', 'Busibwabo Market', 'Butula Town', 'Elugulu Centre', 'Kingandole Market', 'Funyula Town', 'Nangina Centre', 'Port Victoria Road', 'Port Victoria', 'Budalangi', 'Sigulu Island Area', 'Lake Victoria Beaches', 'Busia Town', 'Malaba', 'Nambale', 'Matayos', 'Butula', 'Funyula', 'Angurai'],
        siaya: ['Siaya Township', 'North Alego', 'Central Alego', 'West Alego', 'South East Alego', 'Usonga', 'North Gem', 'West Gem', 'Central Gem', 'East Gem', 'South Gem', 'Yala Township', 'Ugunja', 'Sidindi', 'Sigomere', 'East Ugenya', 'West Ugenya', 'North Ugenya', 'Ukwala', 'Central Sakwa', 'North Sakwa', 'South Sakwa', 'West Sakwa', 'Yimbo East', 'West Yimbo', 'East Asembo', 'West Asembo', 'North Uyoma', 'South Uyoma', 'West Uyoma', 'Siaya Town', 'Sega', 'Ukwala Road Area', 'Siaya CBD', 'Yala Town', 'Ramula', 'Akala', 'Nyamninia', 'Ugunja Town', 'Sidindi Centre', 'Ukwala Town', 'Ugenya Centre', 'Bondo Town', 'Usenge', 'Ndori', 'Got Agulu', 'Aram', 'Asembo Bay', 'Uyoma', 'Luanda Kotieno', 'Yala', 'Ukwala', 'Bondo', 'Sigomere', 'Asembo'],
        homaBay: ['Homa Bay Central', 'Homa Bay Arujo', 'Homa Bay West', 'Homa Bay East', 'Kabondo East', 'Kabondo West', 'Kojwach', 'Kokwanyo/Kakelo', 'West Karachuonyo', 'North Karachuonyo', 'Central Karachuonyo', 'Kanyaluo', 'Kibiri', "Wang'chieng", 'Kendu Bay Town', 'West Kasipul', 'South Kasipul', 'Central Kasipul', 'East Kamagak', 'West Kamagak', 'Kwabwai', 'Kanyadoto', 'Kanyikela', 'North Kabuoch', 'Kabuoch South/Pala', 'Kanyamwa Kologi', 'Kanyamwa Kosewe', 'West Gem', 'East Gem', 'Kochia', 'Kagan', 'Mfangano Island', 'Rusinga Island', 'Kasgunga', 'Gembe', 'Lambwe', 'Gwassi South', 'Gwassi North', 'Kaksingri West', 'Ruma-Kaksingri East', 'Homa Bay Town', 'CBC Area', 'Market Area', 'County Headquarters', 'Oyugis', 'Kabondo', 'Kojwach Market', 'Kendu Bay', 'Kobala', 'Oyugis Town', 'Kasipul', 'Kamagak', 'Ndhiwa Town', 'Pala', 'Kabuoch', 'Kobama', 'Rangwe Town', 'Kagan Market', 'Mbita', 'Tom Mboya Mausoleum', 'Lambwe Valley', 'Ndhiwa Border Area', 'Kaksingri', 'Ruma National Park', 'Gwassi Hills', 'Rangwe', 'Ndhiwa', 'Luanda Kotieno'],
        migori: ['North Kamagambo', 'East Kamagambo', 'South Kamagambo', 'Central Kamagambo', 'North East Sakwa', 'South Sakwa', 'West Sakwa', 'Central Sakwa', 'God Jope', 'Suna Central', 'Kakrao', 'Kwa', 'Wiga', 'Wasweta II', 'Ragana-Oruba', 'Wasimbete', 'West Kanyamkago', 'North Kanyamkago', 'Central Kanyamkago', 'South Kanyamkago', 'East Kanyamkago', "Kachieng'", 'Kanyasa', 'North Kadem', 'Macalder/Kanyarwanda', 'Kaler', 'Got Kachola', 'Muhuru', 'Bukira East', 'Bukira Central/Ikerege', 'Isibania', 'Makerero', 'Masaba', 'Tagare', 'Nyamosense/Komosoko', 'Gokeharaka/Getambwega', 'Nyabasi West', 'Nyabasi East', 'Ntimaru West', 'Ntimaru East', 'Rongo Town', 'Rongo University', 'Kamagambo', 'Opapo', 'Awendo Town', 'South Nyanza Sugar', 'Sakwa', 'Migori Town', 'Nyabisawa', 'Migori CBD', 'Ragana', 'Oruba', 'Wasweta', 'Uriri Town', 'Rapogi', 'Kanyamkago', 'Muhuru Bay', 'Macalder Gold Mines', 'Sori', 'Kadem', 'Isebania Border', 'Kehancha', 'Ntimaru', 'Nyabasi', 'Rongo', 'Awendo', 'Macalder', 'Isebania'],
        kisii: ['Bomariba', 'Bogiakumu', 'Bokeira', 'Riana', 'Bogetenga', 'Borabu/Chitago', 'Moticho', 'Getenga', 'Tabaka', 'Boikanga', 'Borabu Masaba', 'Boochi Borabu', 'Bokimonge', 'Magenche', 'Masige West', 'Masige East', 'Bassi Central', 'Nyacheki', 'Bassi Bogetaorio', 'Bobasi Chache', 'Sameta/Mokwerero', 'Bobasi/Boitangare', 'Majoge Basi', 'Boochi/Tendere', 'Bosoti/Sengera', 'Ichuni', 'Nyamasibi', 'Masimba', 'Gesusu', 'Kiamokama', 'Bobaracho', 'Kisii Central', 'Keumbu', 'Kiogoro', 'Birongo', 'Ibeno', 'Monyerero', 'Sensi', 'Marani', 'Mwamonari', 'Bogusero', 'Bogeka', 'Nyakoe', 'Kitutu Central', 'Nyatieko', 'Suneka', 'Itierio', 'Tabaka Soapstone', 'Nyamarambe', 'Bobasi', 'Ogembo', 'Sengera', 'Tendere', 'Kisii Town', 'Daraja Mbili', 'Nyamache Road Area', 'Kisii University Area', 'Kitutu'],
        nyamira: ['Rigoma', 'Gachuba', 'Kemera', 'Magombo', 'Manga', 'Gesima', 'Nyamaiya', 'Bogichora', 'Bosamaro', 'Bonyamatuta', 'Township', 'Itibo', 'Bomwagamo', 'Bokeira', 'Magwagwa', 'Ekerenyo', 'Mekenene', 'Kiabonyoru', 'Nyansiongo', 'Esise', 'Rigoma Centre', 'Manga Market', 'Gesima Town', 'Kemera Trading Centre', 'Magombo Area', 'Nyamira Town', 'Nyamaiya Market', 'Bogichora Centre', 'Township (Nyamira CBD)', 'Ekerenyo Town', 'Itibo Market', 'Magwagwa Centre', 'Bokeira Area', 'Nyansiongo Town', 'Mekenene Market', 'Esise Centre'],
        garissa: ['Waberi', 'Galbet', 'Township', 'Iftin', 'Balambala', 'Danyere', 'Jara Jara', 'Saka', 'Sankuri', 'Modogashe', 'Benane', 'Goreale', 'Maalimin', 'Sabena', 'Baraki', 'Dertu', 'Dadaab', 'Labasigale', 'Damajale', 'Liboi', 'Abakaile', 'Bura', 'Dekaharia', 'Jarajila', 'Fafi', 'Nanighi', 'Hulugho', 'Sangailu', 'Ijara', 'Masalani', 'Garissa Town', 'Iftin Estate', 'Waberi Estate', 'Galbet Area', 'Balambala Town', 'Danyere Centre', 'Sankuri Area', 'Saka Market', 'Modogashe Town', 'Benane Centre', 'Baraki Market', 'Lagdera Area', 'Dadaab Town', 'Refugee Complex', 'Liboi Border Town', 'Dertu Centre', 'Damajale Area', 'Abakaile Settlement', 'Labasigale Centre', 'Bura East Area', 'Fafi Centre', 'Jarajila Town', 'Nanighi Settlement', 'Masalani Town', 'Ijara Centre', 'Hulugho Border Area', 'Sangailu', 'Bura', 'Sankuri'],
        wajir: ['Gurar', 'Bute', 'Korondile', 'Malkagufu', 'Batalu', 'Danaba', 'Godoma', 'Wajir Bor (Wagberi)', 'Township', 'Barwago', 'Khorof/Harar', 'Elben', 'Sarman', 'Tarbaj', 'Wargadud', 'Arbajahan', 'Hadado/Athibohol', 'Ademasajide', 'Ganyure', 'Wagalla', 'Eldas', 'Della', 'Lakoley South/Basir', 'Elnur/Tula Tula', 'Benane', 'Burder', 'Dadaja Bulla', 'Habaswein', 'Lagboghol South', 'Ibrahim Ure', 'Bute Town', 'Danaba Centre', 'Gurar Area', 'Godoma Trading Centre', 'Wajir Town CBD', 'Wajir Airport Area', 'Township Estate', 'Barwago Centre', 'Tarbaj Town', 'Wargadud Centre', 'Elben Settlement', 'Sarman Area', 'Wagalla Airstrip Area', 'Hadado', 'Ganyure Centre', 'Arbajahan', 'Eldas Town', 'Della Centre', 'Basir Area', 'Tula Tula', 'Habaswein Town', 'Benane Centre', 'Burder Area', 'Ibrahim Ure', 'Dadajabula Area', 'Wajir Town'],
        mandera: ['Arabiya', 'Township', 'Neboi', 'Khalalio', 'Libehia', 'Ashabito', 'Guticha', 'Morothile', 'Rhamu', 'Rhamu Dimtu', 'Elwak North', 'Elwak South', 'Kutulo', 'Shimbir Fatuma', 'Wargadud', 'Takaba South', 'Takaba', 'Lagsure', 'Dandu', 'Gither', 'Banissa', 'Derrkhale', 'Guba', 'Malkamari', 'Kiliwehiri', 'Sala', 'Fino', 'Lafey', 'Warankara', 'Alango Gof', 'Mandera Town', 'Border Point', 'Rhamu Town', 'Ethiopia Border Area', 'Guticha Centre', 'Elwak Town', 'Kutulo Centre', 'Somalia Border Area', 'Takaba Town', 'Lagsure Centre', 'Banissa Town', 'Derkhale', 'Lafey Town', 'Fino Centre', 'Sala Settlement']
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

    const categoryButtons = document.querySelectorAll('.category-item[data-category]');
    const categoryToggle = document.getElementById('category-toggle');
    const categoryList = document.getElementById('category-list');
    const categoryToggleIcon = document.getElementById('category-toggle-icon');
    const marketplaceSearch = document.querySelector('.mega-search-input');
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

    categoryToggle?.addEventListener('click', () => {
        const isExpanded = categoryToggle.getAttribute('aria-expanded') === 'true';
        categoryToggle.setAttribute('aria-expanded', String(!isExpanded));
        categoryList?.classList.toggle('hidden', isExpanded);
        categorySidebar?.classList.toggle('is-collapsed', isExpanded);
        if (categoryToggleIcon) categoryToggleIcon.textContent = isExpanded ? 'expand_more' : 'expand_less';
    });

    const rankAndFilter = (items, query, getTerms) => {
        const searchTerm = query.trim().toLocaleLowerCase();
        const rankedItems = Array.from(items).map((item, index) => {
            const terms = getTerms(item)
                .filter(Boolean)
                .map((term) => term.trim().toLocaleLowerCase());
            const matches = !searchTerm || terms.some((term) => term.includes(searchTerm));
            const startsWithSearch = searchTerm && terms.some((term) =>
                term.startsWith(searchTerm) || term.split(/\s+/).some((word) => word.startsWith(searchTerm))
            );

            item.classList.toggle('hidden', !matches);
            return { item, index, matches, startsWithSearch };
        });

        rankedItems.sort((a, b) => {
            if (a.matches !== b.matches) return a.matches ? -1 : 1;
            if (a.startsWithSearch !== b.startsWithSearch) return a.startsWithSearch ? -1 : 1;
            return a.index - b.index;
        });
        rankedItems.forEach(({ item }) => item.parentElement?.appendChild(item));

        return rankedItems.filter(({ matches }) => matches).length;
    };

    const cardSearchTerms = (card) => [
        card.querySelector('h1, h2, h3, h4')?.textContent,
        card.dataset.categories?.replace(/\s+/g, ' '),
        card.textContent,
    ];

    const updateCategoryListings = (category = '') => {
        const searchTerm = categorySearch?.value.trim() || marketplaceSearch?.value.trim() || '';
        const visibleCount = rankAndFilter(propertyCards, searchTerm, cardSearchTerms);

        propertyCards.forEach((card) => {
            if (category && !card.dataset.categories.split(/\s+/).includes(category)) {
                card.classList.add('hidden');
            }
        });

        const categoryCount = category
            ? Array.from(propertyCards).filter((card) => !card.classList.contains('hidden')).length
            : visibleCount;
        const hasSearch = Boolean(searchTerm);
        if (listingCount) {
            listingCount.textContent = category || hasSearch
                ? `${categoryCount} ${categoryCount === 1 ? 'listing' : 'listings'}`
                : '';
        }
        if (noListingsMessage) noListingsMessage.classList.toggle('hidden', !category && !hasSearch || categoryCount > 0);
        loadMoreListings?.classList.toggle('hidden', categoryCount === 0);

        if (listingSectionTitle && !category) {
            listingSectionTitle.textContent = hasSearch ? 'Search Results' : 'Recommended for You';
        }
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
            recommendationSection.dataset.selectedCategory = category;
            updateCategoryListings(category);
            recommendationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    marketplaceSearch?.addEventListener('input', () => {
        updateCategoryListings(recommendationSection?.dataset.selectedCategory || '');
    });

    categorySearch?.addEventListener('input', () => {
        updateCategoryListings(recommendationSection?.dataset.selectedCategory || '');
    });

    document.getElementById('clear-category-search')?.addEventListener('click', () => {
        if (categorySearch) categorySearch.value = '';
        updateCategoryListings(recommendationSection?.dataset.selectedCategory || '');
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
        if (categorySearch) categorySearch.value = '';
        updateCategoryListings();
        marketplaceFilters.parentElement?.insertBefore(recommendationSection, marketplaceFilters.nextSibling);
    });

    const locationSearch = document.getElementById('location-search');
    const locationResults = document.querySelectorAll('#location-search-results [data-search-result]');
    const locationResultCount = document.getElementById('location-result-count');
    const locationNoResults = document.getElementById('location-no-results');
    const updateLocationResults = () => {
        const resultCount = rankAndFilter(locationResults, locationSearch?.value || '', (card) => [card.textContent]);
        if (locationResultCount) {
            locationResultCount.textContent = `${resultCount} ${resultCount === 1 ? 'Result' : 'Results'}`;
        }
        locationNoResults?.classList.toggle('hidden', resultCount > 0);
    };

    locationSearch?.addEventListener('input', updateLocationResults);
    document.getElementById('location-search-button')?.addEventListener('click', () => {
        updateLocationResults();
        toast(locationSearch?.value.trim()
            ? `Updating results for "${locationSearch.value.trim()}"...`
            : 'Updating current results...', 'primary');
    });

    document.querySelector('.mega-search-btn')?.addEventListener('click', () => {
        updateCategoryListings(recommendationSection?.dataset.selectedCategory || '');
        if (marketplaceSearch?.value.trim()) {
            toast(`Searching for "${marketplaceSearch.value.trim()}"...`, 'primary');
            recommendationSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            toast('Please enter a location or property type', 'primary');
        }
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

// To be connected to database(Filter and search functionality) and other features in the future.
const propertiesData = [
    {
        id: 1,
        title: 'Luxury 2BR Loft in Downtown Nairobi',
        type: 'Apartment',
        price: 3500,
        bedrooms: 2,
        location: "WestLands, Kenya",
        amenities: ['WiFi', 'Gym'],
        tag: "New Listing",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDislB9eDStdQfVeUXT-SyVYIktdYj4dn1rLs71l6k9U2PyNGYNNFrTSNc9vpmx-1nxZvV3C7xTOHKuL_z-JzyJlV_T9zSmkLpWqQELXWnwdeBWTC_gAwAsO4XuJ9XTTKaNGxd6KvkFkqfHdtlaykJTFfvzJjU7r5Dz5nFelagyTDehv6EwDvE3Dmm0Pv4IBvdDn6HaikyLJuu5BGtc6TRELsBd5pTZoYhKM13gtdCCDe07Kg4J7KzTaxaSxrK6staX7TwHfOMKMTQ"
    },
    {
        id: 2,
        title: 'Modern 3BR House with Garden in Karen',
        type: 'Villas',
        price: 8500,
        bedrooms: 4,
        location: "Karen, Kenya",
        amenities: ['WiFi', 'Gym', 'Pool'],
        tag: "Featured",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80"
    },
    {
        id:3,
        title:"Urban Heights Studio",
        type:"Apartments",
        price:3000,
        bedrooms:1,
        location:"Kilimani,Nairobi",
        amenitiess:["WiFi","Parking"],
        tag:"Popular",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
    }
];

//Filter State Object
const filterState = {
    minPrice:1500,
    maxPrice:10000000,
    propertType:"All",
    bedrooms:1,
    amenities:[],
    searchQuery:"",
};
// Element Bindings
const minSlider = document.getElementById("priceRangeMin");
const maxSlider = document.getElementById("priceRangeMax");
const rangeFill = document.getElementById("rangeFill");
const minThumb = document.querySelectorAll("minThumb");
const maxThumb = document.querySelectorAll("maxThumb");
const minLabel = document.getElementById('minPriceLabel');
const maxLabel = document.getElementById('maxPriceLabel');

const typeButtons = document.querySelectorAll('.property-type-btn');
const btnDec = document.getElementById('btn-bedroom-dec');
const btnInc = document.getElementById('btn-bedroom-inc');
const bedroomDisplay = document.getElementById('bedroom-count-display');
const amenitiesCheckboxes = document.querySelectorAll('.amenity-checkbox');

const searchInput = document.getElementById('location-search');
const searchBtn = document.getElementById('location-search-button');
const resultsContainer = document.getElementById('location-search-results');
const resultCount = document.getElementById('location-result-count');
const noResultsMsg = document.getElementById('location-no-results');
const scrollContainer = document.getElementById('results-scroll-container');

const minLimit = 15000;
const maxLimit = 10000000;