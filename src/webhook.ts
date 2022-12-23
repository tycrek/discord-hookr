import { AxiosResponse } from 'axios';
import { ClientRequest } from 'http';
import { sendFile, sendWebhook } from './api';
import { EmbedBuilder } from './EmbedBuilder';
import { AllowedMention, Payload, Embed } from './ApiTypes';

type AxiosErrorPotential = { response: AxiosResponse, request: ClientRequest, message: string };

const buildHttpError = (res: AxiosResponse) => new Error(`Error: Received HTTP ${res.status} ${res.statusText} from Discord API.`);
const catchAxiosError = (reject: Function, { response, request, message }: AxiosErrorPotential) => {

	// Request was made, server responded with non-2xx status code
	if (response) reject(buildHttpError(response));

	// Request was made but no response was received
	else if (request) reject(new Error(`Error: No response received`));

	// General error
	else reject(new Error(`Error: ${message}`));
};

export class Webhook {
	private hookUrl: string;
	private payload: Payload = {};

	constructor(webhookUrl: string) {
		this.hookUrl = webhookUrl;
	};

	setContent(content: string) {
		this.payload.content = content;
		return this;
	}

	setUsername(username: string) {
		this.payload.username = username;
		return this;
	}

	setAvatar(avatarUrl: string) {
		this.payload.avatar_url = avatarUrl;
		return this;
	}

	setTts(tts: boolean) {
		this.payload.tts = tts;
		return this;
	}

	setAllowedMentions(allowedMentions: AllowedMention) {
		this.payload.allowed_mentions = allowedMentions;
		return this;
	}

	setComponents(components: any[]) {
		this.payload.components = components;
		return this;
	}

	setPayloadJson(payloadJson: string) {
		this.payload.payload_json = payloadJson;
		return this;
	}

	setFlags(flags: number) {
		this.payload.flags = flags;
		return this;
	}

	setThreadName(threadName: string) {
		this.payload.thread_name = threadName;
		return this;
	}

	addAttachment(attachment: any) {
		if (!this.payload.attachments) this.payload.attachments = [];
		this.payload.attachments.push(attachment);
		return this;
	}

	addEmbed(embed: EmbedBuilder | Embed | (EmbedBuilder | Embed)[]) {
		if (!this.payload.embeds) this.payload.embeds = [];

		if (Array.isArray(embed))
			embed.forEach((e: EmbedBuilder | Embed) =>
				this.payload.embeds!.push((e instanceof EmbedBuilder) ? e.getEmbed() : e));
		else
			this.payload.embeds.push((embed instanceof EmbedBuilder) ? embed.getEmbed() : embed);

		return this;
	}

	sendFile(filePath: string, username?: string, avatarUrl?: string) {
		return new Promise((resolve, reject) =>
			sendFile(this.hookUrl, filePath, username, avatarUrl)
				.then(() => resolve(void 0))
				.catch((err: AxiosErrorPotential) => catchAxiosError(reject, err)));
	}

	sendText(text: string) {
		this.payload.content = text;
		return this.send();
	}

	send(): Promise<void> {
		return new Promise((resolve, reject) =>
			sendWebhook(this.hookUrl, this.payload)
				.then(() => resolve(void 0))
				.catch((err: AxiosErrorPotential) => catchAxiosError(reject, err)));
	}
};
