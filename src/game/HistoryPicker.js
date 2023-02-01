const HistoryPicker = (props) => {

    const jumpTo = (step) => {
        props.setStep(step);
    }

    const moves = props.history.map((sqares, step) => {
        const desc = step ?
            'Go to move #' + step :
            'Go to game start';
        return (
            <li key={step}>
                <button onClick={() => jumpTo(step)}>{desc}</button>
            </li>
        );
    });

    return (
        <>
            <p>History</p>
            <ol>{moves}</ol>
        </>
    );
};

export default HistoryPicker;
