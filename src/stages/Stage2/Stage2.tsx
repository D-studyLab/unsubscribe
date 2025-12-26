// ステージ2: Info-Sphere（ニュースアプリ）

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame, useLanguage } from '../../contexts';
import { audioManager } from '../../utils/audio';
import { ROUTES } from '../../constants';
import { DummyPageModal } from '../../components/DummyPageModal';
import { HintToggle } from '../../components/HintToggle';
import { PageTransition } from '../../components/PageTransition';
import { SettingsButton } from '../../components/SettingsButton';
import './Stage2.css';

const Stage2: React.FC = () => {
  const navigate = useNavigate();
  const { completeStage, nextStage } = useGame();
  const { t } = useLanguage();
  const [showUnsubscribePage, setShowUnsubscribePage] = useState(false);
  const [dummyPage, setDummyPage] = useState<{ title: string; content: string } | null>(null);

  const handleAccountClick = () => {
    audioManager.playClick();
    setShowUnsubscribePage(true);
  };

  const handleWrongChoice = () => {
    audioManager.playError();
    // 「退会しない」を押した場合、何も起きない（ひっかけ）
    alert(t.stage2.navAccount === 'アカウント' ? '退会をキャンセルしました' : 'Cancellation cancelled');
    setShowUnsubscribePage(false);
  };

  const handleCorrectChoice = () => {
    audioManager.playSuccess();
    completeStage(2);
    nextStage();
    navigate(ROUTES.STAGE_3);
  };

  if (showUnsubscribePage) {
    return (
      <PageTransition>
        <div className="stage2 unsubscribe-page">
        <div className="unsubscribe-container">
          <h1 className="warning-title">{t.stage2.unsubscribeTitle}</h1>

          <div className="shame-messages">
            <p className="shame-text">{t.stage2.shame1}</p>
            <p className="shame-text">{t.stage2.shame2}</p>
            <p className="shame-text">{t.stage2.shame3}</p>
            <p className="shame-text">{t.stage2.shame4}</p>
          </div>

          <div className="statistics">
            <h3>{t.stage2.loseTitle}</h3>
            <ul>
              <li>{t.stage2.loseItem1}</li>
              <li>{t.stage2.loseItem2}</li>
              <li>{t.stage2.loseItem3}</li>
              <li>{t.stage2.loseItem4}</li>
            </ul>
          </div>

          <div className="trick-buttons">
            <button onClick={handleWrongChoice} className="stay-button-prominent">
              {t.stage2.stayButton}
            </button>
            <small className="tiny-unsubscribe-link" onClick={handleCorrectChoice}>
              {t.stage2.realUnsubscribe}
            </small>
          </div>
        </div>
        <SettingsButton />
      </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="stage2">
      <header className="stage2-header">
        <h1>{t.stage2.title}</h1>
        <p className="tagline">{t.stage2.tagline}</p>
      </header>

      <nav className="stage2-nav">
        <button onClick={() => setDummyPage({ title: t.stage2.navHome, content: t.stage2.dummyHome })}>{t.stage2.navHome}</button>
        <button onClick={() => setDummyPage({ title: t.stage2.navTrend, content: t.stage2.dummyTrend })}>{t.stage2.navTrend}</button>
        <button onClick={() => setDummyPage({ title: t.stage2.navCategory, content: t.stage2.dummyCategory })}>{t.stage2.navCategory}</button>
        <button onClick={handleAccountClick}>{t.stage2.navAccount}</button>
      </nav>

      <main className="stage2-content">
        <div className="news-section">
          <h2>{t.stage2.topNews}</h2>
          <div className="news-grid">
            <article className="news-card">
              <div className="news-thumbnail">📰</div>
              <h3>{t.stage2.news1Title}</h3>
              <p>{t.stage2.news1Content}</p>
            </article>
            <article className="news-card">
              <div className="news-thumbnail">🌍</div>
              <h3>{t.stage2.news2Title}</h3>
              <p>{t.stage2.news2Content}</p>
            </article>
            <article className="news-card">
              <div className="news-thumbnail">💼</div>
              <h3>{t.stage2.news3Title}</h3>
              <p>{t.stage2.news3Content}</p>
            </article>
            <article className="news-card">
              <div className="news-thumbnail">🏥</div>
              <h3>{t.stage2.news4Title}</h3>
              <p>{t.stage2.news4Content}</p>
            </article>
            <article className="news-card">
              <div className="news-thumbnail">🎓</div>
              <h3>{t.stage2.news5Title}</h3>
              <p>{t.stage2.news5Content}</p>
            </article>
            <article className="news-card">
              <div className="news-thumbnail">⚽</div>
              <h3>{t.stage2.news6Title}</h3>
              <p>{t.stage2.news6Content}</p>
            </article>
          </div>
        </div>

        <HintToggle hintText={t.stage2.hint} />
      </main>

      <DummyPageModal
        isOpen={dummyPage !== null}
        onClose={() => setDummyPage(null)}
        title={dummyPage?.title || ''}
        content={dummyPage?.content || ''}
      />
      <SettingsButton />
    </div>
    </PageTransition>
  );
};

export default Stage2;
