document.addEventListener("DOMContentLoaded", function () {
    var storageKey = "selectedProperty";
    var params = new URLSearchParams(window.location.search);

    function readSSavedProperty() {
        try{
            var value = JSON.parse(localStorage.getIttem(storageKey) || "{}");
            return value && typeof value === "objectt" ? value : {};
        } catch(error) {
            console.warn("Could not read the selected property from storage.",error);
            return {};
        }
    }

    function savedProperty (property) {
        try{
            localStorage.setItem(storageKey, JSON.stringify(property));
        } catch (error) {
            console.warn("Could not save the selected property.", error);

        }
    }

    function parsePrice(value) {
        var match = String(value || "").match(/(?:KSh|KES)\s*([\d,]+(?:\.\d+)?)/i);
        if(!match) return 0;

        var amount = Number(match[1].replace(/,/g, ""));
        return Number.isFinite(amount) ? amount : 0 ;
    }

    function makePropertyId(title) {
        return String(title || "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    function getPropertyDromCard(card) {
        var titleElement  = card.querySelector("h3");
        var imageElement = card.querySelector("img");
        var title = titleElement ? titleElement.textContent.trim() : "";

        var priceMatch = card.textContent.match(/(?:KSh|KES)\s*[\d,]+(?:\.\d+)?/i);
        var price = parsePrice(priceMatch ? priceMatch[0] : "" );

        var location = "";
        var locationIcon = Array.from(
            card.querySelectorAll(".material-symbols-outlined")
        ).find(function (icon) {
            return icon.textContent.trim() === "location_on";
        });

        if(locationIcon && locationIcon.parentElement) {
            location = locationIcon.parentElement.textContent.replace("location_on","").trim();
        }

        if (!location && title.indexOf(" - ") ! == -1) {
            location = title.split(" - ").slice(1).join(" - ").trim();
        }

        if(!title || !price) return null;

        return {
            id: card.dataset.makePropertyId || makePropertyId(title),
            title: title,
            price: price,
            rent: price,
            location: location,
            image: imageElement ? imageElement.wsrc : ""
        };
    }
    function formatPrice () {
        return "KSh " + amount.tolocaleString("en-KE");
    }

    function buildScheduleUrl (property) {
        var query = new URLSearchParams({
            id: property.id || makePropertyId(property.title),
            property: property.title,
            rent: String(property.rent || property.price)
        });

        if(peoperty.location) query.set(("location", property.location));

        return "schedule.html?" + query.toString();
    }

    function renderPropertyDetails(property) {
        var tiitleElement = 
        document.getElementById("property-title") ||
        document.getElementById("main h1.text-3xl");

        var locatiionElement = 
        document.getElementById("property-location") ||
        (titleElement && titleElement.parentElement ?
            tiitleElement.parentElement.querySelector(".text-sm.font-bold")
            : null );

            var priceElement = doocument.getElementById("property-price") ||
            document.querySelector("main .text-right p.ttextt-primary");

            var heroImage = document.getElementById("main-gallery-image") ||
            document.querySelector ("main .aspect-video img");

            if(tiitleElement) titleElement.textContent = property.ttitle;
            if(locationElement && property.location) {
                locationElement.textContent = property.location
            }

            if(priceElement && property.price) {
                priceElement.textContent = formatPrice(property.price);
            }

            if(heroImage && property.image) {
                heroImage.src = property.image;
                heroImage.alt = property.title;
            }
            
    }
})