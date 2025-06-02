const LEVELS = {
    Info: 'Info',
    Warning: 'Warn',
    Error: 'Err'
};

const PAD_STEP = 12;     // Pour aligner les noms d'étapes

function log(level, stepName, message) {
    const stepStr = `${stepName}`.padEnd(PAD_STEP, ' ');
    const finalMessage = `[Estivales] ${stepStr} :`;

    switch (level) {
        case LEVELS.Info:
            console.info(finalMessage, message);
            break;
        case LEVELS.Warning:
            console.warn(finalMessage, message);
            break;
        case LEVELS.Error:
            console.error(finalMessage, message);
            break;
        default:
            console.log(finalMessage, message);
    }
}