import { useState, useEffect } from 'react';
import { loadSettings, saveSettings } from '../utils/settings';
import { audioManager } from '../utils/audio';
import { useLanguage } from '../contexts';
import './SettingsModal.css';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { language: currentLang, setLanguage: setGlobalLanguage, t } = useLanguage();
  const [bgmVolume, setBgmVolume] = useState(15);
  const [sfxVolume, setSfxVolume] = useState(30);

  // モーダルが開いたときに設定を読み込む
  useEffect(() => {
    if (isOpen) {
      const settings = loadSettings();
      setBgmVolume(settings.bgmVolume);
      setSfxVolume(settings.sfxVolume);
    }
  }, [isOpen]);

  const handleBgmVolumeChange = (value: number) => {
    setBgmVolume(value);
    audioManager.setBGMVolume(value);
    const settings = loadSettings();
    settings.bgmVolume = value;
    saveSettings(settings);
  };

  const handleSfxVolumeChange = (value: number) => {
    setSfxVolume(value);
    audioManager.setSFXVolume(value);
    // テスト再生
    audioManager.playClick();
    const settings = loadSettings();
    settings.sfxVolume = value;
    saveSettings(settings);
  };

  const handleLanguageToggle = () => {
    const newLanguage = currentLang === 'ja' ? 'en' : 'ja';
    setGlobalLanguage(newLanguage);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // オーバーレイ自体がクリックされた場合のみ閉じる
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={handleOverlayClick}>
      <div className="settings-modal">
        <div className="settings-header">
          <h2 className="settings-title">{t.settings.title}</h2>
          <button className="settings-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="settings-content">
          {/* BGM音量 */}
          <div className="settings-item">
            <label className="settings-label">
              {t.settings.bgmVolume}
              <span className="settings-value">{bgmVolume}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={bgmVolume}
              onChange={(e) => handleBgmVolumeChange(Number(e.target.value))}
              className="settings-slider"
            />
          </div>

          {/* SE音量 */}
          <div className="settings-item">
            <label className="settings-label">
              {t.settings.sfxVolume}
              <span className="settings-value">{sfxVolume}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={sfxVolume}
              onChange={(e) => handleSfxVolumeChange(Number(e.target.value))}
              className="settings-slider"
            />
          </div>

          {/* 言語設定 */}
          <div className="settings-item">
            <label className="settings-label">{t.settings.language}</label>
            <button className="language-toggle" onClick={handleLanguageToggle}>
              {currentLang === 'ja' ? '日本語' : 'English'}
            </button>
          </div>
        </div>

        <div className="settings-footer">
          <button className="settings-close-button" onClick={onClose}>
            {t.settings.closeButton}
          </button>
        </div>
      </div>
    </div>
  );
};
