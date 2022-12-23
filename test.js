const { Webhook, EmbedBuilder } = require('./dist/main');
const fs = require('fs');

const wh = new Webhook(fs.readFileSync('./webhook_url').toString().trim());

// Pink Discord icon
const avatarUrl = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iconsdb.com%2Ficons%2Fdownload%2Fdeep-pink%2Fdiscord-2-256.png';

// Big buck bunny thumbnail
const imageUrl = 'https://i.ytimg.com/vi/YE7VzlLtp-4/maxresdefault.jpg';

// Build the embed
const embed1 = new EmbedBuilder()
	.setTitle('title')
	.setDescription('description')
	.setImage({ url: imageUrl })
	.setThumbnail({ url: imageUrl })
	.setColor('#ff00ab')
	.setURL('https://example.org')
	.setAuthor({ name: 'author', url: 'https://discord.com', icon_url: avatarUrl })
	.setFooter({ text: 'footer', icon_url: avatarUrl })
	.setTimestamp(new Date(2021, 6, 9, 4, 20, 0))
const embed2 = new EmbedBuilder()
	.setTitle('the second embed')
	.setDescription('isn\'t this cool?')
	.setColor('#ab00ff');
const embed3 = new EmbedBuilder()
	.setTitle('three\'s a crowd')
	.setDescription('but not here')
	.setColor('#00abff');
const embed4 = new EmbedBuilder()
	.setTitle('four\'s a party')
	.setDescription('and this is a party')
	.setColor('#00ffab');
const embed5 = new EmbedBuilder()
	.setTitle('fiiiiiive gold rings')
	.setDescription('four calling birds, three french hens, two turtle doves, and a partridge in a pear tree')
	.setColor('#ffd700');
const embed6 = new EmbedBuilder()
	.setTitle('hexagons')
	.setDescription('have six sides')
	.setColor('#ff00ab');
const embed7 = new EmbedBuilder()
	.setTitle('the lucky number seven')
	.setDescription('is a lucky number')
	.setColor('#00ffab');
const embed8 = new EmbedBuilder()
	.setTitle('eight is great')
	.setDescription('eight is great')
	.setColor('#ee77cb');

// Set the webhook's avatar and username
wh.setAvatar(avatarUrl);
wh.setUsername('username');

// Passing embed builder
wh.addEmbed(embed1);

// Passing embed builder array
wh.addEmbed([embed2, embed3]);

// Passing embed object
wh.addEmbed(embed4.getEmbed());

// Passing embed object array
wh.addEmbed([embed5.getEmbed(), embed6.getEmbed()]);

// Array of both embed builder and embed object
wh.addEmbed([embed7, embed8.getEmbed()]);

wh.setContent('content');
wh.send()
	.then(console.log)
	.catch(console.error);