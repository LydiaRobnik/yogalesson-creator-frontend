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
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SignupInfo from './components/SignupInfo/SignupInfo';
import Validate from './components/SignupInfo/Validate';
import Profile from './components/Profile/Profile';
import Print from './components/Print/Print';

function App() {
  const navigate = useNavigate();

  return (
    <div id="app">
      <AuthState>
        <DndProvider backend={HTML5Backend}>
          <Routes>
            {/* home without navbar */}
            <Route path={`/home`} element={<Home />} />
            <Route path={`/signupInfo`} element={<SignupInfo />} />
            <Route path={`/validate/:token`} element={<Validate />} />
            {/* standard layout with navbar */}
            <Route path={`/`} element={<Layout />}>
              <Route index red element={<Navigate replace to="/home" />} />
              {/* protected user section */}
              <Route path={`user`} element={<UserSection />}>
                <Route
                  index
                  red
                  element={<Navigate replace to="dashboard" />}
                />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="planner" element={<Print />}>
                  <Route path=":classId" element={<Print />} />
                </Route>
                <Route path="asanas" element={<Asanas />} />
                <Route path="classes" element={<ClassCollection />} />
                <Route path="sequences" element={<SequenceCollection />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path={`/403`} element={<Page403 />} />
            </Route>
            <Route path={`/403`} element={<Page403 />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </DndProvider>
      </AuthState>
    </div>
  );
}

export default App;
