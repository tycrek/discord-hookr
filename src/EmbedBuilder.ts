import { Embed, Author, Provider, Field, Footer, MediaItem } from './ApiTypes';

/**
 * Converts a hex color to an integer
 */
const formatColor = (hex: string) => parseInt(hex.replace('#', ''), 16);

/**
 * Builds an embed to be passed into a Webhook Payload
 */
export class EmbedBuilder {
	private embed: Embed;

	constructor() {
		this.embed = {};
	}

	public setTitle(title: string) {
		this.embed.title = title;
		return this;
	}

	public setDescription(description: string) {
		this.embed.description = description;
		return this;
	}

	public setURL(url: string) {
		this.embed.url = url;
		return this;
	}

	public setUrl(url: string) {
		this.setURL(url);
		return this;
	}

	public setTimestamp(timestamp: string | Date = new Date()) {
		// todo: test if this works as intended
		if (typeof timestamp === 'string')
			timestamp = new Date(timestamp);

		this.embed.timestamp = timestamp.toISOString();
		return this;
	}

	public setColor(color: string) {
		this.embed.color = formatColor(color);
		return this;
	}

	public setImage(image: MediaItem) {
		this.embed.image = image;
		return this;
	}

	/**
	 * Please note that as of 2022-12-23, Webhooks DO NOT support the Video field.
	 * @deprecated
	 * @see https://discord.com/developers/docs/resources/webhook#execute-webhook-jsonform-params
	 */
	public setVideo(video: MediaItem) {
		this.embed.video = video;
		return this;
	}

	public setThumbnail(thumbnail: MediaItem) {
		this.embed.thumbnail = thumbnail;
		return this;
	}

	public setFooter(footer: Footer) {
		this.embed.footer = footer;
		return this;
	}

	/**
	 * Please note that as of 2022-12-23, Webhooks DO NOT support the Provider field.
	 * @deprecated
	 * @see https://discord.com/developers/docs/resources/webhook#execute-webhook-jsonform-params
	 */
	public setProvider(provider: Provider) {
		this.embed.provider = provider;
		return this;
	}

	public setAuthor(author: Author) {
		this.embed.author = author;
		return this;
	}

	public addField(field: Field) {
		if (!this.embed.fields) this.embed.fields = [];
		this.embed.fields.push(field);
		return this;
	}

	public getEmbed() {
		return this.embed;
	}
};
