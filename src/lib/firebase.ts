import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut, type User } from 'firebase/auth';
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

export const getUser = (callback: (user: User | null) => void) => {
	const auth = getAuth();
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
	const auth = getAuth();
	signOut(auth);
	localStorage.removeItem(`userLogin`);
};

export const getLoginUser = () => {
	return JSON.parse(localStorage.getItem('userLogin') || 'null') || null;
};
