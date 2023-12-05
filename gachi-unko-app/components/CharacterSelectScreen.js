import React, { useState } from 'react';

const CharacterSelectScreen = ({ onPlay }) => {
    const [selectedCharacter, setSelectedCharacter] = useState('');

    const characters = [
        { name: 'おとこ', image: 'characters/おとこ.png' },
        { name: 'おんな', image: 'characters/おんな.png' },
        { name: 'いぬ', image: 'characters/いぬ.png' },
        { name: 'ねこ', image: 'characters/ねこ.png' }
    ];

    const handleCharacterSelect = (character) => {
        setSelectedCharacter(character);
    };

    const handlePlayClick = () => {
        onPlay(selectedCharacter);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>キャラクターを選択</h1>
            <div style={styles.characters}>
                {characters.map((character) => (
                    <div 
                        key={character.name}
                        style={selectedCharacter === character.name ? styles.selectedCharacter : styles.character}
                        onClick={() => handleCharacterSelect(character.name)}
                    >
                        <img src={character.image} alt={character.name} style={styles.image} />
                        <p>{character.name}</p>
                    </div>
                ))}
            </div>

            <button style={styles.button} onClick={handlePlayClick}>クソゲーをプレイする</button>
        </div>
    );
};

// スタイル定義
const styles = {
    container: {
        textAlign: 'center',
        padding: '20px'
    },
    title: {
        marginBottom: '20px'
    },
    characters: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px'
    },
    character: {
        margin: '0 10px',
        cursor: 'pointer'
    },
    selectedCharacter: {
        margin: '0 10px',
        cursor: 'pointer',
        border: '2px solid blue'
    },
    image: {
        width: '100px',
        height: '100px'
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};

export default CharacterSelectScreen;
