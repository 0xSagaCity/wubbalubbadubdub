import CardComponentClasses from "./CardComponent.module.css";
import { CardComponentType } from "../../utils/types";

export default function CardComponent({
    character,
    setDetails,
    setShowDetails,
}: CardComponentType) {
    return (
        <div className={`${CardComponentClasses.card} CYcard`}>
            <div className={CardComponentClasses.imageContainer}>
                <img
                    src={character.image}
                    loading="lazy"
                    alt={`A profile of ${character.name}`}
                    className={CardComponentClasses.image}
                />
                <div className={CardComponentClasses.imageOverlay}></div>
            </div>
            <div className={CardComponentClasses.info}>
                <span className={CardComponentClasses.name}>
                    {character.id} - {character.name}
                </span>

                <button
                    className={CardComponentClasses.button}
                    onClick={() => {
                        setDetails(character);
                        setShowDetails(true);
                    }}
                >
                    Learn more...
                </button>
            </div>
        </div>
    );
}
