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
		throw new Error(`HTTP error! Status: ${response.status}`);
	}

	return response.json();
};