import { createContext, useState } from "react";
import useDebounce from "./hooks/useDebounce.js";
import {
    ApiResponse,
    CharacterType,
    GlobalContextType,
} from "./utils/types.js";
import SearchComponent from "./components/SearchComponent/SearchComponent.tsx";
import InfiniteScroll from "./components/InfiniteScroll/InfiniteScroll.tsx";
import CardComponent from "./components/CardComponent/CardComponent.tsx";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent.tsx";
import DetailsComponent from "./components/DetailsComponent/DetailsComponent.tsx";

export const GlobalContext = createContext<GlobalContextType | null>(null);

function App() {
    const [lastLoadedPage, setLastLoadedPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [characters, setCharacters] = useState<CharacterType[]>([]);
    const [search, setSearch] = useState("");
    const [details, setDetails] = useState<CharacterType | null>(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const debouncedSearch = useDebounce(search, 200);
    const BASE_URL = `https://rickandmortyapi.com/api/character/`;
    const PAGE_PARAM = `?page=`;
    const NAME_PARAM = `&name=`;
    const controller = new AbortController();

    //Function fetches characters either when scrolled to bottom of screen
    //OR when some search term is used to search by character's name
    const fetchData = (isByScroll?: boolean) => {
        const signal = controller.signal;
        (async () => {
            //By Scroll
            if (isByScroll) {
                const data = await fetch(
                    `${BASE_URL}${PAGE_PARAM}${
                        lastLoadedPage + 1
                    }${NAME_PARAM}${debouncedSearch}`
                );
                if (data.ok) {
                    const jsonData = (await data.json()) as ApiResponse;
                    setLastLoadedPage(lastLoadedPage + 1);
                    setIsLoading(false);
                    setTotalPages(jsonData.info.pages);
                    setCharacters([...characters, ...jsonData.results]);
                    setShowError(false);
                } else {
                    throw new Error(
                        "Could not fetch more data try refreshing or check your internet"
                    );
                }
            } else {
                //By Search
                const data = await fetch(
                    BASE_URL + PAGE_PARAM + "1" + NAME_PARAM + debouncedSearch,
                    { signal }
                );
                if (data.ok) {
                    const jsonData = (await data.json()) as ApiResponse;
                    setLastLoadedPage(1);
                    setIsLoading(false);
                    setTotalPages(jsonData.info.pages);
                    setCharacters(jsonData.results);
                    setShowError(false);
                } else {
                    throw new Error("Could not find any such character");
                }
            }
        })().catch((err: Error) => {
            setIsLoading(false);
            setShowError(true);
            setErrorMessage(err.message);
        });
        return () => controller.abort("Aborting this request");
    };

    return (
        <GlobalContext.Provider
            value={{
                fetchData,
                setIsLoading,
            }}
        >
            <DetailsComponent
                details={details}
                setDetails={setDetails}
                showDetails={showDetails}
                setShowDetails={setShowDetails}
            />
            <InfiniteScroll
                lastLoadedPage={lastLoadedPage}
                totalPages={totalPages}
            >
                <SearchComponent
                    search={search}
                    setSearch={setSearch}
                    debouncedSearch={debouncedSearch}
                    setCharacters={setCharacters}
                />
                {showError ? (
                    <ErrorComponent errorMessage={errorMessage} />
                ) : (
                    <></>
                )}
                <div className="cardContainer">
                    {characters.map((character) => {
                        return (
                            <CardComponent
                                key={`character-${character.id}`}
                                character={character}
                                setDetails={setDetails}
                                setShowDetails={setShowDetails}
                            />
                        );
                    })}
                </div>
                {isLoading ? (
                    <div className="loadingComponent CYloadingComponent">
                        Loading data
                    </div>
                ) : (
                    <></>
                )}
            </InfiniteScroll>
        </GlobalContext.Provider>
    );
}

export default App;
