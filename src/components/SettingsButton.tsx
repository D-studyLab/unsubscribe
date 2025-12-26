import { useState } from 'react';
import { SettingsModal } from './SettingsModal';
import './SettingsButton.css';

export const SettingsButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button className="settings-button" onClick={handleOpen} title="設定">
        ⚙️
      </button>
      <SettingsModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
};
