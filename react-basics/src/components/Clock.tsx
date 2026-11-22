import useClock from "../hooks/useClock";

function Clock() {

    const time = useClock();

    return (
        <div>
            <h2>Current Time</h2>
            <p>{time.toLocaleTimeString()}</p>
        </div>
    );
}

export default Clock;