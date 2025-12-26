// ステージ5: Everything（総合エンタメプラットフォーム）- 規約スクロール地獄

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame, useLanguage } from '../../contexts';
import { audioManager } from '../../utils/audio';
import { ROUTES } from '../../constants';
import { HintToggle } from '../../components/HintToggle';
import { PageTransition } from '../../components/PageTransition';
import { SettingsButton } from '../../components/SettingsButton';
import './Stage5.css';

const Stage5: React.FC = () => {
  const navigate = useNavigate();
  const { completeStage } = useGame();
  const { t } = useLanguage();
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [fakeButtonClicked, setFakeButtonClicked] = useState(false);
  const [processing, setProcessing] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
    if (isBottom) {
      setScrolledToBottom(true);
    }
  };

  const handleRealUnsubscribe = () => {
    audioManager.playSuccess();
    completeStage(5);
    navigate(ROUTES.RESULT);
  };

  const handleFakeButton = () => {
    audioManager.playError();
    setFakeButtonClicked(true);
    setProcessing(true);
    // 3秒後にエラーメッセージ
    setTimeout(() => {
      setProcessing(false);
    }, 3000);
  };

  return (
    <PageTransition>
      <div className="stage5">
      <div className="terms-container">
        <h1>{t.stage5.title}</h1>
        <p className="subtitle">{t.stage5.subtitle}</p>

        <div className="terms-scroll" onScroll={handleScroll} ref={termsRef}>
          <div className="terms-content">
            <h2>{t.stage5.article1Title}</h2>
            <p>
              {t.stage5.article1Content}
            </p>

            <h2>{t.stage5.article2Title}</h2>
            <p>
              {t.stage5.article2Content}
            </p>

            <h2>{t.stage5.article3Title}</h2>
            <p>
              {t.stage5.article3Content}
            </p>

            <h2>{t.stage5.article4Title}</h2>
            <p>
              {t.stage5.article4Content}
            </p>

            <h2>{t.stage5.article5Title}</h2>
            <p>
              {t.stage5.article5Content}
            </p>

            <h2>{t.stage5.article6Title}</h2>
            <p>
              {t.stage5.article6Content}
            </p>
            <ul>
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>他の利用者または第三者の権利を侵害する行為</li>
              <li>本サービスの運営を妨害する行為</li>
              <li>不正アクセスまたはハッキング行為</li>
            </ul>

            <h2>{t.stage5.article7Title}</h2>
            <p>
              {t.stage5.article7Content1}
              <span className="hidden-unsubscribe" onClick={handleRealUnsubscribe}>{t.common.unsubscribe}</span>
              {t.stage5.article7Content2}
            </p>

            <h2>{t.stage5.article8Title}</h2>
            <p>
              {t.stage5.article8Content}
            </p>

            <h2>{t.stage5.article9Title}</h2>
            <p>
              {t.stage5.article9Content}
            </p>

            <h2>{t.stage5.article10Title}</h2>
            <p>
              {t.stage5.article10Content}
            </p>

            <h2>{t.stage5.article11Title}</h2>
            <p>
              {t.stage5.article11Content}
            </p>

            <h2>{t.stage5.article12Title}</h2>
            <p>
              {t.stage5.article12Content}
            </p>

            <p className="final-notice">{t.stage5.finalNotice}</p>
          </div>
        </div>

        {scrolledToBottom && (
          <div className="button-container">
            <button
              className="fake-unsubscribe-button"
              onClick={handleFakeButton}
              disabled={processing}
            >
              {processing ? t.stage5.processingButton : t.stage5.agreeButton}
            </button>
            {fakeButtonClicked && !processing && (
              <p className="error-message">
                {t.stage5.errorMessage}
              </p>
            )}
          </div>
        )}

        <HintToggle hintText={t.stage5.hint} />
      </div>
      <SettingsButton />
    </div>
    </PageTransition>
  );
};

export default Stage5;
