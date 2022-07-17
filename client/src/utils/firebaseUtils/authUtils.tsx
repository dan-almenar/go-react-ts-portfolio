import {
    getAuth,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    deleteUser,
} from 'firebase/auth';
import { AppUser } from '../../../customTypes/customTypes';
import { app } from './firebaseConfig';

const auth = getAuth(app);

const createAppUser = async (email: string, password: string): Promise<AppUser> => {
    let user: AppUser = {
        isUser: false,
        userData: null,
    }
    try {
        const newUser = await createUserWithEmailAndPassword(auth, email, password);
        newUser ? user = {isUser: true, userData: newUser.user} : user = {isUser: false, userData: null};
    } catch (error) {
        console.log(error);
    }
    return user;
}

const logInAppUser = async (email: string, password: string): Promise<AppUser> => {
    let user: AppUser = {
        isUser: false,
        userData: null,
    }
    try {
        const userToLogIn = await signInWithEmailAndPassword(auth, email, password);
        userToLogIn ? user = {isUser: true, userData: userToLogIn.user} : user = {isUser: false, userData: null};
    } catch (error) {
        console.log(error);
    }
    return user;
}

const deleteAppUser = async (): Promise<void> => {
    const user = auth.currentUser;
    if (user !== null) {
        try {
            return await deleteUser(user)
        } catch (err) {
            console.log(err)
            throw err;
        }    
    }
}

const getAppUser = (): AppUser => {
    const user = auth.currentUser;
    if (user !== null) {
        return {
            isUser: true,
            userData: user,
        }
    }
    return {
        isUser: false,
        userData: null,
    }
}


export { getAppUser, createAppUser, logInAppUser, deleteAppUser };
