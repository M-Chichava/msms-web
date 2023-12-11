import initialAuthState from '../../actions/auth/state';
import { actionType } from '../../actions/auth/types';

export const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case actionType.loginSuccess:
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };

        case actionType.loginError:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.error,
            };

        case actionType.logoutSuccess:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            };

        case actionType.logoutError:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.error,
            };

        case actionType.registerSuccess:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };

        case actionType.registerError:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.error,
            };

        case actionType.resetPasswordSuccess:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            };

        case actionType.resetPasswordError:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.error,
            };

        case actionType.updatePasswordSuccess:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            };

        case actionType.updatePasswordError:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.error,
            };

        case actionType.updateProfileSuccess:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };

        case actionType.updateProfileError:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.error,
            };

        case actionType.deleteUserSuccess:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            };

        case actionType.deleteUserError:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.error,
            };

        default:
            return state;
    }
};
