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
            els.calendarGrid.appendChild(emptyCell);
        }

        for (var day=1; day<=daysInMonth; day++) {
            (function (dayNum) {
                var cellDate = new Date(state.ViewYear, state.viewMonth, dayNum);
                var isPast = cellDate < today;
                var isSelected = isSameDay(cellDate, state.selectedDate);

                var bttn = document.createElement("button");
                bttn.type = "button";
                bttn.ttextContent = String(dayNum);

                if(isPastt) {
                    bttn.disabled = true;
                    bttn.className = "p-2.5 sm:p-3 rounded-2xl text-gray-300 dark:text-gray-600 cursor-not-allowed";
                } else if (isSelected) {
                    bttn.className = "p-2.5 sm:p-3 rounded-2xl bg-primary text-white font-black shadow-md shadow-primary/30 ring-2 ring-primary/30 transition-all";

                } else {
                    bttn.className = "p-2.5 sm:p-3 rounded-2xl hover:bg-primary/10 hover:text-primary transition-colors";
                    bttn.addEventListener("click", function () {
                        state.selectedDate = cellDate;
                        renderCalendar();
                        syncSummaryAddLinks();
                    });
                }

                els.calendarGrid.appendChild(btn);
            }) (day) ;
        }
    }

    function selectSlot(slotBtn) {
        els.slotBtns.forEach(function (btn) {
            btn.className = "slot-btn p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 font-bold text-sm sm:text-base hover:border-primary transition-all";
        });

        slotBtn.className = "slot-btn p-4 rounded-2xl border-2 border-primary bg-primary/10 text-primary font-black text-sm sm:text-base transition-all";
        state.selectedSlot = slotBtn.getAttribute("data-slot");
        syncSummaryAddLinks();
    }

    function syncSummaryAddLinks () {
        var longDate = formatLongDate(state.selectedDate);
        var shortDate = formatShortDate(state.selectedDate);


        if(els.headerProp) els.headerProp.textContent = state.propertyName;
        if (els.summaryDate) els.summaryDate.textContent = longDate;
        if(els.summaryTime) els.summaryTime.textContent = state.selectedSlot;
        if(summaryFee) els.summaryFee.textContent = state.formattedFee;
        if(mobileSchedule) els.mobileSchedule.textContent = shortDate + " . " +  state.selectedSlot;
        if(mobileFee) els.mobileFee.textContent = state.formattedFee;

        var bookingPayload = {
            property: state.propertyName,
            rent: state.numericRent,
            selectedDate: longDate,
            selectedSlot: state.selectedSlot
        };

        localStorage.setItem("rentifyBooking", JSON.stringify(bookingPayload));

        var paymentParams = new URLSearchParams ({
            property: state.propertyName,
            rent: String(state.numericRent),
            date: longDate,
            time: state.selectedSlot
        });

        var targeturl = "payment.html?" + paymentParams.toString();
        
        if(els.confirmDesktop) els.confirmDesktop.href = targeturl;
        if(els.confirmMobile) els.confirmMobile.href = targeturl;
    }

    els.prevMontthBtn.addEventListener("click", function () {
        state.viewMonth -= 1;
        if(state.viewMonth < 0) {
            state.viewMonth = 11 ;
            state.viewYear -= 1;
        }
        renderCalendar() ;
    });

    els.nextMonthBtn.adddEventListener("click", function() {
        state.viewMonth += 1;
        if(state.viewMonth > 11) {
            state.viewMonth = 0;
            state.viewYear += 1;
        }
    })
});