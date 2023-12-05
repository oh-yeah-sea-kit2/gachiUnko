import React, { useState } from 'react';

const GameScreen = () => {
    const [excrements, setExcrements] = useState([]);

    const handleExcrete = (isLong) => {
        const newExcrement = {
            id: Date.now(),
            length: isLong ? 200 : 100,
            top: 0,
            splat: false
        };

        // 排泄物を追加
        setExcrements(excrements => [...excrements, newExcrement]);

        // アニメーション開始
        setTimeout(() => {
            setExcrements(excrements =>
                excrements.map(excrement =>
                    excrement.id === newExcrement.id
                        ? { ...excrement, top: 800, splat: true }
                        : excrement
                )
            );
        }, 3000);
    };

    return (
        <div style={styles.gameScreen}>
            {excrements.map((excrement) => (
                <div
                    key={excrement.id}
                    style={{
                        ...styles.excrement,
                        height: `${excrement.length}px`,
                        top: `${excrement.top}px`,
                        backgroundColor: excrement.splat ? 'brown' : 'green',
                        borderRadius: excrement.splat ? '50%' : '0%'
                    }}
                />
            ))}
            <button style={styles.button} onClick={() => handleExcrete(false)}>排泄</button>
            <button style={styles.button} onClick={() => handleExcrete(true)}>長い排泄</button>
        </div>
    );
};

// スタイル定義
const styles = {
    gameScreen: {
        position: 'relative',
        width: '100%',
        height: '800px', // 画面の高さ（調整が必要かもしれません）
        backgroundColor: '#ddd',
        overflow: 'hidden'
    },
    excrement: {
        position: 'absolute',
        width: '20px',
        backgroundColor: 'green',
        left: '50%',
        transform: 'translateX(-50%)'
    },
    button: {
        margin: '10px',
        padding: '10px 20px',
        fontSize: '16px'
    }
};

export default GameScreen;
