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
    
})