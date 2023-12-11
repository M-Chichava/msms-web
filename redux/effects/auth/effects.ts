import axios from 'axios';
import {
    loginSuccess,
    loginError,
    logoutSuccess,
    logoutError,
    registerSuccess,
    registerError,
    resetPasswordSuccess,
    resetPasswordError,
    updatePasswordSuccess,
    isLoged,
    updatePasswordError,
    updateProfileSuccess,
    updateProfileError,
    deleteUserSuccess,
    deleteUserError,
} from '../../actions/auth/creators';
import {API_URL} from "../../../api/config/config";
import router from 'next/router'
import {User} from "../../../models/user";
import {setCookie, destroyCookie} from "nookies";

export const login = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {email, password});
        const user : User = response.data;

        localStorage.setItem('userToken', user.token);
        setCookie(
            undefined,
            'microcredit.token',
            user.token,
            {maxAge: 60 * 60 * 1 }
        );
        dispatch(loginSuccess(user));
        dispatch(isLoged(true))
        router.push('/microcredit')
    } catch (error) {
        dispatch(loginError(error.message));
    }
};

const refreshAccessToken = async () => {
    try {

        const response = await axios.post(`${API_URL}/auth/refreshToken`, {token: '', refreshToken: ''});
        const user = response.data;
        localStorage.setItem('userToken', user.token);
        setCookie(undefined, 'microcredit.token', user.token, { maxAge: 60 * 60 * 1 });
        return user.token;
    } catch (error) {
        throw error;
    }
};

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('userToken');
        destroyCookie(undefined, 'userToken')
        dispatch(logoutSuccess());
        dispatch(isLoged(false))
        router.push('/auth/login')

    } catch (error) {
        dispatch(logoutError(error.message));
    }
};

// Effect for user registration
export const register = (user) => async (dispatch) => {
    try {
        // Send a request to your authentication API (e.g., registration endpoint)
        const response = await axios.post('/api/register', user);
        const newUser = response.data;

        dispatch(registerSuccess(newUser));
    } catch (error) {
        dispatch(registerError(error.message));
    }
};

// Effect for resetting password
export const resetPassword = (email) => async (dispatch) => {
    try {
        // Send a request to your authentication API (e.g., reset password endpoint)
        await axios.post('/api/reset-password', { email });

        dispatch(resetPasswordSuccess());
    } catch (error) {
        dispatch(resetPasswordError(error.message));
    }
};

// Effect for updating password
export const updatePassword = (password) => async (dispatch) => {
    try {
        // Send a request to your authentication API (e.g., update password endpoint)
        await axios.put('/api/update-password', { password });

        dispatch(updatePasswordSuccess());
    } catch (error) {
        dispatch(updatePasswordError(error.message));
    }
};

// Effect for updating user profile
export const updateProfile = (user) => async (dispatch) => {
    try {
        // Send a request to your authentication API (e.g., update profile endpoint)
        const response = await axios.put('/api/update-profile', user);
        const updatedUser = response.data;

        dispatch(updateProfileSuccess(updatedUser));
    } catch (error) {
        dispatch(updateProfileError(error.message));
    }
};

// Effect for deleting user account
export const deleteUser = () => async (dispatch) => {
    try {
        // Send a request to your authentication API (e.g., delete user endpoint)
        await axios.delete('/api/delete-user');

        // Clear the user token from local storage
        localStorage.removeItem('userToken');

        dispatch(deleteUserSuccess());
    } catch (error) {
        dispatch(deleteUserError(error.message));
    }
};
