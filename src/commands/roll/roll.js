const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls between 1-100!'),
	async execute(interaction, client) {
        let roll = Math.floor(Math.random() * 100) + 1;

		await interaction.reply('Harambe has decided and the roll is **' + roll.toString() + '**');
	},
};
