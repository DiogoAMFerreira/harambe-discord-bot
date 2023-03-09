const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription("Stops the queue")
    , async execute(interaction, client) {
        
        const queue = client.player.nodes.get(interaction.guildId);
        //In case there is no queue
        if (!queue) {
            return await interaction.reply("Harambe is not playing any music");
        } 

        queue.delete();

        let embedReply = new EmbedBuilder();

        embedReply.setDescription(`Harambe will stop playing.`)

        await interaction.reply({
            embeds: [embedReply]
        });

    }

}
