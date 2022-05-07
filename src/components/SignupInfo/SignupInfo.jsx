import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupInfo() {
  const navigate = useNavigate();
  // console.log('🔥', 'SignupInfo');

  return (
    <div className="text-black p-4">
      <div className="text-2xl">
        An Email has been sent to you, please verify your email by clicking the
        Verification-Link shown in the mail.
      </div>

      <div className="grow w-4/6 md:w-5/6 flex flex-row flex-wrap">
        <button
          className="btn-blue btn-blue:hover mx-2 flex flex-row items-center"
          onClick={() => navigate('/home')}
        >
          {/* <span className="font-material inline pr-2">add</span> */}
          <p className="inline pt-1 text-lg ">Home</p>
        </button>
      </div>
    </div>
  );
}
