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
        selectedMethod: "mpesa",
        pendingMpesa: null
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
        var phone = els.phoneInput.value.replace(/\D/g, "");

        if (phone.startsWith("254") && phone.length === 12) {
            phone = phone.substring(3);
        } else if (phone.startsWith("0") && phone.length === 10) {
            phone = phone.substring(1);
        }

        if (!/^[17]\d{8}$/.test(phone)) {
            showError(
                "Enter a valid M-Pesa number, such as 712 345 678.",
                els.phoneInput
            );
            return null;
        }

        return "254" + phone;
    }

    async function readApiResponse(response) {
        var result;

        try {
            result = await response.json();
        } catch (error) {
            throw new Error("The payment server returned an invalid response.");
        }

        if (!response.ok) {
            throw new Error(result.message || "The payment request could not be completed.");
        }

        return result;
    }

    function wait(milliseconds) {
        return new Promise(function (resolve) {
            window.setTimeout(resolve, milliseconds);
        });
    }

    function resetPayButton() {
        els.payBtn.disabled = false;
        els.payBtnIcon.classList.remove("animate-spin");
        els.payBtnIcon.textContent = "arrow_forward";
        els.payBtnText.textContent = "Pay " + state.amountText + " with M-Pesa";
    }

    async function handlePaymentSubmit(event) {
        event.preventDefault();
        clearError();

        if (state.selectedMethod !== "mpesa") {
            showError("Card payments are not available yet. Choose M-Pesa to continue.");
            return;
        }

        var phoneNumber = validatePayment();
        if (!phoneNumber) return;

        els.payBtn.disabled = true;
        els.payBtnIcon.textContent = "sync";
        els.payBtnIcon.classList.add("animate-spin");
        els.payBtnText.textContent = "Sending M-Pesa prompt...";

        var apiBaseUrl = state.apiBaseUrl.replace(/\/$/, "");

        try {
            var startResponse = await fetch(apiBaseUrl + "/pay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: viewingFee,
                    phoneNumber: phoneNumber
                })
            });
            var startResult = await readApiResponse(startResponse);
            var reference = startResult.reference;

            if (!reference) {
                throw new Error("The payment server did not return a transaction reference.");
            }

            els.payBtnText.textContent = "Check your phone and enter your M-Pesa PIN...";

            var deadline = Date.now() + 120000;
            var lastStatusError = null;

            while (Date.now() < deadline) {
                await wait(3000);

                var statusResult;
                try {
                    var statusResponse = await fetch(
                        apiBaseUrl + "/status/" + encodeURIComponent(reference),
                        { headers: { "Accept": "application/json" } }
                    );
                    statusResult = await readApiResponse(statusResponse);
                    lastStatusError = null;
                } catch (error) {
                    lastStatusError = error;
                    continue;
                }

                var paymentStatus = String(statusResult.status || "").toUpperCase();

                if (paymentStatus === "COMPLETED" || paymentStatus === "SUCCESS") {
                    var receiptParams = new URLSearchParams({
                        type: "payment",
                        amount: state.amountText,
                        txId: statusResult.receiptNumber || reference,
                        property: state.propertyName,
                        method: "M-Pesa"
                    });

                    window.location.assign("success.html?" + receiptParams.toString());
                    return;
                }

                if (
                    paymentStatus === "FAILED" ||
                    paymentStatus === "CANCELLED" ||
                    paymentStatus === "CANCELED"
                ) {
                    throw new Error("The M-Pesa payment failed or was cancelled. You can try again.");
                }

                if (paymentStatus !== "PENDING") {
                    throw new Error(
                        "The server returned an unexpected payment status: " + paymentStatus
                    );
                }

                els.payBtnText.textContent = "Waiting for M-Pesa confirmation...";
            }

            if (lastStatusError) {
                throw new Error(
                    "We could not confirm the payment status. Check your M-Pesa messages or contact support before retrying."
                );
            }

            throw new Error(
                "Payment is still pending. Check your M-Pesa messages before retrying to avoid paying twice."
            );
        } catch (error) {
            showError(error.message || "Could not process the payment. Please try again.");
            resetPayButton();
        }
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
