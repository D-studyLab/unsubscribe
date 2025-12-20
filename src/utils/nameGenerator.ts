// ランダムなニックネームを生成する

const ADJECTIVES = [
  'ハッピー', 'ラッキー', 'ブレイブ', 'スウィフト', 'クレバー',
  'ジェントル', 'ワイルド', 'クール', 'ファンキー', 'チアフル',
];

const NOUNS = [
  'タイガー', 'イーグル', 'ドルフィン', 'フェニックス', 'ドラゴン',
  'ウルフ', 'パンダ', 'ファルコン', 'ライオン', 'ベア',
];

export const generateRandomName = (): string => {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const number = Math.floor(Math.random() * 1000);
  return `${adjective}${noun}${number}`;
};
