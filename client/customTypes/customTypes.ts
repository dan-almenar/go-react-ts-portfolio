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

type Comment = {
    firstName: string,
    lastName?: string,
    email: string,
    subject: string,
    message: string,
    date: number
}


export type { Language, socialMedia, AppUser, Err, fetchedData, Comment }