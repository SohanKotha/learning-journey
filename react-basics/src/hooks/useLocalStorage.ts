import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {

    const [value, setValue] = useState<T>(() => {

        // checking if data is already saved
        try {
            const savedData = localStorage.getItem(key);

            if (savedData !== null) {
                return JSON.parse(savedData) as T;
            }

        } catch (error) {
            console.log("Error reading saved data", error);
        }

        return initialValue;
    });

    // saving whenever value changes
    useEffect(() => {

        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log("Error saving data", error);
        }

    }, [key, value]);

    return [value, setValue] as const;
}

export default useLocalStorage;