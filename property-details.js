document.addEventListener("DOMContentLoaded", function () {
    var storageKey = "selectedProperty";
    var params = new URLSearchParams(window.location.search);

    function readSavedProperty() {
        try {
            var value = JSON.parse(localStorage.getItem(storageKey) || "{}");
            return value && typeof value === "object" ? value : {};
        } catch (error) {
            console.warn("Could not read the selected property from storage.", error);
            return {};
        }
    }

    function saveProperty(property) {
        try {
            localStorage.setItem(storageKey, JSON.stringify(property));
        } catch (error) {
            console.warn("Could not save the selected property.", error);
        }
    }

    function parsePrice(value) {
        var match = String(value || "").match(/(?:KSh|KES)\s*([\d,]+(?:\.\d+)?)/i);
        if (!match) return 0;

        var amount = Number(match[1].replace(/,/g, ""));
        return Number.isFinite(amount) ? amount : 0;
    }

    function makePropertyId(title) {
        return String(title || "")
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    }

    function getPropertyFromCard(card) {
        var titleElement = card.querySelector("h3");
        var imageElement = card.querySelector("img");
        var title = titleElement ? titleElement.textContent.trim() : "";

        var priceMatch = card.textContent.match(/(?:KSh|KES)\s*[\d,]+(?:\.\d+)?/i);
        var price = parsePrice(priceMatch ? priceMatch[0] : "");

        var location = "";
        var locationIcon = Array.from(card.querySelectorAll(".material-symbols-outlined"))
            .find(function (icon) {
                return icon.textContent.trim() === "location_on";
            });

        if (locationIcon && locationIcon.parentElement) {
            location = locationIcon.parentElement.textContent
                .replace("location_on", "")
                .trim();
        }

        if (!location && title.indexOf(" - ") !== -1) {
            location = title.split(" - ").slice(1).join(" - ").trim();
        }

        if (!title || !price) return null;

        return {
            id: card.dataset.propertyId || makePropertyId(title),
            title: title,
            price: price,
            rent: price,
            location: location,
            image: imageElement ? imageElement.src : ""
        };
    }

    function formatPrice(amount) {
        return "KSh " + amount.toLocaleString("en-KE");
    }

    function buildScheduleUrl(property) {
        var query = new URLSearchParams({
            id: property.id || makePropertyId(property.title),
            property: property.title,
            rent: String(property.rent || property.price)
        });

        if (property.location) query.set("location", property.location);

        return "schedule.html?" + query.toString();
    }

    function buildDetailsUrl(property) {
        var query = new URLSearchParams({
            id: property.id,
            property: property.title,
            rent: String(property.price),
            location: property.location,
            image: property.image
        });

        return "property-details.html?" + query.toString();
    }

    function renderPropertyDetails(property) {
        var titleElement = document.getElementById("property-title") ||
            document.querySelector("main h1.text-3xl");

        var locationElement = document.getElementById("property-location") ||
            (titleElement && titleElement.parentElement
                ? titleElement.parentElement.querySelector(".text-sm.font-bold")
                : null);

        var priceElement = document.getElementById("property-price") ||
            document.querySelector("main .text-right p.text-primary");

        var heroImage = document.getElementById("main-gallery-image") ||
            document.querySelector("main .aspect-video img");

        if (titleElement) titleElement.textContent = property.title;
        if (locationElement && property.location) {
            locationElement.textContent = property.location;
        }

        if (priceElement && property.price) {
            priceElement.textContent = formatPrice(property.price);
        }

        if (heroImage && property.image) {
            heroImage.src = property.image;
            heroImage.alt = property.title;
        }

        var thumbnailGrid = document.getElementById("thumbnail-grid");
        if (thumbnailGrid && property.image) {
            thumbnailGrid.innerHTML = "";

            var thumbnail = document.createElement("img");
            thumbnail.src = property.image;
            thumbnail.alt = property.title;
            thumbnail.className = "w-full h-full object-cover rounded-2xl";
            thumbnailGrid.appendChild(thumbnail);
        }

        document.querySelectorAll('a[href^="schedule.html"]').forEach(function (link) {
            link.href = buildScheduleUrl(property);
        });

        document.title = "Rentify - " + property.title;
        saveProperty(property);
    }

    // Keep home-page listing links specific even when opened in a new tab.
    document.querySelectorAll("#property-listings a[href]").forEach(function (link) {
        var property = getPropertyFromCard(link);
        if (property) link.href = buildDetailsUrl(property);
    });

    // Capture listing clicks, including Explore cards created dynamically by app.js.
    document.addEventListener("click", function (event) {
        var link = event.target.closest("a");
        if (!link) return;

        var linkUrl = new URL(link.href, window.location.href);
        var isDetailsLink = linkUrl.pathname.toLowerCase().endsWith("/property-details.html");
        var isRecommendation = link.closest("#recommend") && link.getAttribute("href") === "#";

        if (!isDetailsLink && !isRecommendation) return;
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        var card = link.closest("article") || link.closest(".property-card") || link;
        var property = getPropertyFromCard(card);
        if (!property) return;

        event.preventDefault();
        link.href = buildDetailsUrl(property);
        saveProperty(property);
        window.location.assign(link.href);
    });

    var storedProperty = readSavedProperty();
    var currentTitleElement = document.getElementById("property-title") ||
        document.querySelector("main h1.text-3xl");
    var currentTitle = currentTitleElement
        ? currentTitleElement.textContent.trim()
        : "Luxury 2BR Loft";

    var currentPriceElement = document.getElementById("property-price") ||
        document.querySelector("main .text-right p.text-primary");

    var property = {
        id: params.get("id") || storedProperty.id || makePropertyId(currentTitle),
        title: params.get("property") ||
            params.get("title") ||
            storedProperty.title ||
            currentTitle,
        price: parsePrice(params.get("rent") || params.get("price")) ||
            Number(storedProperty.price || storedProperty.rent) ||
            parsePrice(currentPriceElement ? currentPriceElement.textContent : "") ||
            120000,
        location: params.get("location") || storedProperty.location || "",
        image: params.get("image") || storedProperty.image || ""
    };

    property.rent = property.price;
    renderPropertyDetails(property);
});