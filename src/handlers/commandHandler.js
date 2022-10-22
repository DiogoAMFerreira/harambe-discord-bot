const fs = require('node:fs');
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../../config.json');

module.exports = (client) => {
    client.handleCommands = async() => {
        //Gets the list of files inside directory commands
        const commandFolders = fs.readdirSync('./src/commands').filter((file) => fs.statSync(`./src/commands/${file}`).isDirectory());
        
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith(".js"));

            const {commands, commandsArray} = client;
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);

                commands.set(command.data.name, command);
                commandsArray.push(command.data.toJSON());

                console.log(`Command ${command.data.name} has been required by handler`);
            }
        }
        
		// Construct and prepare an instance of the REST module
		const rest = new REST({ version: '10' }).setToken(token);

		// and deploy your commands!
		(async () => {
			try {
				console.log(`Started refreshing ${client.commandsArray.length} application (/) commands.`);

				// The put method is used to fully refresh all commands in the guild with the current set
				//Routes.applicationCommands(clientId) -- For more than one guild
				const data = await rest.put(
					Routes.applicationGuildCommands(clientId, guildId),
					{ body: client.commandsArray },
				);

				console.log(`Successfully reloaded ${data.length} application (/) commands.`);
			} catch (error) {
				// And of course, make sure you catch and log any errors!
				console.error(error);
			}
		})();

    }
}