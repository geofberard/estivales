const FIELDS = {
    firstname: {id: 'firstName', label: 'Prénom', defaultValue: ''},
    lastName: {id: 'lastName', label: 'Nom', defaultValue: ''},
    email: {id: 'email', label: 'Email', defaultValue: ''},
}

const ALL_FIELDS = Object.values(FIELDS);

function getDefaultFieldValues() {
    const defaults = {};
    ALL_FIELDS.forEach(({id, defaultValue}) => {
        defaults[id] = defaultValue;
    });
    return defaults;
}

function readFromStorage(callback) {
    chrome.storage.local.get(getDefaultFieldValues(), (result) => {
        callback(result);
    });
}

function writeToStorage(values, callback) {
    chrome.storage.local.set(values, callback);
}