import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import './style/app.scss';
import AuthState from './context/AuthContext';
import UserSection from './components/user/UserSection';
import Dashboard from './components/user/Dashboard';
import Planner from './components/user/Planner';
import Page403 from './components/403';
import Page404 from './components/404';

function App() {
  const navigate = useNavigate();
  return (
    <>
      <AuthState>
        <Routes>
          {/* home without navbar */}
          <Route path={`/home`} element={<Home />} />
          {/* standard layout with navbar */}
          <Route path={`/`} element={<Layout />}>
            <Route index red element={<Navigate replace to="/home" />} />
            {/* protected user section */}
            <Route path={`user`} element={<UserSection />}>
              <Route index red element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="planner" element={<Planner />} />
            </Route>
            <Route path={`/403`} element={<Page403 />} />
          </Route>
          <Route path={`/403`} element={<Page403 />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </AuthState>
    </>
  );
}

export default App;
