import { useState } from 'react';
import { audioManager } from '../utils/audio';
import './AudioControl.css';

export const AudioControl: React.FC = () => {
  const [isMuted, setIsMuted] = useState(audioManager.getMuteState());

  const handleToggleMute = () => {
    const newMuteState = audioManager.toggleMute();
    setIsMuted(newMuteState);
  };

  return (
    <button className="audio-control" onClick={handleToggleMute} title={isMuted ? '音声ON' : '音声OFF'}>
      {isMuted ? '🔇' : '🔊'}
    </button>
  );
};
