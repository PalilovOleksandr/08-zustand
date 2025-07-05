import type React from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
    onSearch: (value: string) => void;
    value: string;
};

export default function SearchBox({ onSearch, value }: SearchBoxProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value)
    };
    return (
        <input
            className={css.input}
            value={value}
            onChange={handleChange}
            type="text"
            placeholder="Search notes"
        />
    );
};