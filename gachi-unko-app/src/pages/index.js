import { useRouter } from 'next/router';
import StartScreen from '../../components/StartScreen';

const HomePage = () => {
  const router = useRouter();
  const handleStart = () => {
    router.push('/character-select'); // キャラクター選択ページへ移動
  };

  return <StartScreen onStart={handleStart} />;
};

export default HomePage;
