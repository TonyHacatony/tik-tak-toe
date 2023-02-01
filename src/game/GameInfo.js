const GameInfo = ({
    isDraw,
    isWinSomeone,
    winnerSign,
    nextStepSign,
    restartGame
}) => {

    const createTitle = () => {
        if (isDraw) {
            return 'Draw';
        }
        if (isWinSomeone) {
            return `Winner: ${winnerSign}`;
        }
        return `Next player: ${nextStepSign}`;
    }

    return (
        <>
            <h2>Game info</h2>
            <p>{createTitle()}</p>
            <button
                onClick={() => restartGame()}
                disabled={!Boolean(isDraw || isWinSomeone)}
            >
                Restart game
            </button>
        </>
    );
};

export default GameInfo;
