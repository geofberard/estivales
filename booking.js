function sendNotification(message) {
    chrome.runtime.sendMessage({action: "send-notification", text: message});
}

let SELECTOR_STEP_1_TICKETS = '[data-testid="tab-prices"].NavStep.NavStep-Current';
let SELECTOR_STEP_2_MEMBERS = '[data-testid="tab-members"].NavStep.NavStep-Current';
let SELECTOR_STEP_3_CONTACT = '[data-testid="tab-payer"].NavStep.NavStep-Current';
let SELECTOR_STEP_4_SUMMARY = '[data-testid="tab-summary"].NavStep.NavStep-Current';
let SELECTOR_STEP_4_PRICE = '.price-container__price';
let SELECTOR_NEXT_BUTTON = '[data-test="button-next-step"]:not(.ValidatingButton):not([disabled])';
let SELECTOR_TICKET_QUANTITY = '[data-test="input-quantity"]';
let SELECTOR_ADD_TICKET = '[data-test="button-plus"]';

detectElement(SELECTOR_STEP_1_TICKETS, () => {
    log("Info", "Tickets", "Detected");

    detectElement(SELECTOR_TICKET_QUANTITY, (ticket_quantity) => {
        log("Info", "Tickets", `Number of tickets in the cart : ${ticket_quantity.value}`);
        if (ticket_quantity.value !== "1") {

            const addButton = document.querySelector(SELECTOR_ADD_TICKET);
            if (addButton) {
                log("Info", "Tickets", "Adding on ticket to cart");
                addButton.click();


            } else {
                log("Err", "Tickets", "Cannot add ticket to cart");
            }
        } else {
            log("Info", "Tickets", "No more ticket required");
        }

        clickButtonUntilStepChanges({
            currentStep: "Tickets",
            currentStepSelector: SELECTOR_STEP_1_TICKETS,
            buttonSelector: SELECTOR_NEXT_BUTTON
        });
    });
});

detectElement(SELECTOR_STEP_2_MEMBERS, () => {
    log("Info", "Team", "Detected");

    setInputValue("Prénom", "Buzz")
    setInputValue("Nom", "Lightyear")
    setInputValue("Poids", "75")
    setSelectValue("Catégorie d'age", "U13")

    clickButtonUntilStepChanges({
        currentStep: "Team",
        currentStepSelector: SELECTOR_STEP_2_MEMBERS,
        buttonSelector: SELECTOR_NEXT_BUTTON
    });
});

detectElement(SELECTOR_STEP_3_CONTACT, (addButton) => {
    log("Info", "Contact", "Detected");

    setInputValue("Prénom", "Geoffrey")
    setInputValue("Nom", "Berard")
    setInputValue("Email", "geoffrey.berard@gmail.com")
    setInputValue("Confirmation Email", "geoffrey.berard@gmail.com", true)

    clickButtonUntilStepChanges({
        currentStep: "Contact",
        currentStepSelector: SELECTOR_STEP_3_CONTACT,
        buttonSelector: SELECTOR_NEXT_BUTTON
    });
});

detectElement(SELECTOR_STEP_4_SUMMARY, () => {
    log("Info", "Summary", "Detected");

    detectElement(SELECTOR_STEP_4_PRICE, () => {
        setCheckboxValue("J'ai compris que HelloAsso", true)
        setCheckboxValue("J'accepte les", true)
    })

    sendNotification("C'est bon, il n'y a plus qu'a payer 💰");
});