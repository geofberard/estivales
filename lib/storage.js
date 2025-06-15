const FIELDS = {
    firstname: {id: 'firstname', label: 'Prénom', defaultValue: ''},
    lastname: {id: 'lastname', label: 'Nom', defaultValue: ''},
    email: {id: 'email', label: 'Email', defaultValue: ''},
    phone: {id: 'phone', label: 'Téléphone', defaultValue: ''},
    teamName: {id: 'teamName', label: 'Nom de l\'équipe', defaultValue: '', details: "20 caractères max"},
    player1Firstname: {id: 'player1Firstname', label: 'Prénom', defaultValue: ''},
    player1Lastname: {id: 'player1Lastname', label: 'Nom', defaultValue: ''},
    player1Level: {id: 'player1Level', label: 'Niveau', defaultValue: '', details: "Valeur qui apparait dans la liste"},
    player1City: {id: 'player1City', label: 'Ville', defaultValue: ''},
    player1Zip: {id: 'player1Zip', label: 'Département', defaultValue: ''},
    player1Birthday: {id: 'player1Birthday', label: 'Date de naissance', defaultValue: '', details: "jj/mm/aaaa"},
    player2Firstname: {id: 'player2Firstname', label: 'Prénom', defaultValue: ''},
    player2Lastname: {id: 'player2Lastname', label: 'Nom', defaultValue: ''},
    player2Level: {id: 'player2Level', label: 'Niveau', defaultValue: '', details: "Valeur qui apparait dans la liste"},
    player2City: {id: 'player2City', label: 'Ville', defaultValue: ''},
    player2Zip: {id: 'player2Zip', label: 'Département', defaultValue: ''},
    player2Birthday: {id: 'player2Birthday', label: 'Date de naissance ', defaultValue: '', details: "jj/mm/aaaa"},
    player3Firstname: {id: 'player3Firstname', label: 'Prénom', defaultValue: ''},
    player3Lastname: {id: 'player3Lastname', label: 'Nom', defaultValue: ''},
    player3Level: {id: 'player3Level', label: 'Niveau', defaultValue: '', details: "Valeur qui apparait dans la liste"},
    player3City: {id: 'player3City', label: 'Ville', defaultValue: ''},
    player3Zip: {id: 'player3Zip', label: 'Département', defaultValue: ''},
    player3Birthday: {id: 'player3Birthday', label: 'Date de naissance', defaultValue: '', details: "jj/mm/aaaa"},
    player4Firstname: {id: 'player4Firstname', label: 'Prénom', defaultValue: ''},
    player4Lastname: {id: 'player4Lastname', label: 'Nom', defaultValue: ''},
    player4Level: {id: 'player4Level', label: 'Niveau', defaultValue: '', details: "Valeur qui apparait dans la liste"},
    player4City: {id: 'player4City', label: 'Ville', defaultValue: ''},
    player4Zip: {id: 'player4Zip', label: 'Département', defaultValue: ''},
    player4Birthday: {id: 'player4Birthday', label: 'Date de naissance', defaultValue: '', details: "jj/mm/aaaa"},
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