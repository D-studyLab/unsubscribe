// ステージ4: Sky-Cheap（格安航空券予約サイト）

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame, useLanguage } from '../../contexts';
import { audioManager } from '../../utils/audio';
import { ROUTES } from '../../constants';
import { HintToggle } from '../../components/HintToggle';
import { PageTransition } from '../../components/PageTransition';
import { SettingsButton } from '../../components/SettingsButton';
import './Stage4.css';

const Stage4: React.FC = () => {
  const navigate = useNavigate();
  const { completeStage, nextStage } = useGame();
  const { t } = useLanguage();
  const [showUnsubscribePage, setShowUnsubscribePage] = useState(false);
  const [premiumSupportChecked, setPremiumSupportChecked] = useState(true); // デフォルトでチェック済み（こっそりオプション）
  const [clickCount, setClickCount] = useState(0);

  const handleMyAccountClick = () => {
    audioManager.playClick();
    setShowUnsubscribePage(true);
  };

  const handleFakeUnsubscribe = () => {
    audioManager.playError();
    // 偽の退会ボタン（トップページに戻る無限ループ）
    setClickCount(prev => prev + 1);
    if (clickCount >= 2) {
      // 3回目でヒントを表示
      const hintMsg = t.stage4.myAccount === 'マイアカウント'
        ? '💡 ヒント: 利用規約の中に本当の退会リンクがあるかもしれません...'
        : '💡 Hint: The real unsubscribe link might be hidden in the terms of service...';
      alert(hintMsg);
    } else {
      const processingMsg = t.stage4.myAccount === 'マイアカウント' ? '処理中...' : 'Processing...';
      alert(processingMsg);
      setTimeout(() => {
        setShowUnsubscribePage(false);
        setClickCount(prev => prev + 1);
      }, 500);
    }
  };

  const handleRealUnsubscribe = () => {
    if (premiumSupportChecked) {
      audioManager.playError();
      const alertMsg = t.stage4.myAccount === 'マイアカウント'
        ? 'プレミアム退会サポート（有料）が選択されています。チェックを外してください。'
        : 'Premium cancellation support (paid) is selected. Please uncheck it.';
      alert(alertMsg);
      return;
    }
    audioManager.playSuccess();
    completeStage(4);
    nextStage();
    navigate(ROUTES.STAGE_5);
  };

  if (showUnsubscribePage) {
    return (
      <PageTransition>
        <div className="stage4 unsubscribe-page">
        <div className="unsubscribe-form-container">
          <h1>{t.stage4.unsubscribeTitle}</h1>
          <p className="subtitle">{t.stage4.unsubscribeSubtitle}</p>

          <div className="warning-box">
            <p>{t.stage4.warningText}</p>
            <ul>
              <li>{t.stage4.warningItem1}</li>
              <li>{t.stage4.warningItem2}</li>
              <li>{t.stage4.warningItem3}</li>
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
                {t.stage4.sneakyOption}
                <small className="small-print">{t.stage4.sneakySmallPrint}</small>
              </span>
            </label>
          </div>

          <div className="terms-section">
            <h3>{t.stage4.termsTitle}</h3>
            <div className="terms-box">
              <p>{t.stage4.termsArticle1}</p>
              <p>{t.stage4.termsArticle2}</p>
              <p>{t.stage4.termsArticle3}</p>
              <p>{t.stage4.termsArticle4}</p>
              <p>{t.stage4.termsArticle5}</p>
              <button onClick={handleRealUnsubscribe} className="hidden-unsubscribe-link">
                {t.stage4.realUnsubscribe}
              </button>
              <p>{t.stage4.termsArticle6}</p>
              <p>{t.stage4.termsArticle7}</p>
            </div>
          </div>

          <button onClick={handleFakeUnsubscribe} className="fake-unsubscribe-button">
            {t.stage4.fakeButton}
          </button>

          <p className="hint-text">
            {t.stage4.hintText}
          </p>
        </div>
        <SettingsButton />
      </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="stage4">
      <header className="stage4-header">
        <div className="header-content">
          <h1>{t.stage4.title}</h1>
          <p className="tagline">{t.stage4.tagline}</p>
        </div>
        <button onClick={handleMyAccountClick} className="my-account-button">
          {t.stage4.myAccount}
        </button>
      </header>

      <main className="stage4-content">
        <div className="search-section">
          <h2>{t.stage4.searchTitle}</h2>
          <div className="search-form">
            <input type="text" placeholder={t.stage4.searchFrom} className="search-input" />
            <input type="text" placeholder={t.stage4.searchTo} className="search-input" />
            <input type="date" className="search-input" />
            <button className="search-button">{t.stage4.searchButton}</button>
          </div>
        </div>

        <div className="deals-section">
          <h3>{t.stage4.dealsTitle}</h3>
          <div className="deals-grid">
            <div className="deal-card">
              <div className="deal-route">{t.stage4.route1}</div>
              <p className="deal-date">12月25日 (月)</p>
              <div className="deal-price">¥5,980<span className="deal-unit">{t.stage4.priceUnit}</span></div>
              <p className="deal-info">{t.stage4.priceInfo}</p>
            </div>
            <div className="deal-card">
              <div className="deal-route">{t.stage4.route2}</div>
              <p className="deal-date">12月26日 (火)</p>
              <div className="deal-price">¥8,900<span className="deal-unit">{t.stage4.priceUnit}</span></div>
              <p className="deal-info">{t.stage4.priceInfo}</p>
            </div>
            <div className="deal-card">
              <div className="deal-route">{t.stage4.route3}</div>
              <p className="deal-date">12月27日 (水)</p>
              <div className="deal-price">¥12,500<span className="deal-unit">{t.stage4.priceUnit}</span></div>
              <p className="deal-info">{t.stage4.priceInfo}</p>
            </div>
            <div className="deal-card">
              <div className="deal-route">{t.stage4.route4}</div>
              <p className="deal-date">12月28日 (木)</p>
              <div className="deal-price">¥15,800<span className="deal-unit">{t.stage4.priceUnit}</span></div>
              <p className="deal-info">{t.stage4.priceInfo}</p>
            </div>
            <div className="deal-card">
              <div className="deal-route">{t.stage4.route5}</div>
              <p className="deal-date">12月29日 (金)</p>
              <div className="deal-price">¥6,500<span className="deal-unit">{t.stage4.priceUnit}</span></div>
              <p className="deal-info">{t.stage4.priceInfo}</p>
            </div>
            <div className="deal-card">
              <div className="deal-route">{t.stage4.route6}</div>
              <p className="deal-date">12月30日 (土)</p>
              <div className="deal-price">¥9,200<span className="deal-unit">{t.stage4.priceUnit}</span></div>
              <p className="deal-info">{t.stage4.priceInfo}</p>
            </div>
          </div>
        </div>

        <HintToggle hintText={t.stage4.hint} />
      </main>
      <SettingsButton />
    </div>
    </PageTransition>
  );
};

export default Stage4;
