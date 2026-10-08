/**
 * sends a POST request to update the score.
 * @param {number} teamId - The id of the team that needs to be updated.
 * @param {number} newScore - The updated new score.
 */
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
