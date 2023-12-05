// components/Footer.js

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>アプリバージョン: 1.0.0</p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: 'center',
    padding: '10px',
    marginTop: '20px',
    backgroundColor: '#f0f0f0',
    color: '#333'
  }
};

export default Footer;
