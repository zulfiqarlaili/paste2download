import { initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth, onAuthStateChanged, setPersistence, signInWithPopup, signOut, TwitterAuthProvider, type User } from 'firebase/auth';
import { onMount } from 'svelte';
const firebaseConfig = {
	apiKey: 'AIzaSyCihNhVlPzcunUYfPzD2SKQYuQox5NMpP0',
	authDomain: 'paste2download.firebaseapp.com',
	projectId: 'paste2download',
	storageBucket: 'paste2download.appspot.com',
	messagingSenderId: '589503118207',
	appId: '1:589503118207:web:15341802dd36cfa5eff84a'
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const getUser = (callback: (user: User | null) => void) => {
	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				if (localStorage.getItem(`userLogin`)) {
					localStorage.setItem(`userLogin`, JSON.stringify(user));
				} else {
					localStorage.setItem(`userLogin`, JSON.stringify(user));
				}
				callback(user);
			} else {
				localStorage.removeItem(`userLogin`);
				callback(null);
			}
		});
		return unsubscribe;
	});
};

export const logout = () => {
	signOut(auth);
	localStorage.removeItem(`userLogin`);
};

export const getLoginUser = () => {
	return JSON.parse(localStorage.getItem('userLogin') || 'null') || null;
};

export const signInWithTwitter = (): Promise<void> => {
	return new Promise((resolve, reject) => {
		setPersistence(auth, browserLocalPersistence)
			.then(() => {
				const provider = new TwitterAuthProvider();
				signInWithPopup(auth, provider)
					.then((result) => {
						const credential = TwitterAuthProvider.credentialFromResult(result);
						const token = credential?.accessToken;
						const secret = credential?.secret;
						console.log(token, secret);
						resolve();
					})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
						const email = error.customData.email;
						const credential = TwitterAuthProvider.credentialFromError(error);
						console.log(errorCode, errorMessage, email, credential);
						reject(error);
					});
			})
			.catch((error) => {
				console.log(`${error.code}: ${error.message}`);
				reject(error);
			}); 
	});
}
