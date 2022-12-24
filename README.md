[//]: # (NPM centered badge template START --------------------------------------------------)

<div align="center">

Hookr
===

[![NPMCBT badge]][NPMCBT link]

*A lightweight and easy way to send webhooks to Discord, without the added baggage of a full API client.*
</div>

[NPMCBT badge]: https://img.shields.io/npm/v/@tycrek/discord-hookr?color=CB3837&label=%20View%20on%20NPM&logo=npm&style=for-the-badge
[NPMCBT link]: https://www.npmjs.com/package/@tycrek/discord-hookr

[//]: # (NPM centered badge template END ----------------------------------------------------)

# What is Hookr?

Hookr is a webhook client for Discord.

## Why should I use Hookr?

Hookr aims to be much lighter than a typical Discord API client, such as Discord.js for bots. Plus it has a fun name.

## Note for devs coming from `matthew1232/discord-webhook-node`

If you were previously using [matthew1232/discord-webhook-node](https://github.com/matthew1232/discord-webhook-node), **my package changes the API** so it won't be a simple drop-in replacement. **However**, it's very easy to migrate to Hookr, plus you'll get updated packages, better documentation, and a cleaner codebase.

One major issue with the old package is that the [type defitions](https://github.com/matthew1232/discord-webhook-node/blob/master/index.d.ts#L79) don't match [the actual source](https://github.com/matthew1232/discord-webhook-node/blob/master/src/classes/messageBuilder.js#L35). This has caused numerous problems in some deployments of one of my other projects. In Hookr, you can use both `setUrl` *and* `setURL` without any issues.

Some other issues to note:

- Out of date. The repo hasn't been updated since **`2020-07-18`** as of December 2022.
- Doesn't support multiple embeds per send. Discords API has supported this for quite some time now.
- Doesn't support numerous API fields such as `allowed_mentions` and `components`.
- Somewhat confusing API. I've tried to simplify it as much as possible.
- **Out of date dependencies may be a security risk.** I've updated all packages to their latest versions, and will continue to do so.

## Installation

```bash
npm i @tycrek/discord-hookr
```

```ts
import { Webhook, EmbedBuilder } from '@tycrek/discord-hookr';
// or
const { Webhook, EmbedBuilder } = require('@tycrek/discord-hookr');
```

## Usage

Hookr supports sending multiple Embeds, so first you must build an Embed. All builder methods are chainable.

```ts
// Create a new embed
const builder = new EmbedBuilder()
    .setTitle('Hello, world!')
    .setDescription('This is an example embed.')
    .setColor('#ff0000'); // Hex color
```

Then you can create a new Webhook and send the Embed.

```ts
const hook = new Webhook('WEBHOOK_URL_HERE');

hook.addEmbed(builder.getEmbed());
```

You can also send a message without an embed.

```ts
hook.setContent('Hello, world!');
```

Discord allows both embeds and content in the same message, if you wish to do so.

Finally, you can send the webhook. It resolves a void Promise or rejects with an error, typically from [Axios](https://www.npmjs.com/package/axios).

```ts
hook.send()
    .then(() => console.log('Sent!'))
    .catch((err) => console.error(err));
```

Discord supports up to 10 embeds per message, so you can add as many as you want. Hookr's API accepts EmbedBuilders, Embeds, arrays of each or a mix of both.

```ts
hook.addEmbed(builder1);
hook.addEmbed(builder2.getEmbed());
hook.addEmbed([builder3, builder4.getEmbed()]);
hook.addEmbed([builder5, builder6, builder7.getEmbed(), builder8.getEmbed()])
```

Once sent, you'll see all of the embeds in a single message.

## API

### The EmbedBuilder

| Method | Description | Example |
| --- | --- | --- |
| `EmbedBuilder()` | Creates a new EmbedBuilder. | `const builder = new EmbedBuilder();` |
| `setTitle(string)` | Sets the title of the embed. | `builder.setTitle('Hello, world!');` |
| `setDescription(string)` | Sets the description of the embed. | `builder.setDescription('This is an example embed.');` |
| `setUrl(string)` | Sets the URL of the embed. | `builder.setUrl('https://example.com');` |
| `setURL(string)` | Equivalent to `setUrl`. | `builder.setURL('https://example.com');` |
| `setTimestamp(string? \| Date?)` | Sets the timestamp of the embed. | `builder.setTimestamp();` <br> `builder.setTimestamp('2021-01-01');` <br> `builder.setTimestamp(new Date(2021, 6, 9, 4, 20, 0));` |
| `setColor(string)` | Sets the color of the embed using hex. | `builder.setColor('#ff0000');` |
| `setFooter({})` | Sets the footer of the embed. | `builder.setFooter({ text: 'This is a footer.', icon_url: 'https://example.com/example.png' });` |
| `setImage({})` | Sets the image of the embed. | `builder.setImage({ url: 'https://example.com/example.png' });` |
| `setThumbnail({})` | Sets the thumbnail of the embed. | `builder.setThumbnail({ url: 'https://example.com/example.png' });` |
| `setAuthor({})` | Sets the author of the embed. | `builder.setAuthor({ name: 'Author', url: 'https://example.com', icon_url: 'https://example.com/example.png' });` |
| `addField({})` | Adds a field to the embed. `inline` is optional. | `builder.addField({ name: 'Field', value: 'This is a field.', inline: true });` |
| `getEmbed()` | Returns the `Embed` object. | `builder.getEmbed();` |

#### Deprecated methods

| Method | Description | Example | Reason |
| --- | --- | --- | --- |
| `setProvider({})` | Sets the provider of the embed. | `setProvider({ name: 'provider', url: 'https://example.org' });` | Unsupported in Webhook-based embeds. May be supported in the future. |
| `setVideo({})` | Sets the video of the embed. | `setVideo({ url: 'https://example.org/example.mp4' });` | Unsupported in Webhook-based embeds. May be supported in the future. |

For more information, see these links:

- [Discord Docs: Webhook JSON/Form Params](https://discord.com/developers/docs/resources/webhook#execute-webhook-jsonform-params) (see the note under the table)
- [Discord Community: Videos in Rich Embeds](https://support.discord.com/hc/en-us/community/posts/360037387352-Videos-in-Rich-Embeds)
- [Discord Community: Allow bots/webhook to use "provider" field in embeds](https://support.discord.com/hc/en-us/community/posts/4409966319383-Allow-bots-webhook-to-use-provider-field-in-embeds)

### The Webhook

| Method | Description | Example |
| --- | --- | --- |
| `Webhook(string)` | Creates a new Webhook. | `const hook = new Webhook('WEBHOOK_URL_HERE');` |
| `setContent(string)` | Sets the text content of the message. | `hook.setContent('Hello, world!');` |
| `setUsername(string)` | Sets the username of the webhook. | `hook.setUsername('Hookr Webhook');` |
| `setAvatar(string)` | Sets the avatar of the webhook. | `hook.setAvatar('https://example.com/example.png');` |
| `setTts(boolean)` | Sets the TTS flag of the webhook. Disabled by default. | `hook.setTts(true);` |
| `setAllowedMentions({})` | Sets what users or roles are pinged in Discord. See [Discord documentation](https://discord.com/developers/docs/resources/channel#allowed-mentions-object) for more details. | `hook.setAllowedMentions({ parse: ['roles'], roles: ['123456789012345678], replied_user: true });` |
| `setComponents({})` | Sets the components of the webhook. See [Discord documentation](https://discord.com/developers/docs/interactions/message-components#component-object) for more details. This may not work right now. | `Unknown` |
| `setPayloadJson({})` | I'm not sure what this does exactly. [Discord docs](https://discord.com/developers/docs/resources/webhook#execute-webhook-jsonform-params) are vague and [complicated](https://discord.com/developers/docs/reference#uploading-files) | `Unknown` |
| `setFlags(number)` | Sets the flags of the webhook. See [Discord documentation](https://discord.com/developers/docs/resources/channel#message-object-message-flags) for more details. | `Unknown` |
| `setThreadName(string)` | Sets the thread name of the webhook. I believe this is used for the new forums feature. | `Unknown` |
| `addAttachment({})` | Adds an attachment to the webhook. See [Discord documentation](https://discord.com/developers/docs/resources/channel#attachment-object) for more details. | `Unknown` |
| `addEmbed(EmbedBuilder \| Embed \| (EmbedBuilder \| Embed)[])` | Adds an embed or multiple embeds to the Webook. | *See [Usage](#Usage) above* |
| `send()` | Sends the webhook. | `hook.send().then().catch();` |
| `sendText()` | Shorthand for `setContent` and `send`. | `hook.sendText('Hello, world!').then().catch();` |
| `sendFile()` | Unfinished and untested, would not recommend using yet. | `Unknown` |

## Considerations

- Files are not supported yet. I'm not sure if they're even possible with Webhooks.

## Contributing

Contributions are welcome! Please open an [Issue](https://github.com/tycrek/discord-hookr/issues/new) or [Pull Request](https://github.com/tycrek/discord-hookr/fork) if you have any suggestions or bug reports.

### Testing

First clone the repository and install the dependencies:

```bash
git clone https://github.com/tycrek/discord-hookr.git && cd discord-hookr
npm i
```

Create a file called `webhook_url` and paste your webhook URL in it. Then run the tests:

```bash
npm test
```
## License

Hookr is [ISC licensed](https://choosealicense.com/licenses/isc/). I have relicensed the original [discord-webhook-node](https://github.com/matthew1232/discord-webhook-node) from MIT to ISC as they're functionally the same license.

Matthew, if you have issue with this, please let me know.
