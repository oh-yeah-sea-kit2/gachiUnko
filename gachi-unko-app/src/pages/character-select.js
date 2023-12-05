import React from 'react';
import { useRouter } from 'next/router';
import CharacterSelectScreen from '../../components/CharacterSelectScreen';

const CharacterSelectPage = () => {
    const router = useRouter();
    const handlePlay = (selectedCharacter) => {
        router.push(`/game?character=${selectedCharacter}`);
    };
    
    return <CharacterSelectScreen onPlay={handlePlay} />;
};

export default CharacterSelectPage;
