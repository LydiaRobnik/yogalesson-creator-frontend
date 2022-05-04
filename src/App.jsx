import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import UserSection from './components/User/UserSection';
import Dashboard from './components/Dashboard/Dashboard';
import Planner from './components/Planner/Planner';
import Asanas from './components/Asanas/Asanas';
import SequenceCollection from './components/SequenceCollection/SequenceCollection';
import ClassCollection from './components/ClassCollection/ClassCollection';
import Calendar from './components/Calendar/Calendar';
import Page404 from './components/Error/404';
import Page403 from './components/Error/403';
import './style/app.scss';
import AuthState from './context/AuthContext';

function App() {
  const navigate = useNavigate();

  return (
    <div id="app">
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
              <Route path="planner" element={<Planner />}>
                <Route path=":classId" element={<Planner />} />
              </Route>
              <Route path="asanas" element={<Asanas />} />
              <Route path="classes" element={<ClassCollection />} />
              <Route path="sequences" element={<SequenceCollection />} />
              <Route path="calendar" element={<Calendar />} />
            </Route>
            <Route path={`/403`} element={<Page403 />} />
          </Route>
          <Route path={`/403`} element={<Page403 />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </AuthState>
    </div>
  );
}

export default App;
