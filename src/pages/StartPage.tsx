// スタートページ

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts';
import { generateRandomName } from '../utils';
import { ROUTES } from '../constants';
import './StartPage.css';

const StartPage: React.FC = () => {
  const navigate = useNavigate();
  const { setNickname, startGame } = useGame();
  const [inputNickname, setInputNickname] = useState('');

  useEffect(() => {
    // ページ読み込み時にランダムな名前を生成
    setInputNickname(generateRandomName());
  }, []);

  const handleStart = () => {
    setNickname(inputNickname);
    startGame();
    navigate(ROUTES.STAGE_1);
  };

  return (
    <div className="start-page">
      <div className="start-content">
        <h1 className="title">The Unsubscribe</h1>
        <p className="subtitle">退会することに特化した体験型風刺ゲーム</p>

        <div className="description">
          <p>あなたは様々なWebサービスに登録してしまいました。</p>
          <p>しかし、いざ退会しようとすると...</p>
          <p>全5ステージをクリアして、すべてのサービスから退会してください。</p>
        </div>

        <div className="nickname-section">
          <label htmlFor="nickname">ニックネーム</label>
          <div className="nickname-input-group">
            <input
              id="nickname"
              type="text"
              value={inputNickname}
              onChange={(e) => setInputNickname(e.target.value)}
              maxLength={20}
              placeholder="ニックネームを入力"
            />
            <button onClick={handleStart} className="start-button">
              ゲームスタート
            </button>
          </div>
          <p className="hint">面倒な方はそのままスタートボタンを押してください</p>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
