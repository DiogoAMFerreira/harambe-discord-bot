const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription("Pauses the current playing song")
    , async execute(interaction, client) {
        try {
            const queue = client.player.getQueue(interaction.guildId);
            //In case there is no queue
            if (!queue) {
                return await interaction.reply("Harambe is not playing any music");
            } 
            
            // console.log(queue.getPlayerTimestamp())
            queue.setPaused(true);
            //Current song playing
            
            let embedReply = new EmbedBuilder();
            const currentSong = queue.current;
            const progressString = await queue.createProgressBar();
    
            embedReply.setDescription(`**Harambe has paused the current song:** \n ${currentSong.title} \n`)
            .setThumbnail(currentSong.thumbnail)
            .setFooter({text: progressString});
    
            await interaction.reply({
                embeds: [embedReply]
            });
            
        } catch (error) {
            console.log(error);
        }
    }

}