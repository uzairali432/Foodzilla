import { createContext, useReducer } from "react";
import reducer from '../reducer/AuthReducer'

const registerValues = {
    name: "",
    email: "",
    phoneNumber: ""
}
export const AuthContext = createContext(registerValues);

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, registerValues)
    return (
        <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider;

