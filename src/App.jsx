import { Route, Routes } from 'react-router-dom';
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
  return (
    <>
      <AuthState>
        <Routes>
          <Route path={`/`} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={`user`} element={<UserSection />}>
              <Route index element={<Dashboard />} />
              <Route path="planner" element={<Planner />} />
            </Route>
            {/* <Route path="/contact" element={<Contact />} />  */}
            <Route path={`/403`} element={<Page403 />} />
          </Route>
          <Route path={`/403`} element={<Page403 />} />
          <Route element={<Page404 />} /> {/* ! todo doesnt work  */}
        </Routes>
      </AuthState>
    </>
  );
}

export default App;
