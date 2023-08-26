export interface url {
    longUrl?: string,
    shortenUrl?: string,
    id: string,
    createdAt?: string
}

export interface msgError {
    code: 'auth/weak-password' | 'auth/user-not-found' | 'auth/wrong-password';
}

export class codeError extends Error implements msgError {
    code;
    constructor(msg: string, code: 'auth/weak-password' | 'auth/user-not-found' | 'auth/wrong-password') {
        super(msg);
        this.code = code;
    }

}