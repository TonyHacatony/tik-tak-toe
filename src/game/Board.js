import Square from "./Square";
import './Board.css';

const Board = (props) => {
    const size = 3; //mean 3x3
    let increment = 0;

    const createSquares = () => {
        const squares = [];
        for (let i = 0; i < size; i++) {
            const rightAnswer = props.answer !== null && props.answer.includes(increment);
            squares.push(
                <Square
                    disabled={props.disabled}
                    rightAnswer={rightAnswer}
                    value={props.squares[increment]}
                    index={increment}
                    key={`sq_${increment}`}
                    handleClick={props.handleClick}
                />
            );
            increment++;
        }
        return squares;
    };

    const createRows = () => {
        const rows = []
        for (let i = 0; i < size; i++) {
            rows.push(
                <div className="row" key={`row_${i}`}>
                    {createSquares()}
                </div>
            );
        }
        return rows;
    };

    return (
        <div className="board">
            {createRows()}
        </div>
    );
};

export default Board;