import PocketBase, { type RecordAuthResponse } from 'pocketbase';

export const pb = new PocketBase('http://192.168.1.29:3002');

export const signIn = (): Promise<RecordAuthResponse> =>
	pb.collection('users').authWithOAuth2({ provider: 'twitter' });

export const saveSignInMetaData = async (data: RecordAuthResponse) => {
	if (data?.meta) {
		return await pb.collection('users').update(data?.record?.id, {
			metaData: data?.meta
		});
	}
};

export const signOut = () => pb.authStore.clear();
