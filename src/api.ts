import axios from 'axios';
import { FormData } from 'formdata-polyfill/esm.min';
import { createReadStream } from 'fs';
import { Payload } from './Types';

/**
 * Checks if the status code is 200 or 204
 */
const validateStatus = (status: number) => status === 200 || status === 204;

/**
 * Sends a file to a webhook
 */
export const sendFile = (hookUrl: string, filepath: string, username?: string, avatarUrl?: string) => {
	const form = new FormData();

	// Add the file to the form
	form.append('files', createReadStream(filepath));

	// Add the username and avatar url to the form, if they exist
	username && form.append('username', username);
	avatarUrl && form.append('avatar_url', avatarUrl);

	// Send the form
	return axios.postForm(hookUrl, form, { validateStatus });
};

/**
 * Sends a payload to a webhook (either text, embeds, or both)
 */
export const sendWebhook = (hookUrl: string, payload: Payload) =>
	axios.post(hookUrl, JSON.stringify(payload), {
		headers: { 'Content-Type': 'application/json' },
		validateStatus
	});
