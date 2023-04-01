import { useAuthDispatch } from 'store/features/auth';
import { useEffect } from 'react';

const LogoutPage = () => {
    const dispatch = useAuthDispatch();

    useEffect(() => {
        dispatch.logout();
    }, []);

    return null;
};

export default LogoutPage;
