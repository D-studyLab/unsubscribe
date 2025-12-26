// ステージ1: BuyMore（オンラインショッピングサイト）

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame, useLanguage } from '../../contexts';
import { audioManager } from '../../utils/audio';
import { ROUTES } from '../../constants';
import { DummyPageModal } from '../../components/DummyPageModal';
import { HintToggle } from '../../components/HintToggle';
import { PageTransition } from '../../components/PageTransition';
import { SettingsButton } from '../../components/SettingsButton';
import './Stage1.css';

const Stage1: React.FC = () => {
  const navigate = useNavigate();
  const { completeStage, nextStage } = useGame();
  const { t } = useLanguage();
  const [dummyPage, setDummyPage] = useState<{ title: string; content: string } | null>(null);

  const handleUnsubscribe = () => {
    audioManager.playSuccess();
    completeStage(1);
    nextStage();
    navigate(ROUTES.STAGE_2);
  };

  const showDummyPage = (title: string, content: string) => {
    audioManager.playClick();
    setDummyPage({ title, content });
  };

  return (
    <PageTransition>
      <div className="stage1">
      <header className="stage1-header">
        <h1>{t.stage1.title}</h1>
        <p className="tagline">{t.stage1.tagline}</p>
      </header>

      <main className="stage1-content">
        <div className="products">
          <h2>{t.stage1.recommendedProducts}</h2>
          <div className="product-grid">
            <div className="product-card">
              <div className="product-image">📱</div>
              <h3>{t.stage1.product1Name}</h3>
              <p className="product-price">{t.stage1.product1Price}</p>
              <p className="product-desc">{t.stage1.product1Desc}</p>
            </div>
            <div className="product-card">
              <div className="product-image">💻</div>
              <h3>{t.stage1.product2Name}</h3>
              <p className="product-price">{t.stage1.product2Price}</p>
              <p className="product-desc">{t.stage1.product2Desc}</p>
            </div>
            <div className="product-card">
              <div className="product-image">🎧</div>
              <h3>{t.stage1.product3Name}</h3>
              <p className="product-price">{t.stage1.product3Price}</p>
              <p className="product-desc">{t.stage1.product3Desc}</p>
            </div>
            <div className="product-card">
              <div className="product-image">⌚</div>
              <h3>{t.stage1.product4Name}</h3>
              <p className="product-price">{t.stage1.product4Price}</p>
              <p className="product-desc">{t.stage1.product4Desc}</p>
            </div>
          </div>
        </div>

        <HintToggle hintText={t.stage1.hint} />
      </main>

      <footer className="stage1-footer">
        <div className="footer-links">
          <button onClick={() => showDummyPage(t.stage1.aboutUs, t.stage1.aboutUsContent)}>{t.stage1.aboutUs}</button>
          <button onClick={() => showDummyPage(t.stage1.terms, t.stage1.termsContent)}>{t.stage1.terms}</button>
          <button onClick={() => showDummyPage(t.stage1.privacy, t.stage1.privacyContent)}>{t.stage1.privacy}</button>
          <button onClick={handleUnsubscribe} className="tiny-link">
            {t.stage1.unsubscribe}
          </button>
          <button onClick={() => showDummyPage(t.stage1.contact, t.stage1.contactContent)}>{t.stage1.contact}</button>
          <button onClick={() => showDummyPage(t.stage1.help, t.stage1.helpContent)}>{t.stage1.help}</button>
        </div>
        <p className="copyright">{t.stage1.copyright}</p>
      </footer>

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

export default Stage1;
