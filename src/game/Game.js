import Board from "./Board";
import { useRef, useState } from 'react';

const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isFirstTurn, setFirstTurn] = useState(true);
    let result = useRef(null);

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const handleClick = (index) => {
        if (squares[index] !== null) {
            return;
        }

        setSquares(previousArr => {
            const newSquares = previousArr.slice();
            newSquares[index] = findSign();
            const winner = calculateWinner(newSquares, lines);
            if (winner) {
                result.current = winner;
            }
            return newSquares;
        });
        setFirstTurn(prevTurn => !prevTurn);
    };

    const calculateWinner = (squares, lines) => {
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return lines[i];
            }
        }
        return null;
    };

    const findSign = () => isFirstTurn ? 'X' : 'O';

    const findPreviousSign = () => isFirstTurn ? 'O' : 'X';

    const isDraw = () => !squares.includes(null) && result.current === null;

    const isWinSomeone = () => Boolean(result.current);

    const isGameFinished = () => isDraw() || isWinSomeone();

    const createTitle = () => {
        if (isDraw()) {
            return 'Draw';
        }
        if (isWinSomeone()) {
            return `Winner: ${findPreviousSign()}`;
        }
        return `Next player: ${findSign()}`;
    }

    return (
        <>
            <h2>{createTitle()}</h2>
            <Board
                disabled={isGameFinished()}
                answer={result.current}
                handleClick={handleClick}
                squares={squares}
            />
        </>
    );
};

export default Game;