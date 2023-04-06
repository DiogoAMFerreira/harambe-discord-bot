const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription("Pauses the current playing song")
    , async execute(interaction, client) {
        try {
            let embedReply = new EmbedBuilder();

            const queue = client.player.nodes.get(interaction.guildId);
            
            if (!queue) {
                //In case there is no queue
                embedReply.setDescription("Harambe is not playing any music")
                return await interaction.reply(embedReply);
            } 
            
            queue.node.pause();
            
            //Current song playing
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