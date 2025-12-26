// 音声ユーティリティ - Web Audio APIを使用
import { loadSettings } from './settings';

class AudioManager {
  private audioContext: AudioContext | null = null;
  private bgmGainNode: GainNode | null = null;
  private sfxGainNode: GainNode | null = null;
  private isMuted: boolean = false;
  private bgmAudio: HTMLAudioElement | null = null;

  constructor() {
    // ユーザーインタラクション後に初期化
    this.initAudioContext();
    // LocalStorageから設定を読み込む
    this.loadSettingsFromStorage();
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      // BGM用のゲインノード
      this.bgmGainNode = this.audioContext.createGain();
      this.bgmGainNode.gain.value = 0.15; // BGMの音量（初期値、後でloadSettingsで上書き）
      this.bgmGainNode.connect(this.audioContext.destination);

      // 効果音用のゲインノード
      this.sfxGainNode = this.audioContext.createGain();
      this.sfxGainNode.gain.value = 0.3; // 効果音の音量（初期値、後でloadSettingsで上書き）
      this.sfxGainNode.connect(this.audioContext.destination);
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  // LocalStorageから設定を読み込んで適用
  private loadSettingsFromStorage() {
    const settings = loadSettings();
    this.setBGMVolume(settings.bgmVolume);
    this.setSFXVolume(settings.sfxVolume);
  }

  // ボタンクリック音（短いビープ）
  playClick() {
    if (!this.audioContext || !this.sfxGainNode || this.isMuted) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.sfxGainNode);

    oscillator.frequency.value = 800;
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  // ステージクリア音（上昇音）
  playSuccess() {
    if (!this.audioContext || !this.sfxGainNode || this.isMuted) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.sfxGainNode);

    oscillator.frequency.setValueAtTime(523, this.audioContext.currentTime); // C5
    oscillator.frequency.exponentialRampToValueAtTime(784, this.audioContext.currentTime + 0.15); // G5
    oscillator.frequency.exponentialRampToValueAtTime(1047, this.audioContext.currentTime + 0.3); // C6
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.6, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.4);
  }

  // エラー音（不快な低音）
  playError() {
    if (!this.audioContext || !this.sfxGainNode || this.isMuted) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.sfxGainNode);

    oscillator.frequency.value = 200;
    oscillator.type = 'sawtooth';

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.4);
  }

  // BGM開始（外部音源対応）
  startBGM() {
    if (this.isMuted || this.bgmAudio) return;

    this.bgmAudio = new Audio('/bgm.mp3');
    this.bgmAudio.loop = true;
    this.bgmAudio.volume = 0.15;
    this.bgmAudio.play().catch(error => {
      console.warn('BGM再生失敗:', error);
    });
  }

  // BGM停止
  stopBGM() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.bgmAudio.currentTime = 0;
      this.bgmAudio = null;
    }
  }

  // ミュート切り替え
  toggleMute() {
    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      this.stopBGM();
    } else {
      // ミュート解除時にBGMを再開
      this.startBGM();
    }

    return this.isMuted;
  }

  // ミュート状態を取得
  getMuteState() {
    return this.isMuted;
  }

  // AudioContextの状態をresumeする（ユーザーインタラクション後）
  resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // BGM音量を設定（0-100の値を受け取る）
  setBGMVolume(volume: number) {
    const normalizedVolume = Math.max(0, Math.min(100, volume)) / 100;
    if (this.bgmAudio) {
      this.bgmAudio.volume = normalizedVolume;
    }
  }

  // SE音量を設定（0-100の値を受け取る）
  setSFXVolume(volume: number) {
    const normalizedVolume = Math.max(0, Math.min(100, volume)) / 100;
    if (this.sfxGainNode) {
      this.sfxGainNode.gain.value = normalizedVolume;
    }
  }

  // 現在のBGM音量を取得（0-100）
  getBGMVolume(): number {
    if (this.bgmAudio) {
      return Math.round(this.bgmAudio.volume * 100);
    }
    return 15; // デフォルト値
  }

  // 現在のSE音量を取得（0-100）
  getSFXVolume(): number {
    if (this.sfxGainNode) {
      return Math.round(this.sfxGainNode.gain.value * 100);
    }
    return 30; // デフォルト値
  }
}

// シングルトンインスタンス
export const audioManager = new AudioManager();
