import React from 'react';

export default function Dashboard() {
  return (
    <div className="flex flex-col text-purple-500">
      <div>
        <a
          href="https://github.com/TomEsDE/yogalesson-creator-frontend"
          target={'_blank'}
        >
          Github Frontend
        </a>
      </div>
      <div>
        <a
          href="https://github.com/TomEsDE/yogalesson-creator-backend"
          target={'_blank'}
        >
          Github Backend
        </a>
      </div>
    </div>
  );
}
