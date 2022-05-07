import loginModule from '../../store/features/auth';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const LogoutPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginModule.logout());
  }, []);

  return null;
};

export default LogoutPage;
