import { useEffect, useState } from "react";
import { DetailsComponentType, EpisodeDataType } from "../../utils/types";
import DetailsComponentClasses from "./DetailsComponent.module.css";
import { LocationInfoType } from "../../utils/types";

export default function DetailsComponent({
    details,
    setDetails,
    showDetails,
    setShowDetails,
}: DetailsComponentType) {
    const [locationInfo, setLocationInfo] = useState<LocationInfoType | null>(
        null
    );
    const [episodeData, setEpisodeData] = useState<EpisodeDataType[]>([]);
    const [locationError, setLocationError] = useState(false);
    const [episodesError, setEpisodesError] = useState(false);
    const controller = new AbortController();

    useEffect(() => {
        const signal = controller.signal;
        setEpisodeData([]);
        //Loads data from the location endpoint of the API
        (async () => {
            if (details?.location.url) {
                const data = await fetch(details.location.url);
                if (data.ok) {
                    const jsonData = (await data.json()) as LocationInfoType;
                    setLocationInfo(jsonData);
                    setLocationError(false);
                } else {
                    throw new Error("Something went wrong while loading");
                }
            }
        })().catch(() => {
            setLocationError(true);
        });

        //Loads episode names
        (async () => {
            if (details?.episode) {
                for (let i = 0; i < details.episode.length; i++) {
                    const currentPage = details.episode[i];
                    const data = await fetch(currentPage, { signal });
                    if (data.ok) {
                        const jsonData = (await data.json()) as EpisodeDataType;
                        setEpisodeData((episodeData) =>
                            episodeData.concat(jsonData)
                        );
                        setEpisodesError(false);
                    } else {
                        throw new Error("Something went wrong while loading");
                    }
                }
            }
        })().catch(() => {
            setEpisodesError(true);
        });

        return () => controller.abort("Aborting fetch calls");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [details]);

    return (
        <div
            className={`CYDetails ${DetailsComponentClasses.container} ${
                showDetails
                    ? DetailsComponentClasses.visible
                    : DetailsComponentClasses.hidden
            }`}
        >
            <div className={DetailsComponentClasses.wrapper}>
                <span className={`${DetailsComponentClasses.note} CYnote`}>
                    Click on learn more -
                </span>
                <button
                    className={DetailsComponentClasses.button}
                    onClick={() => {
                        setDetails(null);
                        setShowDetails(false);
                    }}
                >
                    X
                </button>
                <div className={DetailsComponentClasses.fullDetails}>
                    <img
                        src={details?.image}
                        alt={details?.name}
                        className={DetailsComponentClasses.image}
                    />
                    <span className={DetailsComponentClasses.name}>
                        {details?.name}
                    </span>
                    <div className={DetailsComponentClasses.textContainer}>
                        <span className={DetailsComponentClasses.blockTitle}>
                            Character Information
                        </span>
                        <span>Species - {details?.species}</span>
                        <span>Gender - {details?.gender}</span>
                        <span>Status - {details?.status}</span>
                        <span className={DetailsComponentClasses.blockTitle}>
                            Location Information
                        </span>
                        <span>Location - {details?.location.name}</span>
                        {locationError ? (
                            <span className="failMessage CYerrorComponent">
                                Could not fetch data on dimension and residents.
                                Try refreshing.
                            </span>
                        ) : (
                            <>
                                <span>Type - {locationInfo?.type}</span>
                                <span>
                                    Dimension - {locationInfo?.dimension}
                                </span>
                                <span>
                                    Residents - {locationInfo?.residents.length}
                                </span>
                            </>
                        )}
                        <span className={DetailsComponentClasses.blockTitle}>
                            Episodes Information
                        </span>
                        {!episodesError &&
                        episodeData.length !== details?.episode.length ? (
                            <span className="warning">
                                Loading episodes might take a while...
                            </span>
                        ) : (
                            <></>
                        )}
                        {episodesError ? (
                            <span className="failMessage CYerrorComponent">
                                Could not load episodes at this point. Try
                                refreshing.
                            </span>
                        ) : (
                            episodeData.map((episode) => {
                                return (
                                    <span
                                        key={`episode-name-${episode.name}`}
                                        className={
                                            DetailsComponentClasses.episode
                                        }
                                    >
                                        {episode.episode} - {episode.name} aired
                                        on {episode.air_date}
                                    </span>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
