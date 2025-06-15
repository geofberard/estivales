const LEVELS = {
    Info: 'Info',
    Warning: 'Warn',
    Error: 'Err'
};

const PAD_STEP = 7;     // Pour aligner les noms d'étapes

function log(level, stepName, message, details = "") {
    const stepStr = `${stepName}`.padEnd(PAD_STEP, ' ');
    const finalMessage = `[Estivales] ${stepStr} :`;

    switch (level) {
        case LEVELS.Info:
            console.info(finalMessage, message, details);
            break;
        case LEVELS.Warning:
            console.warn(finalMessage, message, details);
            break;
        case LEVELS.Error:
            console.error(finalMessage, message, details);
            break;
        default:
            console.log(finalMessage, message, details);
    }
}