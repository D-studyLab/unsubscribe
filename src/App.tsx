import React from 'react';
import { GameProvider, LanguageProvider } from './contexts';
import { AppRouter } from './router';

function App() {
  return (
    <LanguageProvider>
      <GameProvider>
        <AppRouter />
      </GameProvider>
    </LanguageProvider>
  );
}

export default App;
