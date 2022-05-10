import React from 'react';
import { useNavigate } from 'react-router-dom';
import './signupInfo.scss';

export default function SignupInfo() {
  const navigate = useNavigate();
  // console.log('🔥', 'SignupInfo');

  return (
    <div className="cont1 text-black flex-col py-5">
      <p className="text-2xl">
        An E-Mail has been sent to you, please verify your E-Mail by clicking on
        the Verification-Link shown in the E-Mail.
      </p>
      <button
        className="btn-bb bg-blue-light hover:bg-blue-middle p-2 mt-5"
        onClick={() => navigate('/home')}
      >
        go back to home
      </button>
    </div>
  );
}
