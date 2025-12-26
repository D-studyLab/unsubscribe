// ステージ3: Fan-Circle（クリエイター支援SNS）

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../contexts';
import { audioManager } from '../../utils/audio';
import { ROUTES } from '../../constants';
import { DummyPageModal } from '../../components/DummyPageModal';
import { HintToggle } from '../../components/HintToggle';
import { PageTransition } from '../../components/PageTransition';
import { AudioControl } from '../../components/AudioControl';
import { SettingsButton } from '../../components/SettingsButton';
import './Stage3.css';

const Stage3: React.FC = () => {
  const navigate = useNavigate();
  const { completeStage, nextStage } = useGame();
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
      alert('退会理由は10文字以上、詳細は50文字以上入力してください。');
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
          <h1>最後に...</h1>
          <div className="emotional-appeal">
            <p className="creator-message">
              「あなたがいなくなると、私たちクリエイターは悲しいです...」
            </p>
            <p className="creator-message">
              「あなたの支援で、私は創作を続けられました」
            </p>
            <p className="creator-message">
              「本当に去ってしまうのですか？」
            </p>
            <div className="fake-creators">
              <div className="creator-icon">😢</div>
              <div className="creator-icon">💔</div>
              <div className="creator-icon">😭</div>
            </div>
          </div>
          <p className="guilt-text">
            あなたが支援していた3人のクリエイターが悲しんでいます
          </p>
          <button onClick={handleFinalUnsubscribe} className="final-unsubscribe-button">
            それでも退会する
          </button>
        </div>
        <AudioControl />
      </div>
      </PageTransition>
    );
  }

  if (showSurvey) {
    return (
      <PageTransition>
        <div className="stage3 survey-page">
        <div className="survey-container">
          <h1>退会前アンケート</h1>
          <p className="survey-required">※すべての項目が必須です</p>

          <div className="survey-form">
            <div className="form-group">
              <label htmlFor="reason">
                退会理由を教えてください（10文字以上）<span className="required">*</span>
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="例：利用する機会が減ったため..."
                rows={3}
                className="survey-textarea"
              />
              <small className="char-count">{reason.length} / 10文字以上</small>
            </div>

            <div className="form-group">
              <label htmlFor="details">
                詳しい状況を教えてください（50文字以上）<span className="required">*</span>
              </label>
              <textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="できるだけ詳しくお書きください..."
                rows={6}
                className="survey-textarea"
              />
              <small className="char-count">{details.length} / 50文字以上</small>
            </div>

            <div className="guilt-message">
              <p>💔 あなたの退会により、支援していたクリエイターに影響が出る可能性があります</p>
              <p>📉 クリエイターの収入が減少します</p>
              <p>😢 あなたの温かい支援を失うことになります</p>
            </div>

            <button
              onClick={handleSubmitSurvey}
              className="submit-survey-button"
              disabled={reason.length < 10 || details.length < 50}
            >
              アンケートを送信
            </button>
          </div>
        </div>
        <AudioControl />
      </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="stage3">
      <header className="stage3-header">
        <h1>Fan-Circle</h1>
        <p className="tagline">クリエイターを支援しよう</p>
      </header>

      <nav className="stage3-nav">
        <a href="#feed">フィード</a>
        <a href="#creators">クリエイター</a>
        <a href="#subscription">支援中</a>
        <button onClick={handleSettingsClick} className="settings-link">設定</button>
      </nav>

      <main className="stage3-content">
        <div className="creators-section">
          <h2>支援中のクリエイター</h2>
          <div className="creators-grid">
            <div className="creator-card">
              <div className="creator-avatar">🎨</div>
              <h3>桜井ユキ</h3>
              <p className="creator-type">イラストレーター</p>
              <p className="creator-desc">オリジナルキャラクターのイラストを制作。月4回の限定イラスト配信中。</p>
              <p className="creator-support">あなたを含む120人が支援中</p>
            </div>
            <div className="creator-card">
              <div className="creator-avatar">🎵</div>
              <h3>田中ハルト</h3>
              <p className="creator-type">ミュージシャン</p>
              <p className="creator-desc">インディーズで活動中。毎週新曲をリリース。ライブ配信も定期開催。</p>
              <p className="creator-support">あなたを含む85人が支援中</p>
            </div>
            <div className="creator-card">
              <div className="creator-avatar">✍️</div>
              <h3>山田アイコ</h3>
              <p className="creator-type">小説家</p>
              <p className="creator-desc">ファンタジー小説を連載中。支援者限定で先行公開を実施しています。</p>
              <p className="creator-support">あなたを含む200人が支援中</p>
            </div>
            <div className="creator-card">
              <div className="creator-avatar">🎬</div>
              <h3>佐藤ケンジ</h3>
              <p className="creator-type">動画クリエイター</p>
              <p className="creator-desc">旅行系YouTuber。月2回の限定動画を配信。撮影の裏側も公開中。</p>
              <p className="creator-support">あなたを含む150人が支援中</p>
            </div>
            <div className="creator-card">
              <div className="creator-avatar">📸</div>
              <h3>鈴木リナ</h3>
              <p className="creator-type">フォトグラファー</p>
              <p className="creator-desc">風景写真を専門に活動。高解像度の壁紙データを毎週配信しています。</p>
              <p className="creator-support">あなたを含む95人が支援中</p>
            </div>
            <div className="creator-card">
              <div className="creator-avatar">🎮</div>
              <h3>中村タクミ</h3>
              <p className="creator-type">ゲーム開発者</p>
              <p className="creator-desc">インディーゲームを制作中。開発進捗を定期的に報告しています。</p>
              <p className="creator-support">あなたを含む180人が支援中</p>
            </div>
          </div>
        </div>

        <HintToggle hintText="💡 ヒント: 設定から退会手続きができます" />
      </main>
      <SettingsButton />
      <AudioControl />
    </div>
    </PageTransition>
  );
};

export default Stage3;
