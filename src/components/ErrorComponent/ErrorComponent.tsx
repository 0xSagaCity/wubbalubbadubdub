import { ErrorComponentType } from "../../utils/types";

export default function ErrorComponent({ errorMessage }: ErrorComponentType) {
    return <div className="errorMessage">{errorMessage}</div>;
}
