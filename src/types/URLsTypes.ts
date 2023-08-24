export interface url {
    longURL?: string,
    shortenURL?: string,
    id: string,
    createdAt?: string
}

export interface Doc {
    id: string,
    data(): {
        longURL: string,
        shortenURL: string,
        createdAt: string
    }
}