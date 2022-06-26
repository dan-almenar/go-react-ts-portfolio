type Language = 'english' | 'spanish'

type socialMedia = {
    name: string,
    link: string
}

type FBUser = {
    token: string | null,
    uid: string | null,
    isAdmin: boolean
}

export type { Language, socialMedia, FBUser }