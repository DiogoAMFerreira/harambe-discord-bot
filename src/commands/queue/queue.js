const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription("Shows the current song queue")
    , async execute(interaction, client) {
        
        let embedReply = new EmbedBuilder();

        const queue = client.player.nodes.get(interaction.guildId);
        //In case there is no queue
        if (!queue || !queue.node.isPlaying()) {
            embedReply.setDescription('Harambe is not playing any music');
            return await interaction.reply({embeds: [embedReply]});
        } 

        embedReply = await this.createQueueEmbeded(queue);

        const messageReply = await interaction.reply({
			embeds: [embedReply],
            fetchReply: true
		});

        //Adds the PreviousPage and NextPage Reactions
        messageReply.react('⬅️')
            .then(r => {
                messageReply.react('➡️');
            })
            .catch(m => {
                console.log('Reactions failed to load');
            });

        const reactionFilter = (reaction, user) => {
            //['⬅️', '➡️'].includes(reaction.emoji.name) &&
            return user.id === interaction.user.id
        }

        const reactionCollector = messageReply.createReactionCollector({reactionFilter, max: 1, time: 5000 });

        reactionCollector.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        });

        reactionCollector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });

    }
    , async createQueueEmbeded(queue, pageNumber = 0) {
        let embedReply = new EmbedBuilder();

        //Current song playing
        const currentSong = queue.currentTrack;

        let queueString = '*Nothing*';
        if (queue.tracks.size > 0) {
            queueString = queue.tracks.toArray().slice(0, 10).map((song, i) => {
                return `**${i + 1}#** [${song.duration}] ${song.title}`;
                //Requested by: <@${song.requestedBy.id}> //TODO: Find how to tag the user
            }).join("\n");
        }

        const progressString = await queue.node.createProgressBar();

        embedReply.setDescription(`**Harambe is currently playing:** \n ${currentSong.title} \n `)
            .setThumbnail(currentSong.thumbnail)
            .addFields([
                {
                    name: 'Progress:', 
                    value: progressString
                }, {
                    name:'Up next:', 
                    value: queueString
                }
            ]);

        return embedReply;
    }

}