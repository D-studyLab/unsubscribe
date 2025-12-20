// ステージ5: Everything（総合エンタメプラットフォーム）

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../contexts';
import { ROUTES } from '../../constants';
import { HintToggle } from '../../components/HintToggle';
import './Stage5.css';

const Stage5: React.FC = () => {
  const navigate = useNavigate();
  const { completeStage } = useGame();
  const [showFAQ, setShowFAQ] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [isOnHold, setIsOnHold] = useState(false);
  const [holdTime, setHoldTime] = useState(0);
  const [successCode, setSuccessCode] = useState('');

  useEffect(() => {
    if (isOnHold) {
      const timer = setInterval(() => {
        setHoldTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOnHold]);

  const handleAccountClick = () => {
    setShowFAQ(true);
  };

  const handleCallSupport = () => {
    setShowPhone(true);
    setShowFAQ(false);
  };

  const handlePhoneInput = (digit: string) => {
    const newInput = phoneInput + digit;
    setPhoneInput(newInput);

    // 謎解き: 特定のタイミングで「4545」を入力
    if (holdTime >= 10 && newInput === '4545') {
      setSuccessCode('4545');
      setTimeout(() => {
        completeStage(5);
        navigate(ROUTES.RESULT);
      }, 1000);
    }
  };

  const handleClearInput = () => {
    setPhoneInput('');
  };

  const handleCallButton = () => {
    if (!isOnHold) {
      setIsOnHold(true);
      setHoldTime(0);
    }
  };

  if (showPhone) {
    return (
      <div className="stage5 phone-page">
        <div className="phone-container">
          <h1>サポートセンター</h1>
          <p className="support-number">📞 0120-XXX-XXXX</p>

          <div className="phone-status">
            {!isOnHold && (
              <div className="initial-message">
                <p>営業時間: 平日 10:00-10:05 (5分間のみ)</p>
                <p className="warning-text">※現在、受付時間外です</p>
                <button onClick={handleCallButton} className="call-button">
                  それでも電話する
                </button>
              </div>
            )}

            {isOnHold && (
              <div className="on-hold">
                <div className="hold-animation">🎵</div>
                <p className="hold-text">保留中... {holdTime}秒</p>
                <p className="hold-message">しばらくお待ちください</p>

                {holdTime >= 10 && (
                  <div className="secret-hint">
                    <p className="hint-text">💡 謎解きヒント: 退会したい気持ちを数字で表してみてください</p>
                    <p className="small-hint">（よ・い・し・こ = 4・5・4・5）</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="phone-keypad">
            <div className="phone-display">
              <input
                type="text"
                value={phoneInput}
                readOnly
                className="phone-input-display"
                placeholder="番号を入力"
              />
              {successCode === '4545' && (
                <div className="success-message">✅ 退会コード受理！</div>
              )}
            </div>

            <div className="keypad-grid">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
                <button
                  key={digit}
                  onClick={() => handlePhoneInput(digit)}
                  className="keypad-button"
                  disabled={!isOnHold}
                >
                  {digit}
                </button>
              ))}
            </div>

            <button onClick={handleClearInput} className="clear-button">
              クリア
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showFAQ) {
    return (
      <div className="stage5 faq-page">
        <div className="faq-container">
          <h1>よくある質問（FAQ）</h1>

          <div className="faq-list">
            <div className="faq-item">
              <h3>Q: サービスの使い方を教えてください</h3>
              <p>A: トップページから各種コンテンツにアクセスできます...</p>
            </div>

            <div className="faq-item">
              <h3>Q: パスワードを忘れました</h3>
              <p>A: ログイン画面の「パスワードを忘れた方」から再設定できます...</p>
            </div>

            <div className="faq-item">
              <h3>Q: プランを変更したい</h3>
              <p>A: アカウント設定からプランを変更できます...</p>
            </div>

            <div className="faq-item">
              <h3>Q: 退会したい</h3>
              <p>A: 退会はサポートセンターへの電話でのみ受け付けております。</p>
              <button onClick={handleCallSupport} className="call-support-button">
                サポートセンターに電話する
              </button>
            </div>

            <div className="faq-item">
              <h3>Q: 支払い方法を変更したい</h3>
              <p>A: アカウント設定から支払い方法を変更できます...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stage5">
      <header className="stage5-header">
        <h1>Everything</h1>
        <p className="tagline">あらゆるエンターテイメントをひとつに</p>
        <button onClick={handleAccountClick} className="account-button">
          アカウント
        </button>
      </header>

      <main className="stage5-content">
        <div className="services-section">
          <h2>利用可能なサービス</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🎬</div>
              <h3>動画配信</h3>
              <p>映画・ドラマ見放題</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎵</div>
              <h3>音楽ストリーミング</h3>
              <p>1億曲以上聴き放題</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📚</div>
              <h3>電子書籍</h3>
              <p>小説・漫画読み放題</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎮</div>
              <h3>ゲーム</h3>
              <p>100タイトル以上遊び放題</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📰</div>
              <h3>ニュース</h3>
              <p>最新ニュース読み放題</p>
            </div>
            <div className="service-card">
              <div className="service-icon">☁️</div>
              <h3>クラウドストレージ</h3>
              <p>1TB まで保存可能</p>
            </div>
          </div>
        </div>

        <HintToggle hintText="💡 ヒント: アカウント設定を確認してみましょう" />
      </main>
    </div>
  );
};

export default Stage5;
