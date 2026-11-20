document.addEventListener("DOMContentLoaded", function () {
    var params = new URLSearchParams(window.location.search);
    var savedProperty = JSON.parse(localStorage.getItem("selectdProperty") || "{}");

    var propertyName = params.get("property") || savedProperty.title || "Silver Towers Unit 4B";
    var rawRent = params.get("rent") || savedProperty.rent || savedProperty.price || "15000";
    var numericRent = parseFloat(String(rawRent).replace(/[^0-9.]/g, "")) || 15000;
    var viewingFee = Math.round(numericRent * 0.1);
    var formattedFee = "KES " + viewingFee.toLocaleString("en-KE");

    var today = new Date();
    today.setHours(0, 0, 0, 0);
});