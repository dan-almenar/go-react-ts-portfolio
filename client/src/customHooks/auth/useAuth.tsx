import { createContext, useState } from "react";
import { AppUser } from "../../../customTypes/customTypes";
import { getAppUser, logInAppUser } from "../../utils/firebaseUtils/authUtils";


const AuthContext = createContext({'user': {isUser: false, userData: null } as AppUser, 'getUser': () => {}, logInUser: (email: string, password: string) => {}})

const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState({isUser: false, userData: null} as AppUser)

    const getUser = () => {
        setUser(getAppUser())
    }

    const logInUser = async (email: string, password: string) => {
        setUser(await logInAppUser(email, password))
    }

    return (
        <AuthContext.Provider value={{ user, getUser, logInUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
