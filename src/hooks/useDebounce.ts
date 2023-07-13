import { useEffect, useState } from "react";

export default function useDebounce(value: string, time = 250) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebounceValue(value);
        }, time);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [value, time]);

    return debounceValue;
}
