// 結果ページ

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame, useLanguage } from '../contexts';
import { formatDetailedTime, shareToTwitter } from '../utils';
import { audioManager } from '../utils/audio';
import { ROUTES } from '../constants';
import { PageTransition } from '../components/PageTransition';
import { SettingsButton } from '../components/SettingsButton';
import './ResultPage.css';

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { gameState, resetGame } = useGame();
  const { t } = useLanguage();
  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    // ゲームを開始していない、またはステージ5をクリアしていない場合はスタートページへ
    if (!gameState.startTime || !gameState.completedStages.includes(5)) {
      navigate(ROUTES.START);
      return;
    }

    const time = Date.now() - gameState.startTime;
    setElapsedTime(formatDetailedTime(time));

    // BGMを停止（ゲームクリア）
    audioManager.stopBGM();
    audioManager.playSuccess();
  }, [gameState.startTime, gameState.completedStages, navigate]);

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
          <h1 className="result-title">{t.result.title}</h1>
          <p className="result-subtitle">{t.result.subtitle}</p>

          <div className="result-stats">
            <div className="stat-item">
              <span className="stat-label">{t.result.nicknameLabel}</span>
              <span className="stat-value">{gameState.nickname}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">{t.result.clearTimeLabel}</span>
              <span className="stat-value">{elapsedTime}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">{t.result.clearStageLabel}</span>
              <span className="stat-value">5 / 5</span>
            </div>
          </div>

          <div className="result-message">
            <p>{t.result.message1}</p>
            <p>{t.result.message2}</p>
            <p>{t.result.message3}</p>
          </div>

          <div className="result-actions">
            <button onClick={handleShare} className="share-button">
              {t.result.shareButton}
            </button>
            <button onClick={handlePlayAgain} className="play-again-button">
              {t.result.playAgainButton}
            </button>
          </div>
        </div>
        <SettingsButton />
      </div>
    </PageTransition>
  );
};

export default ResultPage;
