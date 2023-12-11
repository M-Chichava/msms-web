import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {useRouter} from "next/router";
import {useAppSelector} from "./config";
import {RootState} from "../../redux/reducers";

const AuthGuard = ({ children }) => {
    const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
    useEffect(() => {
        // Only execute this code on the client-side
        const { push } = require('next/router'); // Import router conditionally

        if (!isAuthenticated) {
            push('/auth/login');
        }
    }, []);

    return null;
}

export default AuthGuard;
