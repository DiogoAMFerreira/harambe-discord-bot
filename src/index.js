// Require the necessary discord.js classes
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');
const fs = require('node:fs');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.commandsArray = [];

const handlers = fs.readdirSync('./src/handlers');
for (const handler of handlers) {
	require(`./handlers/${handler}`)(client);
}

client.handleEvents();
client.handleCommands();

// Log in to Discord with your client's token
client.login(token);
