import { PUBLIC_BASE_URL } from '$env/static/public';

const BASE_URL = PUBLIC_BASE_URL || 'http://localhost:8000';

export const getVideoInfo = async (videoUrl: string) => {
	const endpoint = '/get_video_info';
	const url = new URL(endpoint, BASE_URL);
	url.searchParams.set('url', videoUrl);

	let response: Response;
	try {
		response = await fetch(url.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				accept: '*/*'
			}
		});
	} catch (error) {
		throw new Error(`Failed to fetch video info: ${error}`);
	}

	if (!response.ok) {
		throw new Error(
			`Failed to fetch video info. Status: ${response.status}. ${await response.text()}`
		);
	}
	return response.json();
};

export const getVideoBlob = async (videoUrl: string) => {
	const endpoint = '/get_video_blob';
	const url = new URL(endpoint, BASE_URL);
	url.searchParams.set('url', videoUrl);

	let response: Response;
	try {
		response = await fetch(url.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				accept: '*/*'
			}
		});
	} catch (error) {
		throw new Error(`Failed to fetch video blob: ${error}`);
	}

	if (!response.ok) {
		throw new Error(
			`Failed to fetch video info. Status: ${response.status}. ${await response.text()}`
		);
	}

	return await response.blob();
};
export const getAudioBlob = async (videoUrl: string) => {
	const endpoint = '/get_audio_blob';
	const url = new URL(endpoint, BASE_URL);
	url.searchParams.set('url', videoUrl);

	let response: Response;
	try {
		response = await fetch(url.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				accept: '*/*'
			}
		});
	} catch (error) {
		throw new Error(`Failed to fetch audio blob: ${error}`);
	}

	if (!response.ok) {
		throw new Error(
			`Failed to fetch audio info. Status: ${response.status}. ${await response.text()}`
		);
	}

	return await response.blob();
};

export const postVideoToSocialMedia = async (videoUrl: string, text = '') => {
	const endpoint = '/post_video';
	const url = new URL(endpoint, BASE_URL);
	const token = localStorage.getItem('token');
	const secret = localStorage.getItem('secret');

	let response: Response;
	try {
		const body = {
			video_url: videoUrl,
			access_token: token,
			access_token_secret: secret,
			text
		};
		console.log(body)
		response = await fetch(url.toString(), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body),
		});
	} catch (error) {
		throw new Error(`Failed to post video to social media: ${error}`);
	}

	if (!response.ok) {
		throw new Error(
			`Failed to fetch video info. Status: ${response.status}. ${await response.text()}`
		);
	}

	return response;
};
