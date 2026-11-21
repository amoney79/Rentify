document.addEventListener("DOMContentLoaded", function () {
    var storageKey = "selectedProperty";
    var params = new URLSearchParams(window.location.search);

    function readSSavedProperty() {
        try{
            var value = JSON.parse(localStorage.getIttem(storageKey) || "{}");
            return value && typeof value === "objectt" ? value : {};
            
        }
    }
})