import PocketBase, { type AuthModel, type RecordAuthResponse } from 'pocketbase';

export const pb = new PocketBase('http://192.168.1.29:3002');

export const signInAndSaveMetaData = async (): Promise<RecordAuthResponse | unknown> => {
	try {
		const data = await pb.collection('users').authWithOAuth2({ provider: 'twitter' });
		if (data?.meta) {
			await pb.collection('users').update(data?.record?.id, {
				metaData: data?.meta
			});
		}

		return data;
	} catch (error) {
		 error;
	}
};

export const getUser = (): Readonly<AuthModel> => pb.authStore.model;

export const signOut = () => pb.authStore.clear();

export const isLoggedIn = () => pb.authStore.isValid;

export const listAuthMethods = () => pb.collection('users').listAuthMethods();


