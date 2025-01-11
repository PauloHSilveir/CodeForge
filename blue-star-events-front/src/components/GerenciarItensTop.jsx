import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/GerenciarItensTop.module.css";
import { RiSearchLine } from "@remixicon/react";

function GerenciarItensTop({
    placeholder,
    icon: Icon,
    bigText,
    buttonText,
    buttonLink,
    onSearch,
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            onSearch(searchQuery);
        }
    };

    const handleSearchClick = () => {
        onSearch(searchQuery);
    };

    return (
        <div>
            <div className={styles.searchBarContainer}>
                <div className={styles.searchInputWrapper}>
                    <RiSearchLine
                        className={styles.iconSearch}
                        onClick={handleSearchClick}
                    />
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className={styles.searchBar}
                    />
                </div>
            </div>

            <div className={styles.topTitle}>
                <div className={styles.title}>
                    {Icon && <Icon className={styles.blueIcon} />}
                    <span className={styles.bigText}>{bigText}</span>
                </div>
                <button
                    className={styles.adicPac}
                    onClick={() => navigate(buttonLink)}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}

export default GerenciarItensTop;
