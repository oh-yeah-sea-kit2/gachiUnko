import React from 'react';

const StartScreen = ({ onStart }) => {
    return (
        <div style={styles.container}>
            <div style={styles.messageBox}>
                <h1 style={styles.title}>ガチのクソアプリ</h1>
                <h2 style={styles.subtitle}>Caution!</h2>
                <p style={styles.message}>このアプリはガチのクソです。耐性がない方は、今すぐブラウザを閉じてください。</p>
                <button style={styles.button} onClick={onStart}>続行する</button>
            </div>
        </div>
    );
};

// スタイル定義
const styles = {
    container: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
    },
    messageBox: {
        textAlign: 'center',
        backgroundColor: 'red',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
    },
    title: {
        color: 'white',
        fontSize: '24px',
        marginBottom: '10px',
    },
    subtitle: {
        color: 'white',
        fontSize: '20px',
        marginBottom: '10px',
    },
    message: {
        color: 'white',
        fontSize: '18px',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        color: 'white',
        backgroundColor: 'green',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
    }
};

export default StartScreen;
