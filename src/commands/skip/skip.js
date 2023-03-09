const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription("Skips the current playing song")
    , async execute(interaction, client) {
        
        const queue = client.player.nodes.get(interaction.guildId);
        //In case there is no queue
        if (!queue) {
            return await interaction.reply("Harambe is not playing any music");
        } 
        
        //Next song playing
        const nextSong = queue.tracks.toArray()[0];
        
        queue.node.skip();

        let embedReply = new EmbedBuilder();

        embedReply.setDescription(`**Harambe has skipped the current song.**`)
        .setThumbnail(nextSong.thumbnail)
        .setFooter({text: `Next song: \n ${nextSong.title} \n`});

        await interaction.reply({
            embeds: [embedReply]
        });
    }

}