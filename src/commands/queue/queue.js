const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription("Shows the current song queue")
    , async execute(interaction, client) {
        
        const queue = client.player.getQueue(interaction.guildId);
        //In case there is no queue
        if (!queue || !queue.playing) {
            return await interaction.reply("Harambe is not playing any music");
        } 

        let embedReply = new EmbedBuilder();

        //Current song playing
        const currentSong = queue.current;

        const queueString = queue.tracks.slice(0, 10).map((song, i) => {
            return `**${i + 1}#** [${song.duration}] ${song.title}`;
            //Requested by: <@${song.requestedBy.id}> //TODO: Find how to tag the user
        }).join("\n");


        embedReply.setDescription(`**Harambe is currently playing:** \n ${currentSong.title} \n `)
            .setThumbnail(currentSong.thumbnail)
            .addFields([
                {
                    name:'Up next:', 
                    value: queueString
                }
            ]);

        await interaction.reply({
			embeds: [embedReply]
		});
    }

}