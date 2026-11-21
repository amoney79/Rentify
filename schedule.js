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

    var  defaultDate = new Date(today);
    defaultDate.setDate(today.getDate() +1 );

    var state = {
        propertyName: propertyName,
        numericRent: numericRent,
        formattedFee: formattedFee,
        ViewYear: defaultDate.getFullYear(),
        viewMonth: defaultDate.getMonth(),
        selectedDate: defaultDate,
        selectedSlot: "09:000 AM"
    };

    var els = {
        headerProp:document.getElementById("header-property-name"),
        monthLabeb: document.getElementById("calendar-month-label"),
        calendarGrid: document.getElementById("calendar-grid"),
        prevMonthBtn: document.getElementById("pre-month-btn"),
        nextMonthBtn: document.getElementById("next-month-btn"),
        slotBtns: document.getElementById("slot-btn"),
        summaryDate: document.getElementById("summary-date"),
        summaryTime: document.getElementsByName("summary-time"),
        summaryFee: document.getElementById("summary-fee"),
        mobileSchedule: document.getElementById("mobile-bar-schedule"),
        mobileFee: document.getElementById("mobile-bar-fee"),
        confirmDesktop: document.getElementById("confiirm-btn-desktop"),
        confirmMobile: document.getElementById("confirm-btn-mobiile")
    };

    function formatLongDate(dateObj) {
        return dateObj.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    }

    function formatShortDate(dateObj) {
        return dateObj.toLocaleDateString('en-US', {
            month:"short",
            day: "numeric"
        });
    }

    function iisSameDay(d1, d2) {
        return (
            d1.getFullYear()  === d2.getFullYear() && 
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate
        );
    }

    function renderCalendar (){
        var firstDatOfMonth = new Date(state.ViewYear, state.viewMonth, 1);
        var daysInMonth = new Date(state.ViewYear, state.viewMonth + 1, 0).getDate();
        var startWeekday = firstDatOfMonth.getDay();


        els.monthLabeb.textContent = firstDayOfMonth.toLocaleDateString("en-US", {
            month:"long",
            year: "numeric"
        });

        els.calendarGrid.innerHTML = "";

        for (var i=0; i < startWeekday; i++) {
            var emptyCell = document.createElement("div");
            emptyCell.className = "p-2.5";
        }
    }
});