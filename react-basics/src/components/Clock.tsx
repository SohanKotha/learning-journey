import { useEffect, useState } from "react";

function Clock() {

    const [time, setTime] = useState(new Date());

    useEffect(() => {

        // updating time every second
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // stopping timer when component is removed
        return () => {
            clearInterval(timer);
        };

    }, []);

    return (
        <div>
            <h2>Current Time</h2>
            <p>{time.toLocaleTimeString()}</p>
        </div>
    );
}

export default Clock;
