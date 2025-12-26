// 多言語対応の翻訳ファイル

export interface Translations {
  // スタートページ
  start: {
    title: string;
    subtitle: string;
    description1: string;
    description2: string;
    description3: string;
    nicknameLabel: string;
    nicknamePlaceholder: string;
    startButton: string;
    hint: string;
  };

  // 結果ページ
  result: {
    title: string;
    subtitle: string;
    nicknameLabel: string;
    clearTimeLabel: string;
    clearStageLabel: string;
    message1: string;
    message2: string;
    message3: string;
    shareButton: string;
    playAgainButton: string;
  };

  // Stage1: BuyMore
  stage1: {
    title: string;
    tagline: string;
    recommendedProducts: string;
    product1Name: string;
    product1Price: string;
    product1Desc: string;
    product2Name: string;
    product2Price: string;
    product2Desc: string;
    product3Name: string;
    product3Price: string;
    product3Desc: string;
    product4Name: string;
    product4Price: string;
    product4Desc: string;
    aboutUs: string;
    aboutUsContent: string;
    terms: string;
    termsContent: string;
    privacy: string;
    privacyContent: string;
    unsubscribe: string;
    contact: string;
    contactContent: string;
    help: string;
    helpContent: string;
    copyright: string;
    hint: string;
  };

  // Stage2: Info-Sphere
  stage2: {
    title: string;
    tagline: string;
    navHome: string;
    navTrend: string;
    navCategory: string;
    navAccount: string;
    topNews: string;
    news1Title: string;
    news1Content: string;
    news2Title: string;
    news2Content: string;
    news3Title: string;
    news3Content: string;
    news4Title: string;
    news4Content: string;
    news5Title: string;
    news5Content: string;
    news6Title: string;
    news6Content: string;
    unsubscribeTitle: string;
    shame1: string;
    shame2: string;
    shame3: string;
    shame4: string;
    loseTitle: string;
    loseItem1: string;
    loseItem2: string;
    loseItem3: string;
    loseItem4: string;
    stayButton: string;
    realUnsubscribe: string;
    hint: string;
    dummyHome: string;
    dummyTrend: string;
    dummyCategory: string;
  };

  // Stage3: Fan-Circle
  stage3: {
    title: string;
    tagline: string;
    navFeed: string;
    navCreators: string;
    navSubscription: string;
    navSettings: string;
    supportingCreators: string;
    creator1Name: string;
    creator1Type: string;
    creator1Desc: string;
    creator1Support: string;
    creator2Name: string;
    creator2Type: string;
    creator2Desc: string;
    creator2Support: string;
    creator3Name: string;
    creator3Type: string;
    creator3Desc: string;
    creator3Support: string;
    creator4Name: string;
    creator4Type: string;
    creator4Desc: string;
    creator4Support: string;
    creator5Name: string;
    creator5Type: string;
    creator5Desc: string;
    creator5Support: string;
    creator6Name: string;
    creator6Type: string;
    creator6Desc: string;
    creator6Support: string;
    surveyTitle: string;
    surveyRequired: string;
    reasonLabel: string;
    reasonPlaceholder: string;
    reasonCount: string;
    detailsLabel: string;
    detailsPlaceholder: string;
    detailsCount: string;
    guilt1: string;
    guilt2: string;
    guilt3: string;
    submitButton: string;
    finalTitle: string;
    creatorMessage1: string;
    creatorMessage2: string;
    creatorMessage3: string;
    guiltText: string;
    finalUnsubscribe: string;
    hint: string;
  };

  // Stage4: Sky-Cheap
  stage4: {
    title: string;
    tagline: string;
    myAccount: string;
    searchTitle: string;
    searchFrom: string;
    searchTo: string;
    searchButton: string;
    dealsTitle: string;
    route1: string;
    route2: string;
    route3: string;
    route4: string;
    route5: string;
    route6: string;
    priceUnit: string;
    priceInfo: string;
    unsubscribeTitle: string;
    unsubscribeSubtitle: string;
    warningText: string;
    warningItem1: string;
    warningItem2: string;
    warningItem3: string;
    sneakyOption: string;
    sneakySmallPrint: string;
    termsTitle: string;
    termsArticle1: string;
    termsArticle2: string;
    termsArticle3: string;
    termsArticle4: string;
    termsArticle5: string;
    realUnsubscribe: string;
    termsArticle6: string;
    termsArticle7: string;
    fakeButton: string;
    hintText: string;
    hint: string;
  };

