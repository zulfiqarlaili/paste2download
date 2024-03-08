import { PUBLIC_BASE_URL } from '$env/static/public';

const BASE_URL = PUBLIC_BASE_URL || 'http://localhost:8000';

export const getVideoInfo = async (videoUrl: string) => {
	const endpoint = '/get_video_info';
	const url = `${BASE_URL}${endpoint}?url=${videoUrl}`;

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			accept: '*/*'
		}
	});

	if (!response.ok) {
		const errorMsg = `Failed to fetch video info. Status: ${response.status}.`;
		throw new Error(errorMsg);
	}

	return response.json();
};