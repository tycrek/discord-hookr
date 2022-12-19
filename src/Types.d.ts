/**
 * @see https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure
 * @see https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure
 * @see https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure 
 */
export type MediaItem = {
	url: string;
	proxy_url?: string;
	height?: number;
	width?: number;
};

/**
 * @see https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure
 */
export type Field = {
	name: string;
	value: string;
	inline?: boolean;
};

/**
 * @see https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure
 */
export type Footer = {
	text: string;
	icon_url?: string;
	proxy_icon_url?: string;
};

/**
 * @see https://discord.com/developers/docs/resources/channel#embed-object-embed-provider-structure
 */
export type Provider = {
	name?: string;
	url?: string;
};

/**
 * @see https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure
 */
export type Author = {
	name?: string;
	url?: string;
	icon_url?: string;
	proxy_icon_url?: string;
};

/**
 * @see https://discord.com/developers/docs/resources/channel#allowed-mentions-object
 */
export type AllowedMention = {
	parse?: ('roles' | 'users' | 'everyone')[];
	roles?: string[];
	users?: string[];
	replied_user?: boolean;
}

/**
 * @see https://discord.com/developers/docs/resources/channel#embed-object
 */
export interface Embed {
	title?: string;
	/**
	 * @deprecated
	 */
	type?: 'rich' | 'image' | 'video' | 'gifv' | 'article' | 'link';
	description?: string;
	url?: string;
	timestamp?: string | Date; // todo: probably not string
	color?: number;
	image?: MediaItem;
	video?: MediaItem;
	thumbnail?: MediaItem;
	footer?: Footer;
	provider?: Provider;
	author?: Author;
	fields?: Field[];
};

/**
 * @see https://discord.com/developers/docs/resources/channel#attachment-object
 */
export interface Attachment {
	id: string;
	filename: string;
	description?: string;
	content_type?: string;
	size: number;
	url: string;
	proxy_url?: string;
	height?: number;
	width?: number;
	ephemeral?: boolean;
};

/**
 * @see https://discord.com/developers/docs/resources/webhook#execute-webhook-jsonform-params
 */
export interface Payload {
	/**
	 * One of either content, embeds, or file must be set
	 */
	content?: string;
	embeds?: Embed[];
	// todo: do files too

	username?: string;
	avatar_url?: string;
	tts?: boolean;
	allowed_mentions?: AllowedMention;
	components?: any[];
	payload_json?: string;
	attachments?: Attachment[];
	flags?: number;
	thread_name?: string;
};
