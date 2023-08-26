import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router';
import { type url, codeError } from '../types/URLsTypes'
import { db, colRef } from '../firebase/mmURLdb'
import { addDoc, query, getDocs, doc, deleteDoc, serverTimestamp, orderBy } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth, updateEmail, updateProfile, type User, type Auth, onAuthStateChanged } from 'firebase/auth'

export const useURLStore = defineStore('urlShorten', () => {
    const URLs : Ref<url[]> = ref([]);
    const longURL : Ref<string> = ref('');
    const shortenURL : Ref<string> = ref('');
    const token : string = import.meta.env.VITE_TOKEN_TLY;
    const isShortening : Ref<boolean> = ref(false);
    const home = ref<boolean>(false);

    const Router = useRouter();
    const isAuth : Ref<boolean> = ref(false);
    const termAgree : Ref<boolean> = ref(true);
    const mail = ref<string>('');
    const pass = ref<string>('');
    const name = ref<string>('');

    const userMail = ref<string>("");
    const userName = ref<string>("");

    const loginMsg = ref<string>("");
    const signUpMsg = ref<string>("");

    const createShortURL = async () => {
        isShortening.value = true;
        const res = await fetch('https://t.ly/api/v1/link/shorten', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ 
                "long_url": longURL.value, 
            })
        });
        const data = await res.json();
        shortenURL.value = data.short_url;
        isShortening.value = false;
    };

    const addURL = async () => {
        await addDoc(colRef, {
            longUrl: longURL.value,
            shortenUrl: shortenURL.value,
            createdAt: serverTimestamp(),
        });
    }

    const q = query(colRef, orderBy('createdAt'));

    const getURLs = async() => {
        const urls : url[] = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            urls.push({...doc.data(), id: doc.id});
        });
        return urls;
    }

    const deleteURL = async (data: string) => {
        await deleteDoc(doc(db, "URLs", data));
    };


    const auth : Auth = getAuth();

    const signUp = async () => {
        try {
            if (termAgree.value) {
                signUpMsg.value = '';
                await createUserWithEmailAndPassword(auth, mail.value, pass.value);
                await updateEmail(auth.currentUser!, mail.value);
                await updateProfile(auth.currentUser!, {
                    displayName: name.value
                });
                $reset();
            } else {
                signUpMsg.value = 'Please Agree Our Terms & Conditions';
            }
        } 
        catch (err) {
            if (err instanceof codeError) {
                if (err.code === 'auth/weak-password') {
                    signUpMsg.value = 'Your Password need to be at least 6 characters.'
                }
            }
        }
    }

    const logIn = async () => {
        try {
           await signInWithEmailAndPassword(auth, mail.value, pass.value);
            $reset();
        }
        catch (err) {
            if (err instanceof codeError) {
                switch (err.code) {
                    case 'auth/user-not-found':
                    loginMsg.value = "Couldn't find your account";
                    break;
                    case 'auth/wrong-password':
                    loginMsg.value = 'Wrong password. Try again or click Forgot password to reset it.';
                    break;
                }
            }
        }
    }

    const logOut = async () => {
        await signOut(auth);
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            isAuth.value = true;
            userMail.value = user.email!;
            userName.value = user.displayName!;
            Router.push('/manage');
            home.value = true;
        } else {
            isAuth.value = false;
            Router.push('/');
            home.value = false;
        }
    })

    const $reset = () => {
        mail.value = '';
        pass.value = '';
        name.value = '';
        loginMsg.value = '';
        signUpMsg.value = '';
    }

    return { longURL, shortenURL, home, URLs, createShortURL, isShortening, addURL, getURLs, deleteURL,
            isAuth, termAgree, name, pass, mail, userMail, userName, loginMsg, signUpMsg, signUp, logIn, logOut
    }
})