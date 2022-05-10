import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupInfo() {
  const navigate = useNavigate();
  // console.log('🔥', 'SignupInfo');

  return (
    <div className="text-black flex justify-center">
      <p className="text-2xl">
        An E-Mail has been sent to you, please verify your E-Mail by clicking on
        the Verification-Link shown in the E-Mail.
      </p>
      <button className="btn-neutra mx-2" onClick={() => navigate('/home')}>
        go back to home
      </button>
    </div>
  );
}
