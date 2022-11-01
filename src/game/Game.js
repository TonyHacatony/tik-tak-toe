import './Game.css';
import Board from './Board';
import { useRef, useState } from 'react';
import HistoryPicker from './HistoryPicker';
import GameTitle from './GameTitle';

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [step, setStep] = useState(0);
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
        if (getCurrentTurn()[index] !== null) {
            return;
        }

        setHistory(lastHistory => {
            const newSquares = getCurrentTurn(lastHistory).slice();
            newSquares[index] = findNextStepSign();
            const winner = calculateWinner(newSquares, lines);
            if (winner) {
                result.current = winner;
            }
            if (lastHistory.length - 1 !== step) {
                return lastHistory.slice(0, step + 1).concat([newSquares]);
            }
            return lastHistory.concat([newSquares]);
        });
        setStep(previousStep => previousStep + 1);
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

    const findNextStepSign = () => step % 2 === 0 ? 'X' : 'O';

    const findWinnerSign = () => history.length % 2 === 0 ? 'X' : 'O';

    const getCurrentTurn = (arr = history) => {
        if (arr) {
            return arr[step];
        }
        return arr;
    };

    const isDraw = () => !getCurrentTurn().includes(null) && result.current === null;

    const isWinSomeone = () => Boolean(result.current);

    const isGameFinished = () => isDraw() || isWinSomeone();

    return (
        <div className="game">
            <Board
                className="board"
                disabled={isGameFinished()}
                answer={result.current}
                handleClick={handleClick}
                squares={getCurrentTurn()}
            />
            <div className="game-info">
                <GameTitle
                    isDraw={isDraw()}
                    isWinSomeone={isWinSomeone()}
                    winnerSign={findWinnerSign()}
                    nextStepSign={findNextStepSign()}
                />
                <HistoryPicker
                    history={history}
                    setStep={setStep}
                />
            </div>
        </div>
    );
};

export default Game;