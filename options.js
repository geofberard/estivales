

// Rendu des champs du formulaire
function renderFormFields() {
    const container = document.getElementById('fields-container');
    container.classList.add('form-container'); // Ajout de classe CSS pour le style général

    ALL_FIELDS.forEach(({ id, label }) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('form-field'); // Style type Material UI field

        const labelEl = document.createElement('label');
        labelEl.setAttribute('for', id);
        labelEl.textContent = label;
        labelEl.classList.add('form-label');

        const inputEl = document.createElement('input');
        inputEl.type = 'text';
        inputEl.id = id;
        inputEl.classList.add('form-input');

        wrapper.appendChild(labelEl);
        wrapper.appendChild(inputEl);
        container.appendChild(wrapper);
    });
}

// Form utils
function getFormValues() {
    const values = {};
    ALL_FIELDS.forEach(({ id }) => {
        values[id] = document.getElementById(id).value.trim();
    });
    return values;
}

function setFormValues(values) {
    ALL_FIELDS.forEach(({ id }) => {
        if (values[id] !== undefined) {
            document.getElementById(id).value = values[id];
        }
    });
}

// Chargement initial
function loadSettings() {
    readFromStorage(setFormValues);
}

// Sauvegarde depuis le formulaire
function saveSettings(event) {
    event.preventDefault();
    const data = getFormValues();
    writeToStorage(data, () => {
        const status = document.getElementById('status');
        status.textContent = 'Sauvegardé !';
        setTimeout(() => status.textContent = '', 1500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderFormFields();
    loadSettings();
    document.getElementById('settings-form').addEventListener('submit', saveSettings);
});