import {
    changeId,
    changePass,
    login,
    loginSubmit,
    getLoginState,
    logout,
} from 'store/features/auth/loginReducer';
import { LoginState } from 'store/features/auth/loginAction';
import { useDispatch, useSelector } from 'react-redux';

export const useAuthState = (): LoginState => {
    return useSelector(getLoginState);
};

export const useAuthDispatch = () => {
    const dispatch = useDispatch();
    return {
        changeId: (id: string) => dispatch(changeId(id)),
        changePass: (pass: string) => dispatch(changePass(pass)),
        login: (id: string, password: string) =>
            dispatch(loginSubmit({ id, password })),
        logout: () => dispatch(logout()),
    };
};

export default {
    changeId,
    changePass,
    login,
    loginSubmit,
    getLoginState,
    logout,
};
