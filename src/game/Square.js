import './Square.css';

const Square = (props) => {

    const handleClick = () => {
        props.handleClick(props.index);
    };

    return (
        <button
            className={`square ${props.rightAnswer ? 'green' : ''}`}
            onClick={handleClick}
            disabled={props.disabled}
        >
            {props.value}
        </button >
    );
};

export default Square;