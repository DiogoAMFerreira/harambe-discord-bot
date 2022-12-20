const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription("Resumes the current playing song")
    , async execute(interaction, client) {
        
        const queue = client.player.getQueue(interaction.guildId);
        //In case there is no queue
        if (!queue) {
            return await interaction.reply("Harambe is not playing any music");
        } 

        queue.setPaused(false);
    }

}