document.addEventListener("DOMContentLoaded", function () {
    var params = new URLSearchParams(window.location.search);
    var savedProperty = JSON.parse(localStorage.getItem("selectedProperty") || "{}");

    var propertyName = params.get("property") || savedProperty.title || "Silver Towers Unit 4B";
    var rawRent = params.get("rent") || savedProperty.rent || savedProperty.price || "15000";
    var numericRent = parseFloat(String(rawRent).replace(/[^0-9.]/g, "")) || 15000;
    var viewingFee = Math.round(numericRent * 0.01);
    var formattedFee = "KES " + viewingFee.toLocaleString("en-KE");

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var defaultDate = new Date(today);
    defaultDate.setDate(today.getDate() + 1);

    var state = {
        propertyName: propertyName,
        numericRent: numericRent,
        formattedFee: formattedFee,
        viewYear: defaultDate.getFullYear(),
        viewMonth: defaultDate.getMonth(),
        selectedDate: defaultDate,
        selectedSlot: "09:00 AM"
    };

    var els = {
        headerProp: document.getElementById("header-property-name"),
        monthLabel: document.getElementById("calendar-month-label"),
        calendarGrid: document.getElementById("calendar-grid"),
        prevMonthBtn: document.getElementById("prev-month-btn"),
        nextMonthBtn: document.getElementById("next-month-btn"),
        slotBtns: document.querySelectorAll(".slot-btn"),
        summaryDate: document.getElementById("summary-date"),
        summaryTime: document.getElementById("summary-time"),
        summaryFee: document.getElementById("summary-fee"),
        mobileSchedule: document.getElementById("mobile-bar-schedule"),
        mobileFee: document.getElementById("mobile-bar-fee"),
        confirmDesktop: document.getElementById("confirm-btn-desktop"),
        confirmMobile: document.getElementById("confirm-btn-mobile")
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
        return dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
        });
    }

    function isSameDay(d1, d2) {
        return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
        );
    }

    function renderCalendar() {
        var firstDayOfMonth = new Date(state.viewYear, state.viewMonth, 1);
        var daysInMonth = new Date(state.viewYear, state.viewMonth + 1, 0).getDate();
        var startWeekday = firstDayOfMonth.getDay();

        els.monthLabel.textContent = firstDayOfMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
        });

        els.calendarGrid.innerHTML = "";

        for (var i = 0; i < startWeekday; i++) {
            var emptyCell = document.createElement("div");
            emptyCell.className = "p-2.5";
            els.calendarGrid.appendChild(emptyCell);
        }

        for (var day = 1; day <= daysInMonth; day++) {
            (function (dayNum) {
                var cellDate = new Date(state.viewYear, state.viewMonth, dayNum);
                var isPast = cellDate < today;
                var isSelected = isSameDay(cellDate, state.selectedDate);

                var btn = document.createElement("button");
                btn.type = "button";
                btn.textContent = String(dayNum);

                if (isPast) {
                    btn.disabled = true;
                    btn.className = "p-2.5 sm:p-3 rounded-2xl text-gray-300 dark:text-gray-600 cursor-not-allowed";
                } else if (isSelected) {
                    btn.className = "p-2.5 sm:p-3 rounded-2xl bg-primary text-white font-black shadow-md shadow-primary/30 ring-2 ring-primary/30 transition-all";
                } else {
                    btn.className = "p-2.5 sm:p-3 rounded-2xl hover:bg-primary/10 hover:text-primary transition-colors";
                    btn.addEventListener("click", function () {
                        state.selectedDate = cellDate;
                        renderCalendar();
                        syncSummaryAndLinks();
                    });
                }

                els.calendarGrid.appendChild(btn);
            })(day);
        }
    }

    function selectSlot(slotBtn) {
        els.slotBtns.forEach(function (btn) {
            btn.className = "slot-btn p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 font-bold text-sm sm:text-base hover:border-primary transition-all";
        });

        slotBtn.className = "slot-btn p-4 rounded-2xl border-2 border-primary bg-primary/10 text-primary font-black text-sm sm:text-base transition-all";
        state.selectedSlot = slotBtn.getAttribute("data-slot");
        syncSummaryAndLinks();
    }

    function syncSummaryAndLinks() {
        var longDate = formatLongDate(state.selectedDate);
        var shortDate = formatShortDate(state.selectedDate);

        if (els.headerProp) els.headerProp.textContent = state.propertyName;
        if (els.summaryDate) els.summaryDate.textContent = longDate;
        if (els.summaryTime) els.summaryTime.textContent = state.selectedSlot;
        if (els.summaryFee) els.summaryFee.textContent = state.formattedFee;
        if (els.mobileSchedule) els.mobileSchedule.textContent = shortDate + " • " + state.selectedSlot;
        if (els.mobileFee) els.mobileFee.textContent = state.formattedFee;

        var bookingPayload = {
            property: state.propertyName,
            rent: state.numericRent,
            selectedDate: longDate,
            selectedSlot: state.selectedSlot
        };
        localStorage.setItem("rentifyBooking", JSON.stringify(bookingPayload));

        var paymentParams = new URLSearchParams({
            property: state.propertyName,
            rent: String(state.numericRent),
            date: longDate,
            time: state.selectedSlot
        });
        var targetUrl = "payment.html?" + paymentParams.toString();

        if (els.confirmDesktop) els.confirmDesktop.href = targetUrl;
        if (els.confirmMobile) els.confirmMobile.href = targetUrl;
    }

    els.prevMonthBtn.addEventListener("click", function () {
        state.viewMonth -= 1;
        if (state.viewMonth < 0) {
            state.viewMonth = 11;
            state.viewYear -= 1;
        }
        renderCalendar();
    });

    els.nextMonthBtn.addEventListener("click", function () {
        state.viewMonth += 1;
        if (state.viewMonth > 11) {
            state.viewMonth = 0;
            state.viewYear += 1;
        }
        renderCalendar();
    });

    els.slotBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            selectSlot(btn);
        });
    });

    renderCalendar();
    syncSummaryAndLinks();
});
