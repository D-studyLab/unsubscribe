// ルーティング設定

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StartPage, ResultPage } from './pages';
import { Stage1, Stage2, Stage3, Stage4, Stage5 } from './stages';
import { ROUTES } from './constants';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.START} element={<StartPage />} />
        <Route path={ROUTES.STAGE_1} element={<Stage1 />} />
        <Route path={ROUTES.STAGE_2} element={<Stage2 />} />
        <Route path={ROUTES.STAGE_3} element={<Stage3 />} />
        <Route path={ROUTES.STAGE_4} element={<Stage4 />} />
        <Route path={ROUTES.STAGE_5} element={<Stage5 />} />
        <Route path={ROUTES.RESULT} element={<ResultPage />} />
        <Route path="*" element={<Navigate to={ROUTES.START} replace />} />
      </Routes>
    </BrowserRouter>
  );
};
