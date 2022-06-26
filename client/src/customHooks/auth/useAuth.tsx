import { createContext, useState } from "react";
import { FBUser } from "../../../customTypes/customTypes";


const UserContext = createContext({'user': {uid: null, token: null, isAdmin: false } as FBUser, 'logInUser': (email: string, password: string) => {}})

const UserProvider = ({ children }: any) => {
    const [user, setUser] = useState({uid: null, token: null, isAdmin: false} as FBUser)

    // TODO
    const logInUser = (email: string, password: string) => {
        console.log("log in user")
        setUser({uid: email, token: password, isAdmin: true})
    }

    return (
        <UserContext.Provider value={{ user, logInUser }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }