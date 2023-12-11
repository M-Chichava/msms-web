import {User} from "../../../models/user";

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialAuthState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

export default initialAuthState;
