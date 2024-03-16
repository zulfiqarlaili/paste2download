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
		throw new Error(`Failed to fetch video info. Status: ${response.status}. ${await response.text()}`);
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

	return await response.blob();
}