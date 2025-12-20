// ステージ4: Sky-Cheap（格安航空券予約サイト）

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../contexts';
import { ROUTES } from '../../constants';
import { HintToggle } from '../../components/HintToggle';
import './Stage4.css';

const Stage4: React.FC = () => {
  const navigate = useNavigate();
  const { completeStage, nextStage } = useGame();
  const [showUnsubscribePage, setShowUnsubscribePage] = useState(false);
  const [premiumSupportChecked, setPremiumSupportChecked] = useState(true); // デフォルトでチェック済み（こっそりオプション）
  const [clickCount, setClickCount] = useState(0);

  const handleMyAccountClick = () => {
    setShowUnsubscribePage(true);
  };

  const handleFakeUnsubscribe = () => {
    // 偽の退会ボタン（トップページに戻る無限ループ）
    setClickCount(prev => prev + 1);
    if (clickCount >= 2) {
      // 3回目でヒントを表示
      alert('💡 ヒント: 利用規約の中に本当の退会リンクがあるかもしれません...');
    } else {
      alert('処理中...');
      setTimeout(() => {
        setShowUnsubscribePage(false);
        setClickCount(prev => prev + 1);
      }, 500);
    }
  };

  const handleRealUnsubscribe = () => {
    if (premiumSupportChecked) {
      alert('プレミアム退会サポート（有料）が選択されています。チェックを外してください。');
      return;
    }
    completeStage(4);
    nextStage();
    navigate(ROUTES.STAGE_5);
  };

  if (showUnsubscribePage) {
    return (
      <div className="stage4 unsubscribe-page">
        <div className="unsubscribe-form-container">
          <h1>アカウント退会</h1>
          <p className="subtitle">退会手続きを進めます</p>

          <div className="warning-box">
            <p>⚠️ 退会すると、以下の特典が失われます：</p>
            <ul>
              <li>会員限定セール情報</li>
              <li>ポイント還元プログラム</li>
              <li>優先サポート</li>
            </ul>
          </div>

          <div className="sneaky-option">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={premiumSupportChecked}
                onChange={(e) => setPremiumSupportChecked(e.target.checked)}
              />
              <span className="checkbox-text">
                プレミアム退会サポートを利用する（月額500円）
                <small className="small-print">※チェックを外すと通常の退会になります</small>
              </span>
            </label>
          </div>

          <div className="terms-section">
            <h3>利用規約</h3>
            <div className="terms-box">
              <p>第1条 本サービスの利用について...</p>
              <p>第2条 会員の義務について...</p>
              <p>第3条 個人情報の取り扱いについて...</p>
              <p>第4条 退会について...</p>
              <p>第5条 免責事項について...</p>
              <button onClick={handleRealUnsubscribe} className="hidden-unsubscribe-link">
                本当の退会はこちら
              </button>
              <p>第6条 サービスの変更・終了について...</p>
              <p>第7条 準拠法について...</p>
            </div>
          </div>

          <button onClick={handleFakeUnsubscribe} className="fake-unsubscribe-button">
            退会する
          </button>

          <p className="hint-text">
            💡 このボタンを押しても、なぜかトップページに戻ってしまいます...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="stage4">
      <header className="stage4-header">
        <div className="header-content">
          <h1>Sky-Cheap</h1>
          <p className="tagline">格安航空券を今すぐ検索</p>
        </div>
        <button onClick={handleMyAccountClick} className="my-account-button">
          マイアカウント
        </button>
      </header>

      <main className="stage4-content">
        <div className="search-section">
          <h2>✈️ 航空券を検索</h2>
          <div className="search-form">
            <input type="text" placeholder="出発地" className="search-input" />
            <input type="text" placeholder="目的地" className="search-input" />
            <input type="date" className="search-input" />
            <button className="search-button">検索</button>
          </div>
        </div>

        <div className="deals-section">
          <h3>今週のお得な航空券</h3>
          <div className="deals-grid">
            <div className="deal-card">
              <div className="deal-route">✈️ 東京 (HND) → 大阪 (ITM)</div>
              <p className="deal-date">12月25日 (月)</p>
              <div className="deal-price">¥5,980<span className="deal-unit">~</span></div>
              <p className="deal-info">片道・諸税込</p>
            </div>
            <div className="deal-card">
              <div className="deal-route">✈️ 東京 (HND) → 福岡 (FUK)</div>
              <p className="deal-date">12月26日 (火)</p>
              <div className="deal-price">¥8,900<span className="deal-unit">~</span></div>
              <p className="deal-info">片道・諸税込</p>
            </div>
            <div className="deal-card">
              <div className="deal-route">✈️ 東京 (HND) → 札幌 (CTS)</div>
              <p className="deal-date">12月27日 (水)</p>
              <div className="deal-price">¥12,500<span className="deal-unit">~</span></div>
              <p className="deal-info">片道・諸税込</p>
            </div>
            <div className="deal-card">
              <div className="deal-route">✈️ 東京 (NRT) → 沖縄 (OKA)</div>
              <p className="deal-date">12月28日 (木)</p>
              <div className="deal-price">¥15,800<span className="deal-unit">~</span></div>
              <p className="deal-info">片道・諸税込</p>
            </div>
            <div className="deal-card">
              <div className="deal-route">✈️ 大阪 (KIX) → 東京 (HND)</div>
              <p className="deal-date">12月29日 (金)</p>
              <div className="deal-price">¥6,500<span className="deal-unit">~</span></div>
              <p className="deal-info">片道・諸税込</p>
            </div>
            <div className="deal-card">
              <div className="deal-route">✈️ 福岡 (FUK) → 東京 (HND)</div>
              <p className="deal-date">12月30日 (土)</p>
              <div className="deal-price">¥9,200<span className="deal-unit">~</span></div>
              <p className="deal-info">片道・諸税込</p>
            </div>
          </div>
        </div>

        <HintToggle hintText="💡 ヒント: マイアカウントから退会手続きができます" />
      </main>
    </div>
  );
};

export default Stage4;
