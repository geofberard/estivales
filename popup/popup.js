// Pages d'inscription des différents tournois
const baseUrl = "https://www.helloasso.com/associations/armor-volley-ball/evenements/"
const tournaments = [
    { name: "Sable D'or - Région M", url: "tournoi-regional-masculin-sables-d-or-frehel-19-et-20-juillet-2025"},
    { name: "Sable D'or - Région F", url: "tournoi-regional-feminin-sables-d-or-frehel-19-et-20-juillet-2025"},
    { name: "Erquy - Région M", url: "tournoi-regional-masculin-erquy-22-et-23-juillet-2025"},
    { name: "Erquy - Région F", url: "tournoi-regional-feminin-erquy-22-et-23-juillet-2025"},
    { name: "St Cast - Région M", url: "tournoi-regional-masculin-st-cast-25-et-26-juillet-2025"},
    { name: "St Cast - Région F", url: "tournoi-regional-feminin-st-cast-25-et-26-juillet-2025"}
];

console.log("Meh");

document.addEventListener("DOMContentLoaded", () => {
    const tournamentSelector = document.getElementById("tournaments");

    // Remplissage du select
    tournaments.forEach((tournament, index) => {
        const tournamentOption = document.createElement("option");
        tournamentOption.value = index;
        tournamentOption.textContent = tournament.name;
        tournamentSelector.appendChild(tournamentOption);
    });

    // Gestion du clic sur "Valider"
    tournamentSelector.addEventListener("change", () => {
        const selectedIndex = parseInt(tournamentSelector.value, 10);
        const tournament = tournaments[selectedIndex];
        if (tournament) {
            chrome.tabs.create({url: baseUrl + tournament.url});
        }
    });
});

chrome.storage.local.get({ USER_NAME: 'john' }, (result) => {
    const userName = result.USER_NAME;
    document.getElementById('greeting').textContent = `Bonjour ${userName}`;
});
