const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays songs and sounds')
		.addSubcommand((subcommand) => 
			subcommand
			.setName("song")
			.setDescription("Plays a song from the URL")
			.addStringOption((option) => 
				option
				.setName("url")
				.setDescription("Loads the song URL")
				.setRequired(true)
			)
		)
		.addSubcommand((subcommand) => 
			subcommand
			.setName("playlist")
			.setDescription("Loads a playlist of songs from URL")
			.addStringOption((option) => 
				option
				.setName("url")
				.setDescription("Loads the playlist URL")
				.setRequired(true)
			)
			.addBooleanOption((option) => 
				option
				.setName("shuffle")
				.setDescription("Shuffles the playlists songs")
				.setRequired(false)
			)
		)
		// .addSubcommand((subcommand) => 
		// 	subcommand
		// 	.setName("search")
		// 	.setDescription("Searches for a song using provided keywords")
		// 	.addStringOption((option) => 
		// 		option
		// 		.setName("keywords")
		// 		.setDescription("Keywords to search for song")
		// 		.setRequired(true)
		// 	)
		// )
		,
	async execute(interaction, client) {
		
		let embedReply = new EmbedBuilder();

		if (!interaction.member.voice.channel) {
			embedReply.setDescription('Harambe notices you are not in a voice-channel')
			return await interaction.reply({embeds: [embedReply]});
		}

		const queue = await client.player.nodes.create(interaction.guild);
		if (!queue.connection) {
			await queue.connect(interaction.member.voice.channel);
		}

		// Set a reply early to prevent timeout
		embedReply.setDescription('Harambe is preparing the queue')
		await interaction.reply({embeds: [embedReply]});

		let url;
		switch (interaction.options.getSubcommand()){
			case 'song':
				url = interaction.options.getString('url');

				const songResult = await client.player.search(url, {
					requestedBy: interaction.user,
					searchEngine: QueryType.YOUTUBE_VIDEO
				});

				if (songResult.tracks.size === 0) {
					embedReply.setDescription('Harambe could not load your song');
					return await interaction.editReply({embeds: [embedReply]});
				}

				const song = songResult.tracks[0];

				await queue.addTrack(song);

				embedReply
					.setDescription(`**[${song.title}]** was requested to Harambe.`)
					.setThumbnail(song.thumbnail)
					.setFooter({text: `Duration: ${song.duration}`});


				break;
			case 'playlist':
				url = interaction.options.getString('url');
				let shuffle = interaction.options.getBoolean('shuffle');

				const playlistResult = await client.player.search(url, {
					requestedBy: interaction.user,
					searchEngine: QueryType.YOUTUBE_PLAYLIST
				});

				if (playlistResult.tracks.length === 0) {
					embedReply.setDescription('Harambe could not load your playlist');
					return await interaction.editReply({embeds: [embedReply]});
				}

				if (shuffle) {
					playlistResult.tracks = playlistResult.tracks.sort((a, b) => 0.5 - Math.random());
				}

				await queue.addTrack(playlistResult.tracks);

				embedReply.setDescription(`Playlist was requested to Harambe.`);
				// .setDescription(`**[${playlistResult.title}]** was requested to Harambe.`);
				// .setThumbnail(song.thumbnail)
				// .setFooter({text: `Duration: ${song.duration}`});

				break;
			default:
				embedReply.setDescription('Harambe hit itself on it\'s own confusion');
				return await interaction.editReply({embeds: [embedReply]});
		}

		if (!queue.node.isPlaying()) {
			await queue.node.play();
		}

		await interaction.editReply({embeds: [embedReply]});
	},
};
