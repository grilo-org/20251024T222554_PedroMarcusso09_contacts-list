import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProtectedRoutes } from '../routes/ProtectedRoutes';
import { PublicRoutes } from './PublicRoutes/index.tsx';
import { ContactsProvider } from '../providers/ContactsContext/ContactsContext.tsx';

export const RoutesMain = () => {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route
          path="/dashboard"
          element={
            <ContactsProvider>
              <DashboardPage />
            </ContactsProvider>
          }
        />
      </Route>
    </Routes>
  );
};
