// ランダムなニックネームを生成する

import { loadSettings } from './settings';

const ADJECTIVES_JA = [
  'ハッピー', 'ラッキー', 'ブレイブ', 'スウィフト', 'クレバー',
  'ジェントル', 'ワイルド', 'クール', 'ファンキー', 'チアフル',
];

const NOUNS_JA = [
  'タイガー', 'イーグル', 'ドルフィン', 'フェニックス', 'ドラゴン',
  'ウルフ', 'パンダ', 'ファルコン', 'ライオン', 'ベア',
];

const ADJECTIVES_EN = [
  'Happy', 'Lucky', 'Brave', 'Swift', 'Clever',
  'Gentle', 'Wild', 'Cool', 'Funky', 'Cheerful',
];

const NOUNS_EN = [
  'Tiger', 'Eagle', 'Dolphin', 'Phoenix', 'Dragon',
  'Wolf', 'Panda', 'Falcon', 'Lion', 'Bear',
];

export const generateRandomName = (): string => {
  const settings = loadSettings();
  const isEnglish = settings.language === 'en';

  const adjectives = isEnglish ? ADJECTIVES_EN : ADJECTIVES_JA;
  const nouns = isEnglish ? NOUNS_EN : NOUNS_JA;

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 1000);
  return `${adjective}${noun}${number}`;
};
