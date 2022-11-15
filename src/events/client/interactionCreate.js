const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate, 
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const {commands} = client;
            const {commandName} = interaction;

            const command = commands.get(commandName);

            //If command does not exist then exits
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.log(error);
                await interaction.reply({
                    content: `Something went wrong executing command. Harambe is not happy`
                    , ephemeral: true
                });
            }
        }
    }
}