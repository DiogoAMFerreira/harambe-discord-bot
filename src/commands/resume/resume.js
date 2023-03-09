const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

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

        //Current song playing
        const currentSong = queue.current;

        let embedReply = new EmbedBuilder();
        const progressString = await queue.createProgressBar();

        embedReply.setDescription(`**Harambe has resumed the current song:** \n ${currentSong.title} \n`)
        .setThumbnail(currentSong.thumbnail)
        .setFooter({text: progressString});

        await interaction.reply({
            embeds: [embedReply]
        });
    }

}