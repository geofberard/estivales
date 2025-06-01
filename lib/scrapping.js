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

    observer.observe(document.body, {childList: true, subtree: true});
}

function clickButtonUntilStepChanges({
                                         currentStep,
                                         currentStepSelector,
                                         buttonSelector,
                                         intervalMs = 1000
                                     }) {
    log("Info", currentStep, `Clicking next`);
    // Peut-être décommenté pour essayer de shortcut les validations de champs dans une page
    const targetButton = document.querySelector(buttonSelector);
    if (targetButton) {
        targetButton.click();
    }


    let intervalId = null;

    const observer = new MutationObserver(() => {
        if (!document.querySelector(currentStepSelector)) {
            log("Info", currentStep, "Step changed, stopping retries on next");
            clearInterval(intervalId);
            observer.disconnect();
        }
    });

    observer.observe(document.body, {childList: true, subtree: true});

    intervalId = setInterval(() => {
        const targetButton = document.querySelector(buttonSelector);
        if (targetButton) {
            log("Info", currentStep, `Retry : Clicking next`);
            targetButton.click();
        } else {
            log("Warn", currentStep, `Retry : Cannot find button`);
        }
    }, intervalMs);
}

function findFieldElement(labelText, failSilently) {
    const label = Array.from(document.querySelectorAll("label"))
        .find((lbl) => lbl.textContent.trim().startsWith(labelText));

    if (!label) {
        log(failSilently ? "Info" : "Warn", `Form - ${labelText}`, "Label not found");
        return null;
    }

    const fieldId = label.getAttribute("for");
    if (!fieldId) {
        log(failSilently ? "Info" : "Err", `Form - ${labelText}`, "Label does not have a 'for' attribute.");
        return null;
    }

    const field = document.getElementById(fieldId);
    if (!field) {
        log(failSilently ? "Info" : "Err", `Form - ${labelText}`, `Field with id "${fieldId}" not found for label`);
        return null;
    }

    return field;
}

function setInputValue(labelText, value, failSilently = false) {
    const input = findFieldElement(labelText, failSilently);

    if (!input || input.tagName.toLowerCase() !== "input") {
        !input || log(failSilently ? "Info" : "Err", `Form - ${labelText}`, "Input field not found or invalid");
        return;
    }

    log("Info", `Form - ${labelText}`, `Setting value to ${value}`);
    input.focus();
    input.value = value;
    input.dispatchEvent(new Event("input", {bubbles: true}));
    input.dispatchEvent(new Event("change", {bubbles: true}));
}

function setSelectValue(labelText, value, failSilently = false) {
    const select = findFieldElement(labelText, failSilently);

    if (!select || select.tagName.toLowerCase() !== "select") {
        !select || log(failSilently ? "Info" : "Err", `Form - ${labelText}`, "Select field not found or invalid");
        return;
    }

    const optionExists = Array.from(select.options).some(opt => opt.value === value);
    if (!optionExists) {
        log(failSilently ? "Info" : "Err", `Form - ${labelText}`, `Option "${value}" not found in select`);
        return;
    }

    log("Info", `Form - ${labelText}`, `Setting value to ${value}`);
    select.value = value;
    select.dispatchEvent(new Event("input", {bubbles: true}));
    select.dispatchEvent(new Event("change", {bubbles: true}));
}

function setCheckboxValue(labelText, isChecked, failSilently = false) {
    const checkbox = findFieldElement(labelText, failSilently);

    if (!checkbox || checkbox.type !== "checkbox") {
        !checkbox || log(failSilently ? "Info" : "Err", `Form - ${labelText}`, "Checkbox not found or invalid");
        return;
    }

    if (checkbox.checked !== isChecked) {
        log("Info", `Form - ${labelText}`, `Setting value to ${isChecked}`);
        checkbox.click(); // simule un vrai clic utilisateur
    } else {
        log("Info", `Form - ${labelText}`, `Already to ${isChecked}`);
    }
}