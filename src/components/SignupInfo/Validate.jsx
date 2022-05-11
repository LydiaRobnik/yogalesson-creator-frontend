import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import './validate.scss';

export default function Validate() {
  const { login } = useContext(AuthContext);
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    asanaService
      .validateUser(token)
      .then((user) => {
        console.log('user', user);
        // todo autologin
        login({
          user: user.email,
          type: 'email',
          password: '5555' // todo
        })
          .then(([result, data]) => {
            if (!result) {
              setError(data.message);
            }
            console.log('result', result);
          })
          .catch((err) => {
            setError(err.message);
          });
      })
      .catch((err) => {
        setError(err.message);
      });

    return () => {};
  }, [token]);

  return (
    <div className="text-black p-4">
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="cont1 text-black flex-col py-5 mt-5">
          <p className="text-2xl">
            Success! Thank you for validating your email!
          </p>
          <button
            className="btn-bb bg-blue-light hover:bg-blue-middle p-2 mt-5"
            onClick={() => navigate('/user')}
          >
            Start creating your first class
          </button>
        </div>
      )}
    </div>
  );
}
