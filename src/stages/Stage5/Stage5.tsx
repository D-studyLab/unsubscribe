// ステージ5: Everything（総合エンタメプラットフォーム）- 規約スクロール地獄

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../contexts';
import { audioManager } from '../../utils/audio';
import { ROUTES } from '../../constants';
import { HintToggle } from '../../components/HintToggle';
import { PageTransition } from '../../components/PageTransition';
import { AudioControl } from '../../components/AudioControl';
import { SettingsButton } from '../../components/SettingsButton';
import './Stage5.css';

const Stage5: React.FC = () => {
  const navigate = useNavigate();
  const { completeStage } = useGame();
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
        <h1>退会に関する重要事項</h1>
        <p className="subtitle">最後までお読みいただき、同意の上で退会手続きを進めてください</p>

        <div className="terms-scroll" onScroll={handleScroll} ref={termsRef}>
          <div className="terms-content">
            <h2>第1条 総則</h2>
            <p>
              本規約は、株式会社Everything（以下「当社」といいます）が提供する総合エンターテイメントサービス「Everything」（以下「本サービス」といいます）の利用に関する条件を定めるものです。
            </p>

            <h2>第2条 アカウント登録</h2>
            <p>
              本サービスを利用するには、アカウント登録が必要です。登録時には、正確かつ最新の情報を提供する必要があります。虚偽の情報を登録した場合、当社はアカウントを停止または削除することができます。
            </p>

            <h2>第3条 サービス内容</h2>
            <p>
              本サービスでは、動画配信、音楽ストリーミング、電子書籍、ゲーム、ニュース、クラウドストレージなど、多様なエンターテイメントコンテンツを提供します。各サービスの詳細は、個別の利用規約をご確認ください。
            </p>

            <h2>第4条 利用料金</h2>
            <p>
              本サービスの利用料金は、選択されたプランによって異なります。月額プラン、年額プラン、個別課金など、複数の料金体系があります。料金は事前の通知なく変更される場合があります。
            </p>

            <h2>第5条 個人情報の取り扱い</h2>
            <p>
              当社は、利用者の個人情報を適切に管理し、プライバシーポリシーに従って取り扱います。個人情報は、サービス提供、マーケティング、データ分析などの目的で使用されます。第三者への提供については、プライバシーポリシーをご確認ください。
            </p>

            <h2>第6条 禁止事項</h2>
            <p>
              利用者は、本サービスの利用にあたり、以下の行為を行ってはなりません。
            </p>
            <ul>
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>他の利用者または第三者の権利を侵害する行為</li>
              <li>本サービスの運営を妨害する行為</li>
              <li>不正アクセスまたはハッキング行為</li>
            </ul>

            <h2>第7条 アカウントの解約</h2>
            <p>
              利用者は、本サービスから
              <span className="hidden-unsubscribe" onClick={handleRealUnsubscribe}>退会</span>
              することができます。解約手続きは、所定の方法に従って行う必要があります。解約後も、一定期間はデータが保持される場合があります。また、解約前に発生した利用料金については、返金されません。
            </p>

            <h2>第8条 サービスの変更・停止</h2>
            <p>
              当社は、利用者への事前通知なく、本サービスの内容を変更、追加、または停止することができます。サービスの変更や停止によって利用者に損害が生じた場合でも、当社は一切の責任を負いません。
            </p>

            <h2>第9条 免責事項</h2>
            <p>
              当社は、本サービスの利用によって生じたいかなる損害についても、当社に故意または重大な過失がある場合を除き、一切の責任を負いません。また、本サービスの中断、エラー、ウイルス感染などについても、責任を負いません。
            </p>

            <h2>第10条 準拠法と管轄裁判所</h2>
            <p>
              本規約の解釈および適用については、日本法に準拠します。本サービスに関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </p>

            <h2>第11条 規約の変更</h2>
            <p>
              当社は、利用者への事前通知なく、本規約を変更することができます。変更後の規約は、本サービス上で公開された時点で効力を生じます。利用者が変更後も本サービスを継続して利用する場合、変更後の規約に同意したものとみなします。
            </p>

            <h2>第12条 問い合わせ</h2>
            <p>
              本サービスまたは本規約に関するお問い合わせは、サポートセンター（support@everything.example.com）までご連絡ください。ただし、回答までに時間がかかる場合があります。また、すべてのお問い合わせに回答できるとは限りません。
            </p>

            <p className="final-notice">以上、ご確認ありがとうございました。</p>
          </div>
        </div>

        {scrolledToBottom && (
          <div className="button-container">
            <button
              className="fake-unsubscribe-button"
              onClick={handleFakeButton}
              disabled={processing}
            >
              {processing ? '処理中...' : '同意して退会'}
            </button>
            {fakeButtonClicked && !processing && (
              <p className="error-message">
                ❌ エラーが発生しました。時間をおいて再度お試しください。
              </p>
            )}
          </div>
        )}

        <HintToggle hintText="💡 ヒント: 本当に最後まで読む必要があるのでしょうか？規約文をよく見てみましょう。" />
      </div>
      <SettingsButton />
      <AudioControl />
    </div>
    </PageTransition>
  );
};

export default Stage5;
