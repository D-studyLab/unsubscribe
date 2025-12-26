// ステージ1: BuyMore（オンラインショッピングサイト）

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../contexts';
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
        <h1>BuyMore - オンラインショッピング</h1>
        <p className="tagline">初回送料無料！今すぐお買い物</p>
      </header>

      <main className="stage1-content">
        <div className="products">
          <h2>おすすめ商品</h2>
          <div className="product-grid">
            <div className="product-card">
              <div className="product-image">📱</div>
              <h3>スマートフォン X1</h3>
              <p className="product-price">¥89,800</p>
              <p className="product-desc">最新プロセッサ搭載</p>
            </div>
            <div className="product-card">
              <div className="product-image">💻</div>
              <h3>ノートPC Pro</h3>
              <p className="product-price">¥149,800</p>
              <p className="product-desc">軽量で高性能</p>
            </div>
            <div className="product-card">
              <div className="product-image">🎧</div>
              <h3>ワイヤレスイヤホン</h3>
              <p className="product-price">¥24,800</p>
              <p className="product-desc">ノイズキャンセリング</p>
            </div>
            <div className="product-card">
              <div className="product-image">⌚</div>
              <h3>スマートウォッチ</h3>
              <p className="product-price">¥39,800</p>
              <p className="product-desc">健康管理機能付き</p>
            </div>
          </div>
        </div>

        <HintToggle hintText="💡 ヒント: フッターをよく見てみましょう" />
      </main>

      <footer className="stage1-footer">
        <div className="footer-links">
          <button onClick={() => showDummyPage('会社概要', 'BuyMoreは2024年に設立されたオンラインショッピングサイトです。お客様に最高のショッピング体験を提供することを目指しています。')}>会社概要</button>
          <button onClick={() => showDummyPage('利用規約', 'この利用規約は、BuyMoreのサービスをご利用いただく際の条件を定めるものです。サービスをご利用いただくことで、本規約に同意したものとみなされます。')}>利用規約</button>
          <button onClick={() => showDummyPage('プライバシーポリシー', '当社は、お客様の個人情報を適切に管理し、第三者に提供することはありません。詳細については、プライバシーポリシーをご確認ください。')}>プライバシーポリシー</button>
          <button onClick={handleUnsubscribe} className="tiny-link">
            退会
          </button>
          <button onClick={() => showDummyPage('お問い合わせ', 'お問い合わせは、メール（support@buymore.example.com）またはお電話（0120-XXX-XXX）にて承っております。')}>お問い合わせ</button>
          <button onClick={() => showDummyPage('ヘルプ', 'よくある質問や使い方ガイドをご用意しています。お困りの際は、まずヘルプページをご確認ください。')}>ヘルプ</button>
        </div>
        <p className="copyright">© 2024 BuyMore. All rights reserved.</p>
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
