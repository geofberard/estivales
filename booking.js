function sendNotification(message) {
    chrome.runtime.sendMessage({action: "send-notification", text: message});
}

let SELECTOR_STEP_1_TICKETS = '[data-testid="tab-prices"].NavStep.NavStep-Current';
let SELECTOR_STEP_2_MEMBERS = '[data-testid="tab-members"].NavStep.NavStep-Current';
let SELECTOR_STEP_3_CONTACT = '[data-testid="tab-payer"].NavStep.NavStep-Current';
let SELECTOR_STEP_4_SUMMARY = '[data-testid="tab-summary"].NavStep.NavStep-Current';
let SELECTOR_STEP_4_PRICE = '.price-container__price';
let SELECTOR_CONTRIBUTION_BUTTON = '[data-testid="button-change-contribution"]';
let SELECTOR_CONTRIBUTION = '.contribution-modal-modify';
let SELECTOR_NEXT_BUTTON = '[data-test="button-next-step"]:not(.ValidatingButton):not([disabled])';
let SELECTOR_TICKET_QUANTITY = '[data-test="input-quantity"]';
let SELECTOR_ADD_TICKET = '[data-test="button-plus"]';

readFromStorage(data => {
    log("Info", "Loaded from storage", data);

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

        setInputValue("Prénom", data[FIELDS.firstname.id])
        setInputValue("Nom", data[FIELDS.lastname.id])
        setInputValue("NOM DE L'EQUIPE", data[FIELDS.teamName.id])
        setInputValue("N° de mobile pour pouvoir", data[FIELDS.phone.id])

        setInputValue(["JOUEUSE 1 - NOM PRENOM", "JOUEUR 1 - NOM PRENOM"], data[FIELDS.player1Lastname.id] + " " + data[FIELDS.player1Firstname.id])
        setSelectValue(["JOUEUSE 1 - NIVEAU", "JOUEUR 1 - NIVEAU"], data[FIELDS.player1Level.id])
        setInputValue(["JOUEUSE 1 - VILLE", "JOUEUR 1 - VILLE"], data[FIELDS.player1City.id])
        setInputValue(["JOUEUSE 1 - DEPARTEMENT", "JOUEUR 1 - DEPARTEMENT"], data[FIELDS.player1Zip.id])
        setInputValue(["JOUEUSE 1 - DATE DE NAISSANCE", "JOUEUR 1 - DATE DE NAISSANCE"], data[FIELDS.player1Birthday.id])

        setInputValue(["JOUEUSE 2 - NOM PRENOM", "JOUEUR 2 - NOM PRENOM"], data[FIELDS.player2Lastname.id] + " " + data[FIELDS.player2Firstname.id])
        setSelectValue(["JOUEUSE 2 - NIVEAU", "JOUEUR 2 - NIVEAU"], data[FIELDS.player2Level.id])
        setInputValue(["JOUEUSE 2 - VILLE", "JOUEUR 2 - VILLE"], data[FIELDS.player2City.id])
        setInputValue(["JOUEUSE 2 - DEPARTEMENT", "JOUEUR 2 - DEPARTEMENT"], data[FIELDS.player2Zip.id])
        setInputValue(["JOUEUSE 2 - DATE DE NAISSANCE", "JOUEUR 2 - DATE DE NAISSANCE"], data[FIELDS.player2Birthday.id])

        setInputValue(["JOUEUSE 3 - NOM PRENOM", "JOUEUR 3 - NOM PRENOM"], data[FIELDS.player3Lastname.id] + " " + data[FIELDS.player3Firstname.id])
        setSelectValue(["JOUEUSE 3 - NIVEAU", "JOUEUR 3 - NIVEAU"], data[FIELDS.player3Level.id])
        setInputValue(["JOUEUSE 3 - VILLE", "JOUEUR 3 - VILLE"], data[FIELDS.player3City.id])
        setInputValue(["JOUEUSE 3 - DEPARTEMENT", "JOUEUR 3 - DEPARTEMENT"], data[FIELDS.player3Zip.id])
        setInputValue(["JOUEUSE 3 - DATE DE NAISSANCE", "JOUEUR 3 - DATE DE NAISSANCE"], data[FIELDS.player3Birthday.id])

        clickButtonUntilStepChanges({
            currentStep: "Team",
            currentStepSelector: SELECTOR_STEP_2_MEMBERS,
            buttonSelector: SELECTOR_NEXT_BUTTON
        });
    });

    detectElement(SELECTOR_STEP_3_CONTACT, (addButton) => {
        log("Info", "Contact", "Detected");

        setInputValue("Prénom", data[FIELDS.firstname.id])
        setInputValue("Nom", data[FIELDS.lastname.id])
        setInputValue("Email", data[FIELDS.email.id])
        setInputValue("Confirmation Email", data[FIELDS.email.id], true)

        clickButtonUntilStepChanges({
            currentStep: "Contact",
            currentStepSelector: SELECTOR_STEP_3_CONTACT,
            buttonSelector: SELECTOR_NEXT_BUTTON
        });
    });

    detectElement(SELECTOR_STEP_4_SUMMARY, () => {
        log("Info", "Summary", "Detected");

        detectElement(SELECTOR_STEP_4_PRICE, () => {
            setCheckboxValue("J'accepte le document suivant", true)
            setCheckboxValue("J'ai compris que HelloAsso", true)
            setCheckboxValue("J'accepte les", true)
            detectElement(SELECTOR_CONTRIBUTION_BUTTON, () => {
                clickButton("button-change-contribution")
                detectElement(SELECTOR_CONTRIBUTION, () => {
                    setInputValue("votre soutien :", data[FIELDS.contribution.id])
                    clickButton("button-save")
                    // clickButtonUntilStepChanges({
                    //     currentStep: "Summary",
                    //     currentStepSelector: SELECTOR_STEP_4_SUMMARY,
                    //     buttonSelector: SELECTOR_NEXT_BUTTON
                    // });
                    sendNotification("C'est bon, il n'y a plus qu'a payer 💰");
                })
            })
        })

    });
});

