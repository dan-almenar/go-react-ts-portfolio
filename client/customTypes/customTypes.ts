import { User } from "firebase/auth"
import { useLocation } from "react-router-dom"

type Language = 'english' | 'spanish'

type socialMedia = {
    name: string,
    link: string
}

type AppUser = {
    isUser: boolean,
    userData: User | null,
}

type Err = {
    code: number,
    message: {
        [key in Language]: string
    },
}

type fetchedData = {
    data: any,
    error: Err | null,
    loading: boolean,
}


export type { Language, socialMedia, AppUser, Err, fetchedData }