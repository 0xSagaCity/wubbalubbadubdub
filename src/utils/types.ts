export interface SearchComponentTypes {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    debouncedSearch: string;
    setCharacters: React.Dispatch<React.SetStateAction<CharacterType[]>>;
}

export interface InfiniteScrollTypes {
    lastLoadedPage: number;
    totalPages: number | undefined;
    children: JSX.Element | JSX.Element[];
}

export interface CharacterType {
    id: string;
    name: string;
    image: string;
    species: string;
    gender: string;
    status: string;
    location: { name: string; url: string };
    episode: string[];
}

export interface DetailsComponentType {
    details: CharacterType | null;
    setDetails: React.Dispatch<React.SetStateAction<CharacterType | null>>;
    showDetails: boolean;
    setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface GlobalContextType {
    fetchData: (isByScroll?: boolean) => void;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface LocationInfoType {
    type: string;
    dimension: string;
    residents: string[];
}

export interface ErrorComponentType {
    errorMessage: string;
}

export interface EpisodeDataType {
    episode: string;
    name: string;
    air_date: string;
}

export interface ApiResponse {
    info: { pages: number };
    results: CharacterType[];
}

export interface CardComponentType {
    character: CharacterType;
    setDetails: React.Dispatch<React.SetStateAction<CharacterType | null>>;
    setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}
