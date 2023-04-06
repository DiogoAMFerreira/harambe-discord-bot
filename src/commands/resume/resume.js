const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription("Resumes the current playing song")
    , async execute(interaction, client) {
        let embedReply = new EmbedBuilder();

        const queue = client.player.nodes.get(interaction.guildId);
        //In case there is no queue
        if (!queue) {
            embedReply.setDescription("Harambe is not playing any music");
            return await interaction.reply({embeds: [embedReply]});
        } 

        queue.node.resume();

        //Current song playing
        const currentSong = queue.currentTrack;

        const progressString = await queue.node.createProgressBar();

        embedReply.setDescription(`**Harambe has resumed the current song:** \n ${currentSong.title} \n`)
        .setThumbnail(currentSong.thumbnail)
        .setFooter({text: progressString});

        await interaction.reply({embeds: [embedReply]});
    }

}