import { defineStore } from 'pinia'
import { ref, type FormHTMLAttributes, type Ref } from 'vue'
import { useRouter } from 'vue-router';
import { type url, type Doc } from '../types/URLsTypes'
import { db, colRef } from '../firebase/mmURLdb'
import { collection, addDoc, query, onSnapshot, doc, deleteDoc, serverTimestamp, orderBy } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth, updateEmail, updateProfile, type User, type Auth, onAuthStateChanged } from 'firebase/auth'

export const useURLStore = defineStore('urlShorten', () => {
    const URLs : Ref<url[]> = ref([]);
    const longURL : Ref<string> = ref('');
    const shortenURL : Ref<string> = ref('');
    const token : string = import.meta.env.VITE_TOKEN_TLY;
    const isShortening : Ref<boolean> = ref(false);
    const alias : Ref<string> = ref('');

    const Router = useRouter();
    const isAuth : Ref<boolean> = ref(false);
    const termAgree : Ref<boolean> = ref(true);
    const mail = ref<string>('');
    const pass = ref<string>('');
    const name = ref<string>('');
    const fullName = ref<string>('');

    const userMail = ref<string>("");
    const userName = ref<string>("");
    const agreeMsg = ref<string>("");

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
    const getURLs = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            URLs.value.push({...doc.data(), id: doc.id});
        });
    });

    const deleteURL = async () => {
        await deleteDoc(doc(db, "URLs", alias.value));
    };


    const auth : Auth = getAuth();

    const signUp = async () => {
        try {
            if (termAgree.value) {
                agreeMsg.value = '';
                await createUserWithEmailAndPassword(auth, mail.value, pass.value);
                await updateEmail(auth.currentUser, mail.value);
                await updateProfile(auth.currentUser, {
                    displayName: fullName.value
                });
                $reset();
            } else {
                agreeMsg.value = 'Please Agree Our Terms & Conditions';
            }
        } 
        catch (err) {
            console.log(err)
        }
    }

    const logIn = async () => {
        try {
           const login = await signInWithEmailAndPassword(auth, mail.value, pass.value);
           console.log(login)
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    isAuth.value = true;
                    Router.push('/manage');
                }
            });
            $reset();
        }
        catch (err) {
            console.log(err);
        }
    }

    const logOut = async () => {
        await signOut(auth);
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            isAuth.value = true;
            userMail.value = user.email;
            userName.value = user.
            Router.push('/manage');
        } else {
            isAuth.value = false;
            Router.push('/');
        }
    })

    const $reset = () => {
        mail.value = '';
        pass.value = '';
        name.value = '';
        fullName.value = '';
    }

    return { longURL, shortenURL, createShortURL, isShortening, addURL, getURLs, deleteURL,
            isAuth, termAgree, name, pass, mail, fullName, agreeMsg, signUp, logIn, logOut
    }
})