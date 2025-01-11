import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/GerenciarItensTop.module.css';
import { RiSearchLine } from '@remixicon/react';

function GerenciarItensTop({
    pacotes,
    setPacotesFiltrados,
    placeholder,
    icon: Icon,
    bigText,
    buttonText,
    buttonLink,
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [noResultsMessage, setNoResultsMessage] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            filterPacotes();
        }
    };

    const handleSearchClick = () => {
        filterPacotes();
    };

    const filterPacotes = () => {
        const filtered = pacotes.filter(pacote =>
            pacote.nome.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setPacotesFiltrados(filtered);

        if (filtered.length === 0) {
            setNoResultsMessage("Nenhum pacote encontrado.");
        } else {
            setNoResultsMessage('');
        }
    };

    return (
        <div>
            <div className={styles.searchBarContainer}>
                <div className={styles.searchInputWrapper}>
                    <RiSearchLine className={styles.iconSearch} onClick={handleSearchClick}/>
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
                <button className={styles.adicPac} onClick={() => navigate(buttonLink)}>
                    {buttonText}
                </button>
            </div>

            {noResultsMessage && <p>{noResultsMessage}</p>}
        </div>
    );
}


export default GerenciarItensTop;
