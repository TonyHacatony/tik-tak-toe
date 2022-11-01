const GameTitle = (props) => {

    const createTitle = () => {
        if (props.isDraw) {
            return 'Draw';
        }
        if (props.isWinSomeone) {
            return `Winner: ${props.winnerSign}`;
        }
        return `Next player: ${props.nextStepSign}`;
    }

    return (
        <h2>{createTitle()}</h2>
    );
};

export default GameTitle;