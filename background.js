chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "send-notification") {
        const notificationMessage = message.text || "L'automate a un message pour toi 🎉";

        console.log(`Receiving notification request : ${notificationMessage}`)


        //chrome.tabs.create({ url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"});

        chrome.notifications.create({
            type: "basic",
            iconUrl: chrome.runtime.getURL("logo.png"),
            title: "Inscription Estivales !",
            message: notificationMessage
        }, (notifId) => {
            if (chrome.runtime.lastError) {
                console.error("Erreur lors de la notif :", chrome.runtime.lastError.message);
            } else {
                console.log("Notification OK, ID :", notifId);
            }
        });
    }
});