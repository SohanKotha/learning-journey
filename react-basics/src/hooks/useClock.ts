import { useState, useEffect } from "react";

function useClock() {

    const [time, setTime] = useState(new Date());

    // updating time every second
    useEffect(() => {

        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // stopping timer when component closes
        return () => clearInterval(timer);

    }, []);

    return time;
}

export default useClock;