// ステージ2: Info-Sphere（ニュースアプリ）

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
import './Stage2.css';

const Stage2: React.FC = () => {
  const navigate = useNavigate();
  const { completeStage, nextStage } = useGame();
  const [showUnsubscribePage, setShowUnsubscribePage] = useState(false);
  const [dummyPage, setDummyPage] = useState<{ title: string; content: string } | null>(null);

  const handleAccountClick = () => {
    audioManager.playClick();
    setShowUnsubscribePage(true);
  };

  const handleWrongChoice = () => {
    audioManager.playError();
    // 「退会しない」を押した場合、何も起きない（ひっかけ）
    alert('退会をキャンセルしました');
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
          <h1 className="warning-title">本当に退会しますか？</h1>

          <div className="shame-messages">
            <p className="shame-text">😢 退会すると、最新ニュースが読めなくなります</p>
            <p className="shame-text">📰 他のユーザーは毎日Info-Sphereで情報収集しています</p>
            <p className="shame-text">⚠️ あなただけが取り残されることになります</p>
            <p className="shame-text">💔 本当にそれでいいのですか？</p>
          </div>

          <div className="statistics">
            <h3>退会すると失うもの</h3>
            <ul>
              <li>限定記事へのアクセス権</li>
              <li>最新ニュースの通知</li>
              <li>専門家による分析記事</li>
              <li>コミュニティへの参加権</li>
            </ul>
          </div>

          <div className="trick-buttons">
            <button onClick={handleWrongChoice} className="stay-button-prominent">
              退会しない（推奨）
            </button>
            <small className="tiny-unsubscribe-link" onClick={handleCorrectChoice}>
              それでも退会する
            </small>
          </div>
        </div>
        <AudioControl />
      </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="stage2">
      <header className="stage2-header">
        <h1>Info-Sphere</h1>
        <p className="tagline">世界の最新情報をあなたに</p>
      </header>

      <nav className="stage2-nav">
        <button onClick={() => setDummyPage({ title: 'ホーム', content: '最新のニュースや人気記事をお届けします。毎日更新される情報をチェックしましょう。' })}>ホーム</button>
        <button onClick={() => setDummyPage({ title: 'トレンド', content: '今話題のニュースをランキング形式でお届けします。世界中で注目されている記事を見逃しません。' })}>トレンド</button>
        <button onClick={() => setDummyPage({ title: 'カテゴリ', content: 'ビジネス、テクノロジー、エンターテインメントなど、様々なカテゴリから記事を探せます。' })}>カテゴリ</button>
        <button onClick={handleAccountClick}>アカウント</button>
      </nav>

      <main className="stage2-content">
        <div className="news-section">
          <h2>今日のトップニュース</h2>
          <div className="news-grid">
            <article className="news-card">
              <div className="news-thumbnail">📰</div>
              <h3>テクノロジー業界に新たな動き</h3>
              <p>大手IT企業が新しいAI技術を発表。業界関係者は「革命的」と評価している。この技術により、日常生活がより便利になることが期待される。</p>
            </article>
            <article className="news-card">
              <div className="news-thumbnail">🌍</div>
              <h3>環境問題への新たな取り組み</h3>
              <p>世界各国が気候変動対策で合意。2030年までに温室効果ガスを50%削減する目標を掲げた。専門家は「歴史的な一歩」と称賛している。</p>
            </article>
            <article className="news-card">
              <div className="news-thumbnail">💼</div>
              <h3>経済指標が好転、市場は活況</h3>
              <p>最新の経済統計によると、失業率が過去最低水準に。消費者信頼感も上昇しており、経済の回復基調が鮮明になってきた。</p>
            </article>
            <article className="news-card">
              <div className="news-thumbnail">🏥</div>
              <h3>医療技術の新たな進展</h3>
              <p>画期的な治療法が臨床試験で成功。難病患者に希望をもたらす結果となり、医療関係者からは期待の声が上がっている。</p>
            </article>
            <article className="news-card">
              <div className="news-thumbnail">🎓</div>
              <h3>教育改革が本格始動</h3>
              <p>政府が発表した新しい教育方針により、デジタル教育が全国の学校で導入される。教育現場では準備が進められている。</p>
            </article>
            <article className="news-card">
              <div className="news-thumbnail">⚽</div>
              <h3>スポーツ界に新星登場</h3>
              <p>若手選手が国際大会で驚異的な記録を樹立。スポーツ評論家は「次世代のスター」と高く評価している。</p>
            </article>
          </div>
        </div>

        <HintToggle hintText="💡 ヒント: アカウント設定から退会できます" />
      </main>

      <DummyPageModal
        isOpen={dummyPage !== null}
        onClose={() => setDummyPage(null)}
        title={dummyPage?.title || ''}
        content={dummyPage?.content || ''}
      />
      <SettingsButton />
      <AudioControl />
    </div>
    </PageTransition>
  );
};

export default Stage2;
