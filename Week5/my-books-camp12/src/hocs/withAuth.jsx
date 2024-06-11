import React from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(Component) {
  function WrappingComponent(props) {
    const token = localStorage.getItem('token');
    if (token === null) {
      return <Redirect to="/signin" />;
    }

    return <Component {...props} token={token} />;
  }

  WrappingComponent.displayName = `withAuth(${Component.displayName})`;

  return WrappingComponent;
}
