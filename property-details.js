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
    }
})