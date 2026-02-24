import { createContext, useReducer } from "react";
import reducer from '../reducer/AuthReducer'

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
};

export const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;

