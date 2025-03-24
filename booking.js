function log(message) {
    console.log("Estivales - " + message)
}

function detectElement(selector, callback) {
    log('Looking for element ' + selector);
    const element = document.querySelector(selector); 
    if (element) {
      log('['+ selector + '] Already present !');
      callback(element);
      return;
    }

    log('['+ selector + '] Searching ...');
  
    const observer = new MutationObserver(() => {
      const newElement = document.querySelector(selector);
      if (newElement) {
        log('['+ selector + '] Detected !');
        callback(newElement);
        observer.disconnect();
      }
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
}

log("Initializing Plugin");

detectElement('[data-testid="tab-prices"].NavStep.NavStep-Current', (addButton) => {
    log("Etape Choix des billets");
});

detectElement('[data-testid="tab-members"].NavStep.NavStep-Current', (addButton) => {
    log("Etape Participants");
});

detectElement('[data-testid="tab-payer"].NavStep.NavStep-Current', (addButton) => {
    log("Etape Coordonnées");
});

detectElement('[data-testid="tab-summary"].NavStep.NavStep-Current', (addButton) => {
    log("Etape Récapitulatif");
});