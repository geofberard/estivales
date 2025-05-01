console.log("Service Worker actif !");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "send-notification") {
        console.log("notification")
        //chrome.tabs.create({ url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"});

        chrome.notifications.create({
            type: "basic",
            iconUrl: chrome.runtime.getURL("icon.png"),
            title: "Coucou !",
            message: "Notification depuis le Service Worker 🎉"
        }, (notifId) => {
            if (chrome.runtime.lastError) {
                console.error("Erreur lors de la notif :", chrome.runtime.lastError.message);
            } else {
                console.log("Notification OK, ID :", notifId);
            }
        });
    }
});