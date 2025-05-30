// Charger la valeur existante
chrome.storage.local.get({ USER_NAME: 'john' }, (result) => {
    document.getElementById('username').value = result.USER_NAME;
});

// Enregistrer la nouvelle valeur
document.getElementById('save').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    chrome.storage.local.set({ USER_NAME: username }, () => {
        document.getElementById('status').textContent = 'Sauvegardé !';
        setTimeout(() => {
            document.getElementById('status').textContent = '';
        }, 1500);
    });
});