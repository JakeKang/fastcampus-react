import React from 'react';
import SigninFormContainer from '../containers/SigninFormContainer';
import useAuth from '../hooks/useAuth';

export default function Signin() {
  useAuth(false);
  return (
    <div>
      <h1>Signin</h1>
      <SigninFormContainer />
    </div>
  );
}
