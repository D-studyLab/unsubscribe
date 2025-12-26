// ステージ3: Fan-Circle（クリエイター支援SNS）

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame, useLanguage } from '../../contexts';
import { audioManager } from '../../utils/audio';
import { ROUTES } from '../../constants';
import { HintToggle } from '../../components/HintToggle';
import { PageTransition } from '../../components/PageTransition';
import { SettingsButton } from '../../components/SettingsButton';
import './Stage3.css';

const Stage3: React.FC = () => {
  const navigate = useNavigate();
  const { completeStage, nextStage } = useGame();
  const { t } = useLanguage();
  const [showSurvey, setShowSurvey] = useState(false);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const handleSettingsClick = () => {
    audioManager.playClick();
    setShowSurvey(true);
  };

  const handleSubmitSurvey = () => {
    if (reason.trim().length < 10 || details.trim().length < 50) {
      audioManager.playError();
      alert(t.stage3.navFeed === 'フィード' ? '退会理由は10文字以上、詳細は50文字以上入力してください。' : 'Please enter at least 10 characters for reason and 50 characters for details.');
      return;
    }
    audioManager.playClick();
    setShowFinalMessage(true);
  };

  const handleFinalUnsubscribe = () => {
    audioManager.playSuccess();
    completeStage(3);
    nextStage();
    navigate(ROUTES.STAGE_4);
  };

  if (showFinalMessage) {
    return (
      <PageTransition>
        <div className="stage3 final-message-page">
        <div className="final-container">
          <h1>{t.stage3.finalTitle}</h1>
          <div className="emotional-appeal">
            <p className="creator-message">
              {t.stage3.creatorMessage1}
            </p>
            <p className="creator-message">
              {t.stage3.creatorMessage2}
            </p>
            <p className="creator-message">
              {t.stage3.creatorMessage3}
            </p>
            <div className="fake-creators">
              <div className="creator-icon">😢</div>
              <div className="creator-icon">💔</div>
              <div className="creator-icon">😭</div>
            </div>
          </div>
          <p className="guilt-text">
            {t.stage3.guiltText}
          </p>
          <button onClick={handleFinalUnsubscribe} className="final-unsubscribe-button">
            {t.stage3.finalUnsubscribe}
          </button>
        </div>
        <SettingsButton />
      </div>
      </PageTransition>
    );
  }

  if (showSurvey) {
    return (
      <PageTransition>
        <div className="stage3 survey-page">
        <div className="survey-container">
          <h1>{t.stage3.surveyTitle}</h1>
          <p className="survey-required">{t.stage3.surveyRequired}</p>

          <div className="survey-form">
            <div className="form-group">
              <label htmlFor="reason">
                {t.stage3.reasonLabel}<span className="required">*</span>
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={t.stage3.reasonPlaceholder}
                rows={3}
                className="survey-textarea"
              />
              <small className="char-count">{reason.length} / {t.stage3.reasonCount}</small>
            </div>

            <div className="form-group">
              <label htmlFor="details">
                {t.stage3.detailsLabel}<span className="required">*</span>
              </label>
              <textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={t.stage3.detailsPlaceholder}
                rows={6}
                className="survey-textarea"
              />
              <small className="char-count">{details.length} / {t.stage3.detailsCount}</small>
            </div>

            <div className="guilt-message">
              <p>{t.stage3.guilt1}</p>
              <p>{t.stage3.guilt2}</p>
              <p>{t.stage3.guilt3}</p>
            </div>

            <button
              onClick={handleSubmitSurvey}
              className="submit-survey-button"
              disabled={reason.length < 10 || details.length < 50}
            >
              {t.stage3.submitButton}
            </button>
          </div>
        </div>
        <SettingsButton />
      </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="stage3">
      <header className="stage3-header">
        <h1>{t.stage3.title}</h1>
        <p className="tagline">{t.stage3.tagline}</p>
      </header>

      <nav className="stage3-nav">
        <a href="#feed">{t.stage3.navFeed}</a>
        <a href="#creators">{t.stage3.navCreators}</a>
        <a href="#subscription">{t.stage3.navSubscription}</a>
        <button onClick={handleSettingsClick} className="settings-link">{t.stage3.navSettings}</button>
      </nav>

      <main className="stage3-content">
        <div className="creators-section">
          <h2>{t.stage3.supportingCreators}</h2>
          <div className="creators-grid">
            <div className="creator-card">
              <div className="creator-avatar">🎨</div>
              <h3>{t.stage3.creator1Name}</h3>
              <p className="creator-type">{t.stage3.creator1Type}</p>
              <p className="creator-desc">{t.stage3.creator1Desc}</p>
              <p className="creator-support">{t.stage3.creator1Support}</p>
            </div>
            <div className="creator-card">
              <div className="creator-avatar">🎵</div>
              <h3>{t.stage3.creator2Name}</h3>
              <p className="creator-type">{t.stage3.creator2Type}</p>
              <p className="creator-desc">{t.stage3.creator2Desc}</p>
              <p className="creator-support">{t.stage3.creator2Support}</p>
            </div>
            <div className="creator-card">
              <div className="creator-avatar">✍️</div>
              <h3>{t.stage3.creator3Name}</h3>
              <p className="creator-type">{t.stage3.creator3Type}</p>
              <p className="creator-desc">{t.stage3.creator3Desc}</p>
              <p className="creator-support">{t.stage3.creator3Support}</p>
            </div>
            <div className="creator-card">
              <div className="creator-avatar">🎬</div>
              <h3>{t.stage3.creator4Name}</h3>
              <p className="creator-type">{t.stage3.creator4Type}</p>
              <p className="creator-desc">{t.stage3.creator4Desc}</p>
              <p className="creator-support">{t.stage3.creator4Support}</p>
            </div>
            <div className="creator-card">
              <div className="creator-avatar">📸</div>
              <h3>{t.stage3.creator5Name}</h3>
              <p className="creator-type">{t.stage3.creator5Type}</p>
              <p className="creator-desc">{t.stage3.creator5Desc}</p>
              <p className="creator-support">{t.stage3.creator5Support}</p>
            </div>
            <div className="creator-card">
              <div className="creator-avatar">🎮</div>
              <h3>{t.stage3.creator6Name}</h3>
              <p className="creator-type">{t.stage3.creator6Type}</p>
              <p className="creator-desc">{t.stage3.creator6Desc}</p>
              <p className="creator-support">{t.stage3.creator6Support}</p>
            </div>
          </div>
        </div>

        <HintToggle hintText={t.stage3.hint} />
      </main>
      <SettingsButton />
    </div>
    </PageTransition>
  );
};

export default Stage3;
