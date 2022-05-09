import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../api/http-common';

export const AuthContext = createContext();

const AuthState = ({ children }) => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');

    token && token !== 'undefined' && getUserdata(token);
  }, []);

  const login = async (user) => {
    try {
      const res = await http().post('/auth/login', user);
      localStorage.setItem('token', res.data.token);

      await getUserdata(res.data.token);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const signup = async (user) => {
    try {
      const res = await http().post('/auth/signup', user);
      // localStorage.setItem("token", res.data.token);
      // await getUserdata(res.data.token);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUser({});
    navigate(`/`);
  };

  async function getUserdata(token) {
    const resp = await http(token).get('/auth/verify');

    if (resp.status !== 200) {
      logout();
    }

    setLoggedIn(true);
    resp.data.token = token;
    console.log('🧑‍💼 user jwt', resp.data);
    setUser(resp.data);
  }

  return (
    <AuthContext.Provider
      value={{ logout, loggedIn, user, setUser, signup, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
