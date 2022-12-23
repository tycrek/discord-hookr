const { Webhook, EmbedBuilder } = require('./dist/main');
const fs = require('fs');

const wh = new Webhook(fs.readFileSync('./webhook_url').toString().trim());

// Pink Discord icon
const avatarUrl = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iconsdb.com%2Ficons%2Fdownload%2Fdeep-pink%2Fdiscord-2-256.png';

// Big buck bunny thumbnail
const imageUrl = 'https://i.ytimg.com/vi/YE7VzlLtp-4/maxresdefault.jpg';

// Build the embed
let embed1 = new EmbedBuilder()
	.setTitle('title')
	.setDescription('description')
	.setImage({ url: imageUrl })
	.setThumbnail({ url: imageUrl })
	.setColor('#ff00ab')
	.setURL('https://example.org')
	.setAuthor({ name: 'author', url: 'https://discord.com', icon_url: avatarUrl })
	.setFooter({ text: 'footer', icon_url: avatarUrl })
	.setTimestamp(new Date(2021, 6, 9, 4, 20, 0));

wh.setAvatar(avatarUrl);
wh.setUsername('username');
wh.addEmbed(embed1);
wh.setContent('content');
wh.send()
	.then(console.log)
	.catch(console.error);