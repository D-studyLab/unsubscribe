// 結果ページ

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts';
import { formatDetailedTime, shareToTwitter } from '../utils';
import { audioManager } from '../utils/audio';
import { ROUTES } from '../constants';
import { PageTransition } from '../components/PageTransition';
import { AudioControl } from '../components/AudioControl';
import './ResultPage.css';

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { gameState, resetGame } = useGame();
  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    if (!gameState.startTime) {
      // ゲームを開始していない場合はスタートページへ
      navigate(ROUTES.START);
      return;
    }

    const time = Date.now() - gameState.startTime;
    setElapsedTime(formatDetailedTime(time));

    // BGMを停止（ゲームクリア）
    audioManager.stopBGM();
    audioManager.playSuccess();
  }, [gameState.startTime, navigate]);

  const handleShare = () => {
    audioManager.playClick();
    shareToTwitter(gameState.nickname, elapsedTime);
  };

  const handlePlayAgain = () => {
    audioManager.playClick();
    resetGame();
    navigate(ROUTES.START);
  };

  return (
    <PageTransition>
      <div className="result-page">
        <div className="result-content">
          <h1 className="result-title">おめでとうございます！</h1>
          <p className="result-subtitle">全てのサービスから退会できました</p>

          <div className="result-stats">
            <div className="stat-item">
              <span className="stat-label">ニックネーム</span>
              <span className="stat-value">{gameState.nickname}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">クリア時間</span>
              <span className="stat-value">{elapsedTime}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">クリアステージ</span>
              <span className="stat-value">5 / 5</span>
            </div>
          </div>

          <div className="result-message">
            <p>しかし、あなたは本当に自由になったのでしょうか...？</p>
            <p>「退会する」を選んだあなたは自由ですか？それとも、選択させられただけですか？</p>
            <p>自由意志とは、用意された選択肢の中から選ぶことではありません。</p>
          </div>

          <div className="result-actions">
            <button onClick={handleShare} className="share-button">
              結果を共有する
            </button>
            <button onClick={handlePlayAgain} className="play-again-button">
              もう一度プレイ
            </button>
          </div>
        </div>
        <AudioControl />
      </div>
    </PageTransition>
  );
};

export default ResultPage;
