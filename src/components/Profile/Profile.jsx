import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Profile() {
  const { loggedIn, login, logout, user } = useContext(AuthContext);

  return <div className="text-7xl">HELLO {user.name}</div>;
}
