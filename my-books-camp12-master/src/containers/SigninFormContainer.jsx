import React from 'react';
import SigninForm from '../components/SigninForm';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { startLogin } from '../redux/modules/auth';

export default function SigninFormContainer() {
  // mapStateToProps
  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const login = useCallback(
    async (email, password) => {
      dispatch(startLogin(email, password));
    },
    [dispatch],
  );
  return <SigninForm loading={loading} error={error} login={login} />;
}
