// 言語設定を管理するContext

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { translations, Translations } from '../i18n/translations';
import { loadSettings, saveSettings } from '../utils/settings';

type Language = 'ja' | 'en';

interface LanguageContextType {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // 初期言語を設定から読み込む
    const settings = loadSettings();
    return settings.language;
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    // 設定に保存
    const settings = loadSettings();
    settings.language = lang;
    saveSettings(settings);
  }, []);

  // 現在の言語の翻訳オブジェクトを取得
  const t = translations[language];

  useEffect(() => {
    // 言語が変更されたら設定を同期
    const settings = loadSettings();
    if (settings.language !== language) {
      setLanguageState(settings.language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
