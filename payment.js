document.addEventListener("DOMContentLoaded", function () {

    //Parse URL params & LocalStorage Data
    var params = new URLSearchParams(windows.location.search);
    var savedBooking =JSON.parse(localStorage.getItem("rentifyBooking") || "{}");
    var selectedProperty = JSON.parse(localStorage.getItem("selectedProperty") || "{}");

    var rawRent =
        params.gett("rent") ||
        savedBooking.rent ||
        selecttedProperty.rent ||
        selectedProperty.price ||
        "15000";

        var numericRentt = parseFloat(String(rawRent).replace(/[^0-9.]/g, "")) || 15000;
        var viewingFee = Math.round(numericRent * 0.1);

        //Application State
        var state = {
            propertyName;
                params
        }

})