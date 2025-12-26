import './Loading.css';

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = '読み込み中...' }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner-bar"></div>
          <div className="spinner-bar"></div>
          <div className="spinner-bar"></div>
        </div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
};
