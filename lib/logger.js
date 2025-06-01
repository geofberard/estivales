const LEVELS = {
    Info: 'Info',
    Warning: 'Warn',
    Error: 'Err'
};

const PAD_STEP = 12;     // Pour aligner les noms d'étapes

function log(level, stepName, message) {
    const stepStr = `${stepName}`.padEnd(PAD_STEP, ' ');
    const finalMessage = `[Estivales] ${stepStr} : ${message}`;

    switch (level) {
        case LEVELS.Info:
            console.info(finalMessage);
            break;
        case LEVELS.Warning:
            console.warn(finalMessage);
            break;
        case LEVELS.Error:
            console.error(finalMessage);
            break;
        default:
            console.log(finalMessage);
    }
}