// スタートページ

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame, useLanguage } from '../contexts';
import { generateRandomName } from '../utils';
import { audioManager } from '../utils/audio';
import { ROUTES } from '../constants';
import { PageTransition } from '../components/PageTransition';
import { SettingsButton } from '../components/SettingsButton';
import './StartPage.css';

const StartPage: React.FC = () => {
  const navigate = useNavigate();
  const { setNickname, startGame } = useGame();
  const { t } = useLanguage();
  const [inputNickname, setInputNickname] = useState('');

  useEffect(() => {
    // ページ読み込み時にランダムな名前を生成
    setInputNickname(generateRandomName());

    // タイトル画面でBGMを開始
    const startBGM = () => {
      audioManager.resume();
      audioManager.startBGM();
      // イベントリスナーを削除
      document.removeEventListener('click', startBGM);
      document.removeEventListener('keydown', startBGM);
    };

    // ユーザーインタラクション後にBGM開始
    document.addEventListener('click', startBGM);
    document.addEventListener('keydown', startBGM);

    return () => {
      document.removeEventListener('click', startBGM);
      document.removeEventListener('keydown', startBGM);
    };
  }, []);

  const handleStart = () => {
    audioManager.playClick();
    setNickname(inputNickname);
    startGame();
    navigate(ROUTES.STAGE_1);
  };

  return (
    <PageTransition>
      <div className="start-page">
        <div className="start-content">
          <h1 className="title">{t.start.title}</h1>
          <p className="subtitle">{t.start.subtitle}</p>

          <div className="description">
            <p>{t.start.description1}</p>
            <p>{t.start.description2}</p>
            <p>{t.start.description3}</p>
          </div>

          <div className="nickname-section">
            <label htmlFor="nickname">{t.start.nicknameLabel}</label>
            <div className="nickname-input-group">
              <input
                id="nickname"
                type="text"
                value={inputNickname}
                onChange={(e) => setInputNickname(e.target.value)}
                maxLength={20}
                placeholder={t.start.nicknamePlaceholder}
              />
              <button onClick={handleStart} className="start-button">
                {t.start.startButton}
              </button>
            </div>
            <p className="hint">{t.start.hint}</p>
          </div>
        </div>
        <SettingsButton />
      </div>
    </PageTransition>
  );
};

export default StartPage;
