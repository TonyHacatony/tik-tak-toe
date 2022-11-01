import Title from "./Title";

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
        <Title>{createTitle()}</Title>
    );
};

export default GameTitle;