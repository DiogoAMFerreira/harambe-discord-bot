const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate, 
    async execute(message, client) {
        
        if (message.author.bot) return;

        if (message.content.includes(client.user.username)){
            await message.reply(`Hey ${message.author.username}! How you doing?`);
        }
    }
}