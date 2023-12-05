import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../../styles/Game.module.css';

const GamePage = () => {
    const router = useRouter();
    const { query } = router;
    const [selectedCharacter, setSelectedCharacter] = useState('');
    const displayAreaRef = useRef(null);

    useEffect(() => {
        if (query.character) {
            setSelectedCharacter(query.character);
        }
        const displayArea = displayAreaRef.current;

        // タップイベントのリスナーを追加
        displayArea.addEventListener('click', () => {
            displayExcretion(selectedCharacter, false);
        });

        // 長押しイベントの実装
        let pressTimer;
        displayArea.addEventListener('mousedown', () => {
            pressTimer = window.setTimeout(() => {
                displayExcretion(selectedCharacter, true);
            }, 1000);
        });

        displayArea.addEventListener('mouseup', () => {
            clearTimeout(pressTimer);
        });

        // 音声認識の実装
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'ja-JP';
            recognition.interimResults = false;
            recognition.continuous = true;

            recognition.addEventListener('result', e => {
                const transcript = Array.from(e.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');
    
                console.log('認識された言葉:', transcript);
    
                if (transcript.includes('うんち') || transcript.includes('うんこ')) {
                    console.log('排泄コマンドが認識されました');
                    displayExcretion(selectedCharacter, false);
                }
            });
    
            recognition.start();
    
            return () => {
                recognition.stop();
                recognition.removeEventListener('result', recognition.start);
            };
        } else {
            console.log('SpeechRecognition APIはこのブラウザではサポートされていません。');
        }
    }, [selectedCharacter]);

    const displayExcretion = (character, isLong) => {
        const excretionDiv = document.createElement('div');
        excretionDiv.className = isLong ? `${styles.excretion} ${styles.longExcretion}` : styles.excretion;
        displayAreaRef.current.appendChild(excretionDiv);
    };

    return (
        <div className={styles.gameContainer}>
            {selectedCharacter && (
                <div className={styles.characterDisplay}>
                    <Image
                        src={`/characters/${selectedCharacter}.png`}
                        alt={selectedCharacter}
                        width={150} // 適切なサイズに調整
                        height={150}
                        layout="fixed"
                    />
                    <p className={styles.characterName}>{selectedCharacter}</p>
                </div>
            )}
            <div ref={displayAreaRef} className={styles.displayArea} onClick={() => displayExcretion(selectedCharacter, false)}>
                タップして排泄
            </div>
            <div className={styles.instructions}>
                画面をタップするか、「うんち」または「うんこ」と言って排泄させてください。
            </div>
        </div>
    );
};

export default GamePage;