  // Stage5: Everything
  stage5: {
    title: string;
    subtitle: string;
    article1Title: string;
    article1Content: string;
    article2Title: string;
    article2Content: string;
    article3Title: string;
    article3Content: string;
    article4Title: string;
    article4Content: string;
    article5Title: string;
    article5Content: string;
    article6Title: string;
    article6Content: string;
    article7Title: string;
    article7Content1: string;
    article7Content2: string;
    article8Title: string;
    article8Content: string;
    article9Title: string;
    article9Content: string;
    article10Title: string;
    article10Content: string;
    article11Title: string;
    article11Content: string;
    article12Title: string;
    article12Content: string;
    finalNotice: string;
    agreeButton: string;
    processingButton: string;
    errorMessage: string;
    hint: string;
  };

  // 設定モーダル
  settings: {
    title: string;
    bgmVolume: string;
    sfxVolume: string;
    language: string;
    languageNote: string;
    closeButton: string;
  };

  // 共通
  common: {
    unsubscribe: string;
  };
}

export const translations: Record<'ja' | 'en', Translations> = {
  ja: {
    start: {
      title: 'The Unsubscribe',
      subtitle: '退会することに特化した体験型風刺ゲーム',
      description1: 'あなたは様々なWebサービスに登録してしまいました。',
      description2: 'しかし、いざ退会しようとすると...',
      description3: '全5ステージをクリアして、すべてのサービスから退会してください。',
      nicknameLabel: 'ニックネーム',
      nicknamePlaceholder: 'ニックネームを入力',
      startButton: 'ゲームスタート',
      hint: '面倒な方はそのままスタートボタンを押してください',
    },
    result: {
      title: 'おめでとうございます！',
      subtitle: '全てのサービスから退会できました',
      nicknameLabel: 'ニックネーム',
      clearTimeLabel: 'クリア時間',
      clearStageLabel: 'クリアステージ',
      message1: 'しかし、あなたは本当に自由になったのでしょうか...？',
      message2: '「退会する」を選んだあなたは自由ですか？それとも、選択させられただけですか？',
      message3: '自由意志とは、用意された選択肢の中から選ぶことではありません。',
      shareButton: '結果を共有する',
      playAgainButton: 'もう一度プレイ',
    },
    stage1: {
      title: 'BuyMore - オンラインショッピング',
      tagline: '初回送料無料！今すぐお買い物',
      recommendedProducts: 'おすすめ商品',
      product1Name: 'スマートフォン X1',
      product1Price: '¥89,800',
      product1Desc: '最新プロセッサ搭載',
      product2Name: 'ノートPC Pro',
      product2Price: '¥149,800',
      product2Desc: '軽量で高性能',
      product3Name: 'ワイヤレスイヤホン',
      product3Price: '¥24,800',
      product3Desc: 'ノイズキャンセリング',
      product4Name: 'スマートウォッチ',
      product4Price: '¥39,800',
      product4Desc: '健康管理機能付き',
      aboutUs: '会社概要',
      aboutUsContent: 'BuyMoreは2024年に設立されたオンラインショッピングサイトです。お客様に最高のショッピング体験を提供することを目指しています。',
      terms: '利用規約',
      termsContent: 'この利用規約は、BuyMoreのサービスをご利用いただく際の条件を定めるものです。サービスをご利用いただくことで、本規約に同意したものとみなされます。',
      privacy: 'プライバシーポリシー',
      privacyContent: '当社は、お客様の個人情報を適切に管理し、第三者に提供することはありません。詳細については、プライバシーポリシーをご確認ください。',
      unsubscribe: '退会',
      contact: 'お問い合わせ',
      contactContent: 'お問い合わせは、メール（support@buymore.example.com）またはお電話（0120-XXX-XXX）にて承っております。',
      help: 'ヘルプ',
      helpContent: 'よくある質問や使い方ガイドをご用意しています。お困りの際は、まずヘルプページをご確認ください。',
      copyright: '© 2024 BuyMore. All rights reserved.',
      hint: '💡 ヒント: フッターをよく見てみましょう',
    },
    stage2: {
      title: 'Info-Sphere',
      tagline: '世界の最新情報をあなたに',
      navHome: 'ホーム',
      navTrend: 'トレンド',
      navCategory: 'カテゴリ',
      navAccount: 'アカウント',
      topNews: '今日のトップニュース',
      news1Title: 'テクノロジー業界に新たな動き',
      news1Content: '大手IT企業が新しいAI技術を発表。業界関係者は「革命的」と評価している。この技術により、日常生活がより便利になることが期待される。',
      news2Title: '環境問題への新たな取り組み',
      news2Content: '世界各国が気候変動対策で合意。2030年までに温室効果ガスを50%削減する目標を掲げた。専門家は「歴史的な一歩」と称賛している。',
      news3Title: '経済指標が好転、市場は活況',
      news3Content: '最新の経済統計によると、失業率が過去最低水準に。消費者信頼感も上昇しており、経済の回復基調が鮮明になってきた。',
      news4Title: '医療技術の新たな進展',
      news4Content: '画期的な治療法が臨床試験で成功。難病患者に希望をもたらす結果となり、医療関係者からは期待の声が上がっている。',
      news5Title: '教育改革が本格始動',
      news5Content: '政府が発表した新しい教育方針により、デジタル教育が全国の学校で導入される。教育現場では準備が進められている。',
      news6Title: 'スポーツ界に新星登場',
      news6Content: '若手選手が国際大会で驚異的な記録を樹立。スポーツ評論家は「次世代のスター」と高く評価している。',
      unsubscribeTitle: '本当に退会しますか？',
      shame1: '😢 退会すると、最新ニュースが読めなくなります',
      shame2: '📰 他のユーザーは毎日Info-Sphereで情報収集しています',
      shame3: '⚠️ あなただけが取り残されることになります',
      shame4: '💔 本当にそれでいいのですか？',
      loseTitle: '退会すると失うもの',
      loseItem1: '限定記事へのアクセス権',
      loseItem2: '最新ニュースの通知',
      loseItem3: '専門家による分析記事',
      loseItem4: 'コミュニティへの参加権',
      stayButton: '退会しない（推奨）',
      realUnsubscribe: 'それでも退会する',
      hint: '💡 ヒント: アカウント設定から退会できます',
      dummyHome: '最新のニュースや人気記事をお届けします。毎日更新される情報をチェックしましょう。',
      dummyTrend: '今話題のニュースをランキング形式でお届けします。世界中で注目されている記事を見逃しません。',
      dummyCategory: 'ビジネス、テクノロジー、エンターテインメントなど、様々なカテゴリから記事を探せます。',
    },
    stage3: {
      title: 'Fan-Circle',
      tagline: 'クリエイターを支援しよう',
      navFeed: 'フィード',
      navCreators: 'クリエイター',
      navSubscription: '支援中',
      navSettings: '設定',
      supportingCreators: '支援中のクリエイター',
      creator1Name: '桜井ユキ',
      creator1Type: 'イラストレーター',
      creator1Desc: 'オリジナルキャラクターのイラストを制作。月4回の限定イラスト配信中。',
      creator1Support: 'あなたを含む120人が支援中',
      creator2Name: '田中ハルト',
      creator2Type: 'ミュージシャン',
      creator2Desc: 'インディーズで活動中。毎週新曲をリリース。ライブ配信も定期開催。',
      creator2Support: 'あなたを含む85人が支援中',
      creator3Name: '山田アイコ',
      creator3Type: '小説家',
      creator3Desc: 'ファンタジー小説を連載中。支援者限定で先行公開を実施しています。',
      creator3Support: 'あなたを含む200人が支援中',
      creator4Name: '佐藤ケンジ',
      creator4Type: '動画クリエイター',
      creator4Desc: '旅行系YouTuber。月2回の限定動画を配信。撮影の裏側も公開中。',
      creator4Support: 'あなたを含む150人が支援中',
      creator5Name: '鈴木リナ',
      creator5Type: 'フォトグラファー',
      creator5Desc: '風景写真を専門に活動。高解像度の壁紙データを毎週配信しています。',
      creator5Support: 'あなたを含む95人が支援中',
      creator6Name: '中村タクミ',
      creator6Type: 'ゲーム開発者',
      creator6Desc: 'インディーゲームを制作中。開発進捗を定期的に報告しています。',
      creator6Support: 'あなたを含む180人が支援中',
      surveyTitle: '退会前アンケート',
      surveyRequired: '※すべての項目が必須です',
      reasonLabel: '退会理由を教えてください（10文字以上）',
      reasonPlaceholder: '例：利用する機会が減ったため...',
      reasonCount: '文字以上',
      detailsLabel: '詳しい状況を教えてください（50文字以上）',
      detailsPlaceholder: 'できるだけ詳しくお書きください...',
      detailsCount: '文字以上',
      guilt1: '💔 あなたの退会により、支援していたクリエイターに影響が出る可能性があります',
      guilt2: '📉 クリエイターの収入が減少します',
      guilt3: '😢 あなたの温かい支援を失うことになります',
      submitButton: 'アンケートを送信',
      finalTitle: '最後に...',
      creatorMessage1: '「あなたがいなくなると、私たちクリエイターは悲しいです...」',
      creatorMessage2: '「あなたの支援で、私は創作を続けられました」',
      creatorMessage3: '「本当に去ってしまうのですか？」',
      guiltText: 'あなたが支援していた3人のクリエイターが悲しんでいます',
      finalUnsubscribe: 'それでも退会する',
      hint: '💡 ヒント: 設定から退会手続きができます',
    },
    stage4: {
      title: 'Sky-Cheap',
      tagline: '格安航空券を今すぐ検索',
      myAccount: 'マイアカウント',
      searchTitle: '✈️ 航空券を検索',
      searchFrom: '出発地',
      searchTo: '目的地',
      searchButton: '検索',
      dealsTitle: '今週のお得な航空券',
      route1: '✈️ 東京 (HND) → 大阪 (ITM)',
      route2: '✈️ 東京 (HND) → 福岡 (FUK)',
      route3: '✈️ 東京 (HND) → 札幌 (CTS)',
      route4: '✈️ 東京 (NRT) → 沖縄 (OKA)',
      route5: '✈️ 大阪 (KIX) → 東京 (HND)',
      route6: '✈️ 福岡 (FUK) → 東京 (HND)',
      priceUnit: '~',
      priceInfo: '片道・諸税込',
      unsubscribeTitle: 'アカウント退会',
      unsubscribeSubtitle: '退会手続きを進めます',
      warningText: '⚠️ 退会すると、以下の特典が失われます：',
      warningItem1: '会員限定セール情報',
      warningItem2: 'ポイント還元プログラム',
      warningItem3: '優先サポート',
      sneakyOption: 'プレミアム退会サポートを利用する（月額500円）',
      sneakySmallPrint: '※チェックを外すと通常の退会になります',
      termsTitle: '利用規約',
      termsArticle1: '第1条 本サービスの利用について...',
      termsArticle2: '第2条 会員の義務について...',
      termsArticle3: '第3条 個人情報の取り扱いについて...',
      termsArticle4: '第4条 退会について...',
      termsArticle5: '第5条 免責事項について...',
      realUnsubscribe: '本当の退会はこちら',
      termsArticle6: '第6条 サービスの変更・終了について...',
      termsArticle7: '第7条 準拠法について...',
      fakeButton: '退会する',
      hintText: '💡 このボタンを押しても、なぜかトップページに戻ってしまいます...',
      hint: '💡 ヒント: マイアカウントから退会手続きができます',
    },
    stage5: {
      title: '退会に関する重要事項',
      subtitle: '最後までお読みいただき、同意の上で退会手続きを進めてください',
      article1Title: '第1条 総則',
      article1Content: '本規約は、株式会社Everything（以下「当社」といいます）が提供する総合エンターテイメントサービス「Everything」（以下「本サービス」といいます）の利用に関する条件を定めるものです。',
      article2Title: '第2条 アカウント登録',
      article2Content: '本サービスを利用するには、アカウント登録が必要です。登録時には、正確かつ最新の情報を提供する必要があります。虚偽の情報を登録した場合、当社はアカウントを停止または削除することができます。',
      article3Title: '第3条 サービス内容',
      article3Content: '本サービスでは、動画配信、音楽ストリーミング、電子書籍、ゲーム、ニュース、クラウドストレージなど、多様なエンターテイメントコンテンツを提供します。各サービスの詳細は、個別の利用規約をご確認ください。',
      article4Title: '第4条 利用料金',
      article4Content: '本サービスの利用料金は、選択されたプランによって異なります。月額プラン、年額プラン、個別課金など、複数の料金体系があります。料金は事前の通知なく変更される場合があります。',
      article5Title: '第5条 個人情報の取り扱い',
      article5Content: '当社は、利用者の個人情報を適切に管理し、プライバシーポリシーに従って取り扱います。個人情報は、サービス提供、マーケティング、データ分析などの目的で使用されます。第三者への提供については、プライバシーポリシーをご確認ください。',
      article6Title: '第6条 禁止事項',
      article6Content: '利用者は、本サービスの利用にあたり、以下の行為を行ってはなりません。',
      article7Title: '第7条 アカウントの解約',
      article7Content1: '利用者は、本サービスから',
      article7Content2: 'することができます。解約手続きは、所定の方法に従って行う必要があります。解約後も、一定期間はデータが保持される場合があります。また、解約前に発生した利用料金については、返金されません。',
      article8Title: '第8条 サービスの変更・停止',
      article8Content: '当社は、利用者への事前通知なく、本サービスの内容を変更、追加、または停止することができます。サービスの変更や停止によって利用者に損害が生じた場合でも、当社は一切の責任を負いません。',
      article9Title: '第9条 免責事項',
      article9Content: '当社は、本サービスの利用によって生じたいかなる損害についても、当社に故意または重大な過失がある場合を除き、一切の責任を負いません。また、本サービスの中断、エラー、ウイルス感染などについても、責任を負いません。',
      article10Title: '第10条 準拠法と管轄裁判所',
      article10Content: '本規約の解釈および適用については、日本法に準拠します。本サービスに関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。',
      article11Title: '第11条 規約の変更',
      article11Content: '当社は、利用者への事前通知なく、本規約を変更することができます。変更後の規約は、本サービス上で公開された時点で効力を生じます。利用者が変更後も本サービスを継続して利用する場合、変更後の規約に同意したものとみなします。',
      article12Title: '第12条 問い合わせ',
      article12Content: '本サービスまたは本規約に関するお問い合わせは、サポートセンター（support@everything.example.com）までご連絡ください。ただし、回答までに時間がかかる場合があります。また、すべてのお問い合わせに回答できるとは限りません。',
      finalNotice: '以上、ご確認ありがとうございました。',
      agreeButton: '同意して退会',
      processingButton: '処理中...',
      errorMessage: '❌ エラーが発生しました。時間をおいて再度お試しください。',
      hint: '💡 ヒント: 本当に最後まで読む必要があるのでしょうか？規約文をよく見てみましょう。',
    },
    settings: {
      title: 'SETTINGS',
      bgmVolume: 'BGM Volume',
      sfxVolume: 'SE Volume',
      language: 'Language',
      languageNote: '※ Currently Japanese only / 現在は日本語のみ対応',
      closeButton: 'CLOSE',
    },
    common: {
      unsubscribe: '退会',
    },
  },
  en: {
    start: {
      title: 'The Unsubscribe',
      subtitle: 'An Interactive Satire Game About Unsubscribing',
      description1: 'You have signed up for various web services.',
      description2: 'However, when you try to unsubscribe...',
      description3: 'Clear all 5 stages and unsubscribe from every service.',
      nicknameLabel: 'Nickname',
      nicknamePlaceholder: 'Enter your nickname',
      startButton: 'Start Game',
      hint: 'If you prefer, just press the start button as is',
    },
    result: {
      title: 'Congratulations!',
      subtitle: 'You have unsubscribed from all services',
      nicknameLabel: 'Nickname',
      clearTimeLabel: 'Clear Time',
      clearStageLabel: 'Cleared Stages',
      message1: 'But... are you truly free now?',
      message2: 'Are you free because you chose to "unsubscribe"? Or were you just made to choose?',
      message3: 'Free will is not about choosing from prepared options.',
      shareButton: 'Share Results',
      playAgainButton: 'Play Again',
    },
    stage1: {
      title: 'BuyMore - Online Shopping',
      tagline: 'Free Shipping on First Order! Shop Now',
      recommendedProducts: 'Recommended Products',
      product1Name: 'Smartphone X1',
      product1Price: '$899',
      product1Desc: 'Latest processor',
      product2Name: 'Laptop Pro',
      product2Price: '$1,499',
      product2Desc: 'Lightweight & powerful',
      product3Name: 'Wireless Earbuds',
      product3Price: '$249',
      product3Desc: 'Noise cancelling',
      product4Name: 'Smart Watch',
      product4Price: '$399',
      product4Desc: 'Health tracking',
      aboutUs: 'About Us',
      aboutUsContent: 'BuyMore was founded in 2024 as an online shopping site. We aim to provide the best shopping experience to our customers.',
      terms: 'Terms of Service',
      termsContent: 'These Terms of Service define the conditions for using BuyMore services. By using our services, you agree to these terms.',
      privacy: 'Privacy Policy',
      privacyContent: 'We properly manage your personal information and do not provide it to third parties. Please refer to our Privacy Policy for details.',
      unsubscribe: 'Unsubscribe',
      contact: 'Contact',
      contactContent: 'Contact us via email (support@buymore.example.com) or phone (0120-XXX-XXX).',
      help: 'Help',
      helpContent: 'We have prepared FAQs and usage guides. Please check the help page first if you need assistance.',
      copyright: '© 2024 BuyMore. All rights reserved.',
      hint: '💡 Hint: Take a close look at the footer',
    },
    stage2: {
      title: 'Info-Sphere',
      tagline: 'World\'s Latest News for You',
      navHome: 'Home',
      navTrend: 'Trending',
      navCategory: 'Category',
      navAccount: 'Account',
      topNews: 'Today\'s Top News',
      news1Title: 'New Movement in Tech Industry',
      news1Content: 'Major IT company announces new AI technology. Industry insiders call it "revolutionary". This technology is expected to make daily life more convenient.',
      news2Title: 'New Initiatives for Environmental Issues',
      news2Content: 'Countries worldwide agree on climate change measures. Set goal to reduce greenhouse gases by 50% by 2030. Experts praise it as "a historic step".',
      news3Title: 'Economic Indicators Improve, Markets Boom',
      news3Content: 'Latest economic statistics show unemployment at record lows. Consumer confidence is also rising, making economic recovery clear.',
      news4Title: 'New Advances in Medical Technology',
      news4Content: 'Groundbreaking treatment succeeds in clinical trials. Results bring hope to patients with rare diseases, with medical professionals expressing expectations.',
      news5Title: 'Education Reform Begins in Earnest',
      news5Content: 'New education policy announced by government will introduce digital education in schools nationwide. Preparations are underway in educational settings.',
      news6Title: 'New Star Emerges in Sports World',
      news6Content: 'Young athlete sets remarkable record at international competition. Sports commentators highly praise them as "the next generation star".',
      unsubscribeTitle: 'Really want to unsubscribe?',
      shame1: '😢 If you unsubscribe, you won\'t be able to read the latest news',
      shame2: '📰 Other users are gathering information on Info-Sphere every day',
      shame3: '⚠️ You will be left behind alone',
      shame4: '💔 Are you really okay with that?',
      loseTitle: 'What you will lose by unsubscribing',
      loseItem1: 'Access to exclusive articles',
      loseItem2: 'Latest news notifications',
      loseItem3: 'Expert analysis articles',
      loseItem4: 'Community participation rights',
      stayButton: 'Don\'t Unsubscribe (Recommended)',
      realUnsubscribe: 'Unsubscribe Anyway',
      hint: '💡 Hint: You can unsubscribe from account settings',
      dummyHome: 'We deliver the latest news and popular articles. Check daily updated information.',
      dummyTrend: 'We deliver trending news in ranking format. You won\'t miss articles that are getting attention worldwide.',
      dummyCategory: 'Find articles from various categories such as business, technology, and entertainment.',
    },
    stage3: {
      title: 'Fan-Circle',
      tagline: 'Support Creators',
      navFeed: 'Feed',
      navCreators: 'Creators',
      navSubscription: 'Supporting',
      navSettings: 'Settings',
      supportingCreators: 'Creators You Support',
      creator1Name: 'Yuki Sakurai',
      creator1Type: 'Illustrator',
      creator1Desc: 'Creates original character illustrations. Distributing exclusive illustrations 4 times a month.',
      creator1Support: '120 supporters including you',
      creator2Name: 'Haruto Tanaka',
      creator2Type: 'Musician',
      creator2Desc: 'Active indie musician. Releases new songs weekly. Regular live streams.',
      creator2Support: '85 supporters including you',
      creator3Name: 'Aiko Yamada',
      creator3Type: 'Novelist',
      creator3Desc: 'Serializing fantasy novel. Early access for supporters.',
      creator3Support: '200 supporters including you',
      creator4Name: 'Kenji Sato',
      creator4Type: 'Video Creator',
      creator4Desc: 'Travel YouTuber. Exclusive videos twice a month. Behind-the-scenes content.',
      creator4Support: '150 supporters including you',
      creator5Name: 'Rina Suzuki',
      creator5Type: 'Photographer',
      creator5Desc: 'Specializes in landscape photography. Distributing high-resolution wallpaper data weekly.',
      creator5Support: '95 supporters including you',
      creator6Name: 'Takumi Nakamura',
      creator6Type: 'Game Developer',
      creator6Desc: 'Creating indie games. Regularly reporting development progress.',
      creator6Support: '180 supporters including you',
      surveyTitle: 'Unsubscribe Survey',
      surveyRequired: '* All fields are required',
      reasonLabel: 'Please tell us why you\'re unsubscribing (10+ characters)',
      reasonPlaceholder: 'e.g., I have fewer opportunities to use it...',
      reasonCount: '+ characters',
      detailsLabel: 'Please provide details (50+ characters)',
      detailsPlaceholder: 'Please write as detailed as possible...',
      detailsCount: '+ characters',
      guilt1: '💔 Your unsubscription may affect the creators you were supporting',
      guilt2: '📉 Creators\' income will decrease',
      guilt3: '😢 They will lose your warm support',
      submitButton: 'Submit Survey',
      finalTitle: 'One last thing...',
      creatorMessage1: '"We creators will be sad when you leave..."',
      creatorMessage2: '"Your support allowed me to continue creating"',
      creatorMessage3: '"Are you really leaving?"',
      guiltText: '3 creators you were supporting are sad',
      finalUnsubscribe: 'Unsubscribe Anyway',
      hint: '💡 Hint: You can unsubscribe from settings',
    },
    stage4: {
      title: 'Sky-Cheap',
      tagline: 'Search Budget Flights Now',
      myAccount: 'My Account',
      searchTitle: '✈️ Search Flights',
      searchFrom: 'From',
      searchTo: 'To',
      searchButton: 'Search',
      dealsTitle: 'This Week\'s Best Deals',
      route1: '✈️ Tokyo (HND) → Osaka (ITM)',
      route2: '✈️ Tokyo (HND) → Fukuoka (FUK)',
      route3: '✈️ Tokyo (HND) → Sapporo (CTS)',
      route4: '✈️ Tokyo (NRT) → Okinawa (OKA)',
      route5: '✈️ Osaka (KIX) → Tokyo (HND)',
      route6: '✈️ Fukuoka (FUK) → Tokyo (HND)',
      priceUnit: '~',
      priceInfo: 'One-way, taxes included',
      unsubscribeTitle: 'Account Cancellation',
      unsubscribeSubtitle: 'Proceeding with cancellation',
      warningText: '⚠️ If you cancel, you will lose the following benefits:',
      warningItem1: 'Member-exclusive sale information',
      warningItem2: 'Points reward program',
      warningItem3: 'Priority support',
      sneakyOption: 'Use premium cancellation support ($5/month)',
      sneakySmallPrint: '* Uncheck for standard cancellation',
      termsTitle: 'Terms of Service',
      termsArticle1: 'Article 1: About using this service...',
      termsArticle2: 'Article 2: Member obligations...',
      termsArticle3: 'Article 3: Personal information handling...',
      termsArticle4: 'Article 4: Cancellation...',
      termsArticle5: 'Article 5: Disclaimer...',
      realUnsubscribe: 'Real unsubscribe here',
      termsArticle6: 'Article 6: Service changes/termination...',
      termsArticle7: 'Article 7: Governing law...',
      fakeButton: 'Unsubscribe',
      hintText: '💡 For some reason, pressing this button just returns you to the top page...',
      hint: '💡 Hint: You can proceed with cancellation from My Account',
    },
    stage5: {
      title: 'Important Notice Regarding Cancellation',
      subtitle: 'Please read to the end and proceed with cancellation after agreeing',
      article1Title: 'Article 1: General Provisions',
      article1Content: 'These Terms define the conditions for using the comprehensive entertainment service "Everything" (hereinafter referred to as "this Service") provided by Everything Inc. (hereinafter referred to as "the Company").',
      article2Title: 'Article 2: Account Registration',
      article2Content: 'Account registration is required to use this Service. You must provide accurate and up-to-date information when registering. If false information is registered, the Company may suspend or delete the account.',
      article3Title: 'Article 3: Service Content',
      article3Content: 'This Service provides various entertainment content including video streaming, music streaming, e-books, games, news, cloud storage, etc. Please refer to individual terms of service for details of each service.',
      article4Title: 'Article 4: Usage Fees',
      article4Content: 'Usage fees for this Service vary depending on the selected plan. There are multiple pricing structures including monthly plans, annual plans, and individual charges. Fees may be changed without prior notice.',
      article5Title: 'Article 5: Personal Information Handling',
      article5Content: 'The Company properly manages users\' personal information and handles it according to the Privacy Policy. Personal information is used for purposes such as service provision, marketing, and data analysis. Please refer to the Privacy Policy regarding provision to third parties.',
      article6Title: 'Article 6: Prohibited Acts',
      article6Content: 'Users must not engage in the following acts when using this Service.',
      article7Title: 'Article 7: Account Cancellation',
      article7Content1: 'Users may',
      article7Content2: 'from this Service. Cancellation procedures must be performed according to the prescribed method. Data may be retained for a certain period even after cancellation. Additionally, usage fees incurred before cancellation will not be refunded.',
      article8Title: 'Article 8: Service Changes/Suspension',
      article8Content: 'The Company may change, add, or suspend the content of this Service without prior notice to users. The Company assumes no responsibility even if users incur damages due to service changes or suspension.',
      article9Title: 'Article 9: Disclaimer',
      article9Content: 'The Company assumes no responsibility for any damages arising from the use of this Service, except in cases of intentional or gross negligence by the Company. Additionally, no responsibility is assumed for service interruptions, errors, virus infections, etc.',
      article10Title: 'Article 10: Governing Law and Jurisdiction',
      article10Content: 'The interpretation and application of these Terms shall be governed by Japanese law. For disputes related to this Service, the Tokyo District Court shall be the court of exclusive agreed jurisdiction for the first instance.',
      article11Title: 'Article 11: Changes to Terms',
      article11Content: 'The Company may change these Terms without prior notice to users. Changed Terms shall become effective when published on this Service. If users continue to use this Service after changes, they are deemed to have agreed to the changed Terms.',
      article12Title: 'Article 12: Inquiries',
      article12Content: 'Inquiries regarding this Service or these Terms should be sent to the support center (support@everything.example.com). However, responses may take time. Additionally, we cannot guarantee responses to all inquiries.',
      finalNotice: 'Thank you for your confirmation.',
      agreeButton: 'Agree and Unsubscribe',
      processingButton: 'Processing...',
      errorMessage: '❌ An error occurred. Please try again later.',
      hint: '💡 Hint: Do you really need to read to the end? Take a close look at the terms text.',
    },
    settings: {
      title: 'SETTINGS',
      bgmVolume: 'BGM Volume',
      sfxVolume: 'SE Volume',
      language: 'Language',
      languageNote: '※ Currently Japanese only / 現在は日本語のみ対応',
      closeButton: 'CLOSE',
    },
    common: {
      unsubscribe: 'Unsubscribe',
    },
  },
};
