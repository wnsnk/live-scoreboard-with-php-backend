export const updateScore = async function (teamId, newScore) {
    const response = await fetch('/api/POST/update_score.php', {
        method: 'POST',
        body: JSON.stringify({
            id: teamId,
            score: newScore,
        }),
        headers: { 'Content-type': 'application/json' },
    });
};
