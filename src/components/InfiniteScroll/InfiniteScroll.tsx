import { useContext, useEffect } from "react";
import { GlobalContext } from "../../App";
import { GlobalContextType, InfiniteScrollTypes } from "../../utils/types";

export default function InfiniteScroll({
    children,
    totalPages,
    lastLoadedPage,
}: InfiniteScrollTypes) {
    const { fetchData, setIsLoading } = useContext(
        GlobalContext
    ) as GlobalContextType;

    const infiniteScroll = () => {
        //Runs if user has reached the bottom 200px of their screen size
        if (
            window.innerHeight + document.documentElement.scrollTop + 200 >=
            document.documentElement.scrollHeight
        ) {
            if (totalPages !== undefined && totalPages > lastLoadedPage) {
                setIsLoading(true);
                fetchData(true);
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", infiniteScroll);
        return () => {
            window.removeEventListener("scroll", infiniteScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastLoadedPage, totalPages]);

    return <>{children}</>;
}
