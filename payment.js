document.addEventListener("DOMContentLoaded", function () {
    function readStoredObject(key) {
        try {
            var value = JSON.parse(localStorage.getItem(key) || "{}");
            return value && typeof value === "object" ? value : {};
        } catch (error) {
            return {};
        }
    }

    var params = new URLSearchParams(window.location.search);
    var savedBooking = readStoredObject("rentifyBooking");
    var selectedProperty = readStoredObject("selectedProperty");
    var rawRent =
        params.get("rent") ||
        savedBooking.rent ||
        selectedProperty.rent ||
        selectedProperty.price ||
        "1500";


    var numericRent = parseFloat(String(rawRent).replace(/[^0-9.]/g, "")) || 15000;
    var viewingFee = Math.round(numericRent * 0.1);

    //Application state(Localhost)
    var state = {
        apiBaseUrl: window.RENTIFY_API_URL || "http://localhost:8080/api/payments",
        propertyName:
            params.get("property") ||
            savedBooking.property ||
            selectedProperty.title ||
            "Silver Towers Unit 4B",
        amountText: "KES " + viewingFee.toLocaleString("en-KE"),
        selectedMethod: "mpesa"
    };

    var els = {
        propertySubtitle: document.getElementById("property-subtitle"),
        displayAmount: document.getElementById("display-amount"),
        btnMpesa: document.getElementById("btn-mpesa"),
        btnCard: document.getElementById("btn-card"),
        formMpesa: document.getElementById("form-mpesa"),
        formCard: document.getElementById("form-card"),
        iconWrapMpesa: document.getElementById("icon-wrap-mpesa"),
        iconWrapCard: document.getElementById("icon-wrap-card"),
        textWrapMpesa: document.getElementById("text-wrap-mpesa"),
        textWrapCard: document.getElementById("text-wrap-card"),
        radioMpesa: document.getElementById("radio-mpesa"),
        radioCard: document.getElementById("radio-card"),
        phoneInput: document.getElementById("phone-input"),
        cardNameInput: document.getElementById("card-name-input"),
        cardNumberInput: document.getElementById("card-number-input"),
        cardExpiryInput: document.getElementById("card-expiry-input"),
        cardCvvInput: document.getElementById("card-cvv-input"),
        errorMsg: document.getElementById("error-msg"),
        paymentForm: document.getElementById("payment-form"),
        payBtn: document.getElementById("pay-submit-btn"),
        payBtnText: document.getElementById("pay-btn-text"),
        payBtnIcon: document.getElementById("pay-btn-icon")
    };

    var styles = {
        activeBtn:
            "w-full p-6 border-4 border-primary bg-primary/5 rounded-[32px] flex items-center justify-between transition-all shadow-2xl shadow-primary/10",
        inactiveBtn:
            "w-full p-6 border-2 border-gray-100 dark:border-gray-800 rounded-[32px] flex items-center justify-between hover:border-primary transition-all",
        activeRadio:
            "size-8 border-4 border-primary rounded-full flex items-center justify-center shrink-0",
        inactiveRadio:
            "size-8 border-2 border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center shrink-0"
    };

    function renderSummary() {
        els.displayAmount.textContent = state.amountText;
        els.propertySubtitle.textContent = state.propertyName;
    }

    function showError(message, inputToFocus) {
        els.errorMsg.textContent = message;
        els.errorMsg.classList.remove("hidden");
        if (inputToFocus) {
            inputToFocus.focus();
        }
    }

    function clearError() {
        els.errorMsg.textContent = "";
        els.errorMsg.classList.add("hidden");
    }

    function setRadioState(radio, active) {
        radio.className = active ? styles.activeRadio : styles.inactiveRadio;
        radio.innerHTML = active
            ? '<span class="size-3 bg-primary rounded-full"></span>'
            : "";
    }

    function selectMethod(method) {
        state.selectedMethod = method;
        clearError();

        var isMpesa = method === "mpesa";
        els.btnMpesa.className = isMpesa ? styles.activeBtn : styles.inactiveBtn;
        els.btnCard.className = isMpesa ? styles.inactiveBtn : styles.activeBtn;
        els.iconWrapMpesa.classList.toggle("opacity-50", !isMpesa);
        els.iconWrapCard.classList.toggle("opacity-50", isMpesa);
        els.textWrapMpesa.classList.toggle("text-gray-400", !isMpesa);
        els.textWrapCard.classList.toggle("text-gray-400", isMpesa);
        setRadioState(els.radioMpesa, isMpesa);
        setRadioState(els.radioCard, !isMpesa);
        els.formMpesa.classList.toggle("hidden", !isMpesa);
        els.formCard.classList.toggle("hidden", isMpesa);
        els.payBtnText.textContent = isMpesa
            ? "Pay " + state.amountText + " with M-Pesa"
            : "Pay " + state.amountText + " with Card";
    }

    function validatePayment() {
        if (state.selectedMethod === "mpesa") {
            var phone = els.phoneInput.value.replace(/\D/g, "");
            if (phone.charAt(0) === "0" && phone.length === 10) {
                phone = phone.substring(1);
            }
            if (!/^[17]\d{8}$/.test(phone)) {
                showError(
                    "Enter a valid M-Pesa number, such as 712 345 678.",
                    els.phoneInput
                );
                return null;
            }
            return "M-Pesa (+254 ••• ••• " + phone.slice(-3) + ")";
        }

        if (!els.cardNameInput.value.trim()) {
            showError("Enter the cardholder name.", els.cardNameInput);
            return null;
        }

        var cardNumber = els.cardNumberInput.value.replace(/\D/g, "");
        if (!/^\d{15,16}$/.test(cardNumber)) {
            showError("Enter a valid 15- or 16-digit card number.", els.cardNumberInput);
            return null;
        }

        var expiry = els.cardExpiryInput.value;
        var expiryParts = expiry.split("/");
        var expiryMonth = Number(expiryParts[0]);
        var expiryYear = Number(expiryParts[1]);
        if (
            !/^\d{2}\/\d{2}$/.test(expiry) ||
            expiryMonth < 1 ||
            expiryMonth > 12 ||
            expiryYear < 0
        ) {
            showError("Enter a valid expiry date in MM/YY format.", els.cardExpiryInput);
            return null;
        }

        var now = new Date();
        var fullExpiryYear = 2000 + expiryYear;
        if (
            fullExpiryYear < now.getFullYear() ||
            (fullExpiryYear === now.getFullYear() && expiryMonth < now.getMonth() + 1)
        ) {
            showError("This card has expired. Enter a valid expiry date.", els.cardExpiryInput);
            return null;
        }

        if (!/^\d{3,4}$/.test(els.cardCvvInput.value)) {
            showError("Enter a valid 3- or 4-digit security code.", els.cardCvvInput);
            return null;
        }

        return "Card •••• " + cardNumber.slice(-4);
    }

    function handlePaymentSubmit(event) {
        event.preventDefault();
        clearError();

        var methodLabel = validatePayment();
        if (!methodLabel) {
            return;
        }

        els.payBtn.disabled = true;
        els.payBtnIcon.textContent = "sync";
        els.payBtnIcon.classList.add("animate-spin");
        els.payBtnText.textContent =
            state.selectedMethod === "mpesa"
                ? "Check your phone for the M-Pesa PIN prompt..."
                : "Authorizing card...";

        var redirectParams = new URLSearchParams({
            type: "payment",
            amount: state.amountText,
            txId:
                (state.selectedMethod === "mpesa" ? "MPESA-" : "CARD-") +
                Math.random().toString(36).substring(2, 8).toUpperCase(),
            property: state.propertyName,
            method: methodLabel
        });

        window.setTimeout(function () {
            window.location.assign("success.html?" + redirectParams.toString());
        }, 1200);
    }

    els.btnMpesa.addEventListener("click", function () {
        selectMethod("mpesa");
    });
    els.btnCard.addEventListener("click", function () {
        selectMethod("card");
    });
    els.phoneInput.addEventListener("input", function (event) {
        event.target.value = event.target.value.replace(/[^\d\s]/g, "").slice(0, 11);
    });
    els.cardNumberInput.addEventListener("input", function (event) {
        var digits = event.target.value.replace(/\D/g, "").slice(0, 16);
        event.target.value = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    });
    els.cardExpiryInput.addEventListener("input", function (event) {
        var digits = event.target.value.replace(/\D/g, "").slice(0, 4);
        event.target.value =
            digits.length > 2 ? digits.slice(0, 2) + "/" + digits.slice(2) : digits;
    });
    els.cardCvvInput.addEventListener("input", function (event) {
        event.target.value = event.target.value.replace(/\D/g, "").slice(0, 4);
    });
    els.paymentForm.addEventListener("submit", handlePaymentSubmit);

    renderSummary();
    selectMethod("mpesa");
});
