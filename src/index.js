// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { YoutubeExtractor } = require('@discord-player/extractor');
const { Player } = require("discord-player");
const { token } = require('../config.json');
const fs = require('node:fs');

try {
	// Create a new client instance
	const client = new Client({ intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates
	] });

	client.commands = new Collection();
	client.commandsArray = [];
	client.player = Player.singleton(client, {
		ytdlOptions: {
			quality: "highestaudio",
			highWaterMark: 1 << 25
		}
	})

	// This is to load the default extractors from the @discord-player/extractor package
	//client.player.extractors.loadDefault();
	client.player.extractors.register(YoutubeExtractor, {});

	const handlers = fs.readdirSync('./src/handlers');
	for (const handler of handlers) {
		require(`./handlers/${handler}`)(client);
	}

	client.handleEvents();
	client.handleCommands();

	// Log in to Discord with your client's token
	client.login(token);
	
} catch (error) {
	console.log(error);
}

