import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../../styles/Game.module.css';

const GamePage = () => {
    const router = useRouter();
    const { query } = router;
    const [selectedCharacter, setSelectedCharacter] = useState('');
    const displayAreaRef = useRef(null);
    // オーディオ要素への参照を作成
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio('onara_002.mp3');
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
                // 最新の認識結果のみを取得
                const latestResult = e.results[e.results.length - 1];
                const transcript = latestResult[0].transcript;
    
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
    }, [selectedCharacter, query.character]);

    const displayExcretion = (character, isLong) => {
        const excretionDiv = document.createElement('div');
        excretionDiv.className = isLong ? `${styles.excretion} ${styles.longExcretion}` : styles.excretion;
        displayAreaRef.current.appendChild(excretionDiv);

        // オーディオが再生中であれば、最初から再生する
        if (!audioRef.current.paused) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        // 音量を30%に設定
        audioRef.current.volume = 0.3;
        audioRef.current.play();
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
                        priority
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
