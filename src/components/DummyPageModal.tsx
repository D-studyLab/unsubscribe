import React from 'react';
import './DummyPageModal.css';

interface DummyPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export const DummyPageModal: React.FC<DummyPageModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
}) => {
  if (!isOpen) return null;

  return (
    <div className="dummy-modal-overlay" onClick={onClose}>
      <div className="dummy-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="dummy-modal-header">
          <h2>{title}</h2>
          <button className="dummy-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="dummy-modal-body">
          <p>{content}</p>
        </div>
        <div className="dummy-modal-footer">
          <button className="dummy-modal-back-button" onClick={onClose}>
            戻る
          </button>
        </div>
      </div>
    </div>
  );
};
