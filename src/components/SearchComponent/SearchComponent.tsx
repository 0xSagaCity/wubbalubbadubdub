import { useContext, useEffect } from "react";
import { GlobalContext } from "../../App";
import { GlobalContextType, SearchComponentTypes } from "../../utils/types";
import SearchComponentClasses from "./SearchComponent.module.css";

export default function SearchComponent({
    search,
    setSearch,
    debouncedSearch,
    setCharacters,
}: SearchComponentTypes) {
    const { fetchData, setIsLoading } = useContext(
        GlobalContext
    ) as GlobalContextType;

    useEffect(() => {
        setIsLoading(true);
        setCharacters([]);
        fetchData(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch]);

    return (
        <label htmlFor="search" className={`${SearchComponentClasses.label}`}>
            Search
            <input
                value={search}
                type="text"
                placeholder="doctor, cluster, smith"
                name="search"
                onChange={(evt) => {
                    setSearch(evt.target.value);
                }}
                className={`${SearchComponentClasses.input} CYsearch`}
            />
        </label>
    );
}
