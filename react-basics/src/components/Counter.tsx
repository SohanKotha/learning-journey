
import { useState } from "react";

// trying counter with useState
function Counter() {
    const [count, setCount] = useState(0);

    const increase = () => {
        setCount(count + 1);
    };

    const decrease = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const reset = () => {
        setCount(0);
    };

    return (
        <div>
            <h2>Counter</h2>
            <h1>{count}</h1>

            <button onClick={decrease}>-</button>
            <button onClick={increase}>+</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}

export default Counter;
