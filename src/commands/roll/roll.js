const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls between 1-100!'),
	async execute(interaction, client) {
		
		let embedReply = new EmbedBuilder();

        let roll = Math.floor(Math.random() * 100) + 1;

		embedReply.setDescription('Harambe has decided and the roll is **' + roll.toString() + '**');
		
		await interaction.reply({embeds: [embedReply]});
	},
};
