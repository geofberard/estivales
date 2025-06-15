function renderFormFields() {
    const container = document.getElementById('fields-container');
    container.classList.add('form-container');

    const playerFields = [1, 2, 3, 4];
    const isPlayerField = key => /^player\d/.test(key);

    // 1. Champs généraux
    Object.entries(FIELDS).forEach(([key, { id, label, details }]) => {
        if (!isPlayerField(key)) {
            const field = createFormField(id, label, details);
            container.appendChild(field);
        }
    });

    // 2. Blocs joueurs
    playerFields.forEach(playerNum => {
        const playerSection = document.createElement('div');
        playerSection.classList.add('form-section');

        const title = document.createElement('h3');
        title.textContent = `Joueur·euse ${playerNum}`;
        playerSection.appendChild(title);

        Object.entries(FIELDS).forEach(([key, { id, label, details }]) => {
            if (key.startsWith(`player${playerNum}`)) {
                const field = createFormField(id, label, details);
                playerSection.appendChild(field);
            }
        });

        container.appendChild(playerSection);
    });
}

function createFormField(id, label, details) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('form-field');

    const labelEl = document.createElement('label');
    labelEl.setAttribute('for', id);
    labelEl.textContent = label;
    labelEl.classList.add('form-label');

    const helpEl = document.createElement('span');
    helpEl.classList.add('form-help');
    helpEl.textContent = `(${details})`;

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.id = id;
    inputEl.classList.add('form-input');

    wrapper.appendChild(labelEl);
    if (details) labelEl.appendChild(helpEl);
    wrapper.appendChild(inputEl);

    return wrapper;
}

// // Rendu des champs du formulaire
// function renderFormFields() {
//     const container = document.getElementById('fields-container');
//     container.classList.add('form-container'); // Ajout de classe CSS pour le style général
//
//     ALL_FIELDS.forEach(({ id, label }) => {
//         const wrapper = document.createElement('div');
//         wrapper.classList.add('form-field'); // Style type Material UI field
//
//         const labelEl = document.createElement('label');
//         labelEl.setAttribute('for', id);
//         labelEl.textContent = label;
//         labelEl.classList.add('form-label');
//
//         const inputEl = document.createElement('input');
//         inputEl.type = 'text';
//         inputEl.id = id;
//         inputEl.classList.add('form-input');
//
//         wrapper.appendChild(labelEl);
//         wrapper.appendChild(inputEl);
//         container.appendChild(wrapper);
//     });
// }

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