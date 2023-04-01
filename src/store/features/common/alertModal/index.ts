import {
    showAlert,
    closeAlert,
    errorAlert,
    getAlertState,
} from 'store/features/common/alertModal/alertModalReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AlertModalState } from './alertModalAction';

export const useAlertModalState = (): AlertModalState => {
    return useSelector(getAlertState);
};

export const useAlertModalDispatch = () => {
    const dispatch = useDispatch();
    return {
        showAlert: (title: string, message: string, refresh?: boolean) =>
            dispatch(
                showAlert({
                    title,
                    message,
                    show: true,
                    refresh,
                }),
            ),
        closeAlert: () => dispatch(closeAlert()),
        errorAlert: (
            res: any,
            fallback?: { title: string; message: string },
            refresh?: boolean,
        ) => dispatch(errorAlert({ res, fallback, refresh })),
    };
};

export default {
    showAlert,
    closeAlert,
    errorAlert,
    getAlertState,
};
