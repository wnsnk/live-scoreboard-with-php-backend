export default class HistoryWriter {
    constructor() {}

    // SCORE
    documentScoreChange(teamName, totalScore, points) {
        const message = `Update score ${teamName}:\nPoints added: ${points}\nNew score: ${totalScore}`;
        this.updateHistory(this.createObject(message));
    }

    // TIMER
    documentTimerStart(minutes, seconds) {
        const message = `Timer started at ${minutes}:${seconds}`;
        this.updateHistory(this.createObject(message));
    }

    documentTimerEnd(totalMins) {
        const message = `${totalMins} minute timer ended!`;
        this.updateHistory(this.createObject(message));
    }

    documentTimerReset() {
        const message = `Timer reset.`;
        this.updateHistory(this.createObject(message));
    }
    // SETTINGS: CLOCK
    documentTimerSaved(timeInMinutes) {
        const message = `Timer updated: ${timeInMinutes} minutes.`;
        this.updateHistory(this.createObject(message));
    }
    // SETTINGS: TEAM
    documentTeamAdded(teamName) {
        const message = `Team added: ${teamName}`;
        this.updateHistory(this.createObject(message));
    }

    documentTeamRemoved(teamName) {
        const message = `Team removed: ${teamName}`;
        this.updateHistory(this.createObject(message));
    }

    documentTeamsSaved() {
        const message = `Teams saved.`;
        this.updateHistory(this.createObject(message));
    }

    createObject(msg) {
        return {
            time: new Date().getTime(),
            message: msg,
        };
    }

    updateHistory = async function (object) {
        const response = await fetch('/api/POST/history.php', {
            method: 'POST',
            body: JSON.stringify(object),
            headers: { 'Content-type': 'application/json' },
        });
    };
}
