const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription("Pauses the current playing song")
    , async execute(interaction, client) {
        try {
            const queue = client.player.nodes.get(interaction.guildId);
            //In case there is no queue
            if (!queue) {
                return await interaction.reply("Harambe is not playing any music");
            } 
            
            // console.log(queue.getPlayerTimestamp())
            queue.node.pause();
            //Current song playing
            
            let embedReply = new EmbedBuilder();
            const currentSong = queue.currentTrack;
            const progressString = await queue.node.createProgressBar();
    
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