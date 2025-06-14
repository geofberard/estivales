const FIELDS = {
    firstname: {id: 'firstName', label: 'Prénom', defaultValue: ''},
    lastname: {id: 'lastname', label: 'Nom', defaultValue: ''},
    email: {id: 'email', label: 'Email', defaultValue: ''},
    phone: {id: 'phone', label: 'Téléphone', defaultValue: ''},
    teamName: {id: 'teamName', label: 'Nom de l\'équipe', defaultValue: ''},
    player1Firstname: {id: 'player1Firstname', label: 'Joueur·euse 1 - Prénom', defaultValue: ''},
    player1Lastname: {id: 'player1Lastname', label: 'Joueur·euse 1 - Nom', defaultValue: ''},
    player1Level: {id: 'player1Level', label: 'Joueur·euse 1 - Niveau', defaultValue: ''},
    player1City: {id: 'player1City', label: 'Joueur·euse 1 - Ville', defaultValue: ''},
    player1Zip: {id: 'player1Zip', label: 'Joueur·euse 1 - Département', defaultValue: ''},
    player2Firstname: {id: 'player2Firstname', label: 'Joueur·euse 2 - Prénom', defaultValue: ''},
    player2Lastname: {id: 'player2Lastname', label: 'Joueur·euse 2 - Nom', defaultValue: ''},
    player2Level: {id: 'player2Level', label: 'Joueur·euse 2 - Niveau', defaultValue: ''},
    player2City: {id: 'player2City', label: 'Joueur·euse 2 - Ville', defaultValue: ''},
    player2Zip: {id: 'player2Zip', label: 'Joueur·euse 2 - Département', defaultValue: ''},
    player3Firstname: {id: 'player3Firstname', label: 'Joueur·euse 3 - Prénom', defaultValue: ''},
    player3Lastname: {id: 'player3Lastname', label: 'Joueur·euse 3 - Nom', defaultValue: ''},
    player3Level: {id: 'player3Level', label: 'Joueur·euse 3 - Niveau', defaultValue: ''},
    player3City: {id: 'player3City', label: 'Joueur·euse 3 - Ville', defaultValue: ''},
    player3Zip: {id: 'player3Zip', label: 'Joueur·euse 3 - Département', defaultValue: ''},
    contribution: {id: 'contribution', label: 'Contribution HelloAsso', defaultValue: '0'},
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