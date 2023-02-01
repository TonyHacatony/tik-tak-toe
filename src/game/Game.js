import './Game.css';
import Board from './Board';
import { useRef, useState } from 'react';
import HistoryPicker from './HistoryPicker';
import GameInfo from './GameInfo';

const Game = () => {
    const cellsCount = 9;
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

    const defaultHistory = [Array(cellsCount).fill(null)];
    const defaultStep = 0
    const defaultResult = null;

    const [history, setHistory] = useState(defaultHistory);
    const [step, setStep] = useState(defaultStep);
    let result = useRef(defaultResult);

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

    const restartGame = () => {
        setHistory(defaultHistory);
        setStep(defaultStep);
        result.current = defaultResult;
    };

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
                <GameInfo
                    isDraw={isDraw()}
                    isWinSomeone={isWinSomeone()}
                    winnerSign={findWinnerSign()}
                    nextStepSign={findNextStepSign()}
                    restartGame={restartGame}
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
