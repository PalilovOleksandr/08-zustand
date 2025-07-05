import type { CSSProperties } from "react";
import { ScaleLoader } from "react-spinners";

const override: CSSProperties = {
    display: "flex",
    justifyContent: "center",
};

export default function Loader() {
    return (
        <ScaleLoader color="#dc3545" cssOverride={override} />
    )
};