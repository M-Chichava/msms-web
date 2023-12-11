import {actionType} from "./types";
import {User} from "../../../models/user";

export const loginSuccess = (user: User) => ({
    type: actionType.loginSuccess,
    payload: {user, isAuthenticated: true},
});

export const loginError = (error: string) => ({
    type: actionType.loginError,
    error,
});

export const isLoged = (isAuthenticated: boolean) => ({
    type: actionType.isAuthenticated,
    payload: isAuthenticated
});

export const logoutSuccess = () => ({
    type: actionType.logoutSuccess,
    payload: { isAuthenticated: false }
});

export const logoutError = (error: string) => ({
    type: actionType.logoutError,
    error,
});

export const registerSuccess = (user: User) => ({
    type: actionType.registerSuccess,
    payload: user,
});

export const registerError = (error: string) => ({
    type: actionType.registerError,
    error,
});

export const resetPasswordSuccess = () => ({
    type: actionType.resetPasswordSuccess,
});

export const resetPasswordError = (error: string) => ({
    type: actionType.resetPasswordError,
    error,
});

export const updatePasswordSuccess = () => ({
    type: actionType.updatePasswordSuccess,
});

export const updatePasswordError = (error: string) => ({
    type: actionType.updatePasswordError,
    error,
});

export const updateProfileSuccess = (user: User) => ({
    type: actionType.updateProfileSuccess,
    payload: user,
});

export const updateProfileError = (error: string) => ({
    type: actionType.updateProfileError,
    error,
});

export const deleteUserSuccess = () => ({
    type: actionType.deleteUserSuccess,
});

export const deleteUserError = (error: string) => ({
    type: actionType.deleteUserError,
    error,
});
