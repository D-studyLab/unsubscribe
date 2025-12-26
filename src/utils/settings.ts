// 設定管理ユーティリティ - LocalStorageを使用

export interface GameSettings {
  bgmVolume: number;      // 0-100
  sfxVolume: number;      // 0-100
  language: 'ja' | 'en';
}

const SETTINGS_KEY = 'gameSettings';

const DEFAULT_SETTINGS: GameSettings = {
  bgmVolume: 15,
  sfxVolume: 30,
  language: 'ja',
};

// 設定を読み込む
export function loadSettings(): GameSettings {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (!stored) {
      return { ...DEFAULT_SETTINGS };
    }
    const parsed = JSON.parse(stored) as Partial<GameSettings>;
    // デフォルト値とマージ（新しい設定項目が追加された場合に対応）
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
    };
  } catch (error) {
    console.warn('Failed to load settings:', error);
    return { ...DEFAULT_SETTINGS };
  }
}

// 設定を保存する
export function saveSettings(settings: GameSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.warn('Failed to save settings:', error);
  }
}

// 特定の設定を更新する
export function updateSetting<K extends keyof GameSettings>(
  key: K,
  value: GameSettings[K]
): void {
  const settings = loadSettings();
  settings[key] = value;
  saveSettings(settings);
}

// 設定をリセットする
export function resetSettings(): void {
  saveSettings({ ...DEFAULT_SETTINGS });
}
