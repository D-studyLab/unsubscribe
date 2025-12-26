import { useState, useEffect } from 'react';
import { loadSettings, saveSettings } from '../utils/settings';
import { audioManager } from '../utils/audio';
import './SettingsModal.css';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [bgmVolume, setBgmVolume] = useState(15);
  const [sfxVolume, setSfxVolume] = useState(30);
  const [language, setLanguage] = useState<'ja' | 'en'>('ja');

  // モーダルが開いたときに設定を読み込む
  useEffect(() => {
    if (isOpen) {
      const settings = loadSettings();
      setBgmVolume(settings.bgmVolume);
      setSfxVolume(settings.sfxVolume);
      setLanguage(settings.language);
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
    const newLanguage = language === 'ja' ? 'en' : 'ja';
    setLanguage(newLanguage);
    const settings = loadSettings();
    settings.language = newLanguage;
    saveSettings(settings);
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
          <h2 className="settings-title">SETTINGS</h2>
          <button className="settings-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="settings-content">
          {/* BGM音量 */}
          <div className="settings-item">
            <label className="settings-label">
              BGM Volume
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
              SE Volume
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
            <label className="settings-label">Language</label>
            <button className="language-toggle" onClick={handleLanguageToggle}>
              {language === 'ja' ? '日本語' : 'English'}
            </button>
            <p className="settings-note">
              ※ Currently Japanese only / 現在は日本語のみ対応
            </p>
          </div>
        </div>

        <div className="settings-footer">
          <button className="settings-close-button" onClick={onClose}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
