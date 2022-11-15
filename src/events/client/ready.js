const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady, 
    once: true,
    async execute(client) {
        // When the client is ready, run this code (only once)
	    console.log(`Ready! Logged in as ${client.user.tag}`);
    }
}