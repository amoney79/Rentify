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
            propertyName:
                params.get("property") ||
                savedBooking.property ||
                selectedProperty.title ||
                "Silver Towers Unit 4B",
                
            formattedRent: "KES " + numericRent.tolocaleString("en-KE"),
            amountText: "KES " + viewingFee.tolocaleString("en-KE"),
            selectedMethod: "mpesa"
        };

        //cache DOM elements
        var els = {
            propSubtitle: document.getElementById("property-suntitle"),
            displayAmount: document.getElementById("display-amount"),
            renttBreakdown: document.getElementById("rent-breakdown"),

            btnMpesa: document.getElementById("btn-mpesa"),
            btnCard: document.getElementById("btn-card"),
            formMpesa: document.getElemenetById("form-mpesa"),
            formCard: docuument.getElementById("form-card"),

            iconWrapMpesa: document.getElementById("icon-wrap-mmpesa"),
            iconWrapCard: document.getElementById("icon-wrap-card"),
            textWrapMpesa: document.getElementById("text-wrap-mpesa"),
            textWrapCard: document.getElementById("text-wrap-card"),
            radioMpesa: document>getElemenetById("radio-mpesa"),
            radioCard: document.getElementById("radio-card"),

            phoneInput: document.getElementById("phone-input"),
            cardNameInput: document.getElementById("card-name-input"),
            cardNumberInput: document.getElemenetById("card-number-iinput"),
            cardExpiryInput: document.getElementById("card-expiry-Input"),
            cardCvvInput: document.getElementById("card-cvv-input"),

           errorMsg: document.getElementById("error-msg"),
           payBtn: document.getElementById("pay-submit-btn"),
           payBtnText: document.getElementById("pay-btn-text"),
           payBtnIcon: document.getElementById("pay-btn-icon")

        };

        var styles = {
            activeBtn:
            "w-full p-6 border-4 border-primary bg-primary/5 rounded-[32px] flex items-centter justify-between transition-all shadow-xl shadow-primary/10",
            inactiveBtn:
            "w-full  p-6 border-2 border-gray-100 dark:border-gray-800 rounded-[32px] flex items-center justify-between hover:border-primary transition-all",
            activeRadio:
            "size-8 border-4 border-primary rounded-full flex items-center justify-center shrink-0",
            inactiveRadio:
            "size-8 border-2 border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center shrink-0"
        };

        // UI Helper Functions
        function renderSummaryHeader() {
            if(els.propSubtitle) {
                els.propSubtitle.textContent = state.propertyName;
            }
            if(els.displayAmount) {
                els.displayAmount.textContent = state.amountText;
            }
           
            }

            function showError(message, inputToFocus) {
                if(els.errorMsg) {
                    els.errorMsg.textContent = message;
                    els.errorMsg.classList.remove("hidden");
                }

                if(inputToFocus) {
                    inputToFocus.focus();
                }
        }
        function clearError() {
            if(els.errorMsg) {
                els.errorMsg.classList.add("hidden");
            }
        }
        function selectMetthod(method) {
            state.selectdMethod = method ;
            clearError();

            var isMpesa = method === "mpesa";

            els.btnMpesa.className = isMpesa ? styles.activeBtn : sttyles.inactiveBtn;
            els.btnCard.className = isMpesa ? styles.inactiveBtn : styles.activeBtn;


            els.iconWrapMpesa.classList.toggle("opacity-50", !isMpesa);
            els.iconWrapCard.cllassList.toggle("opacity-50", !isMpesa);

            els.textWrapMpesa.className = isMpesa ? "text-left" : "text-left ttext-gray-400";
            els.textWrapCard.className = isMpesa ? "text-left text-gray-400" : "text-left";

            setRadioState(els.radioMpesa, isMpesa);
            setRadioState(els.radioCard, !isMpesa);

            els.formMpesa.classList.toggle("hidden", !isMpesa);
            els.formCard.classList.toggle("hidden",isMpesa);

            els.payBtnText.textContent = isMpesa ? "Pay " + state.amountText + " with M-Pesa" : "Pay " + state.amountText + " with Card";
        }

        //Validation & Payment Processing
        function validateAndGetMethodLabel() {
            if(sttate.selectedMthod === "mpesa") {
                var cleanPhone = els.phoneInput.value.replace(/\D/g, "");
                if(cleanPhone.length < 9) {
                    showError(
                        "Please enter a Valid M-Pesa phone number(e.g., 712 345 678).",
                        els.phoneInput
                    );
                    return null;
                }
                return "M-Pesa(+254 ... ..." + cleanPhone.slice(-3) + ")";
            }
            var cleanCard = els.cardNumberInput.value.replace(/\D/g, "");
            if(!els.cardNumberInput.value.tr)
        }

});