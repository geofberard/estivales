const LEVELS = {
    Info: 'Info',
    Warning: 'Warn',
    Error: 'Err'
};

const PAD_LEVEL = 4;     // Pour aligner [Info], [Error], etc.
const PAD_STEP = 7;     // Pour aligner les noms d'étapes

function log(level, stepName, message) {
    const levelStr = `[${level}]`.padEnd(PAD_LEVEL, ' ');
    const stepStr = `${stepName}`.padEnd(PAD_STEP, ' ');
    const finalMessage = `${levelStr} Estivales - ${stepStr} : ${message}`;

    switch (level) {
        case LEVELS.Info:
            console.info(finalMessage);
            break;
        case LEVELS.Warning:
            console.warn(finalMessage);
            break;
        case LEVELS.Error:
            console.error(finalMessage);
            break;
        default:
            console.log(finalMessage);
    }
}

function sendNotification() {
    chrome.runtime.sendMessage({ action: "send-notification" });
}

function detectElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
      callback(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const newElement = document.querySelector(selector);
      if (newElement) {
        callback(newElement);
        observer.disconnect();
      }
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
}

log("Initializing Plugin");

let SELECTOR_STEP_1_TICKETS = '[data-testid="tab-prices"].NavStep.NavStep-Current';
let SELECTOR_STEP_2_MEMBERS = '[data-testid="tab-members"].NavStep.NavStep-Current';
let SELECTOR_STEP_3_CONTACT = '[data-testid="tab-payer"].NavStep.NavStep-Current';
let SELECTOR_STEP_4_SUMMARY = '[data-testid="tab-summary"].NavStep.NavStep-Current';
let SELECTOR_NEXT_BUTTON = '[data-test="button-next-step"]:not(.ValidatingButton)';

log("Info", "Tickets", "Waiting");
detectElement(SELECTOR_STEP_1_TICKETS, (addButton) => {
    log("Info", "Tickets", "Detected");
    detectElement('[data-test="button-plus"]', (addButton) => {
        if(addButton) {
            log("Info", "Tickets", "Adding to cart");
            addButton.click();

            detectElement(SELECTOR_NEXT_BUTTON, (nextStep) => {
                log("Info", "Tickets", "Proceeding to next step");
                nextStep.click();
            });
        }
    });
});

log("Info", "Team", "Waiting");
detectElement(SELECTOR_STEP_2_MEMBERS, (addButton) => {
    log("Info", "Team", "Detected");
    sendNotification();
});

log("Info", "Contact", "Waiting");
detectElement(SELECTOR_STEP_3_CONTACT, (addButton) => {
    log("Info", "Contact", "Detected");
    sendNotification()
});

log("Info", "Summary", "Waiting");
detectElement(SELECTOR_STEP_4_SUMMARY, (addButton) => {
    log("Info", "Summary", "Detected");
});