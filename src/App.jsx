import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthState from "./context/AuthContext";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import UserSection from "./components/User/UserSection";
import Dashboard from "./components/Dashboard/Dashboard";
import Planner from "./components/Planner/Planner";
import Page404 from "./components/Error/404";
import Page403 from "./components/Error/403";
import "./style/app.scss";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
              <Route
                path="dashboard"
                element={
                  <Dashboard loading={loading} setLoading={setLoading} />
                }
              />
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
