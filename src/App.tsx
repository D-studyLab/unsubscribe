import React from 'react';
import { GameProvider } from './contexts';
import { AppRouter } from './router';

function App() {
  return (
    <GameProvider>
      <AppRouter />
    </GameProvider>
  );
}

export default App;
