const fs = require('node:fs');

module.exports = (client) => {
    client.handleEvents = async () => {
        const eventFolders = fs.readdirSync('./src/events');
        
        for (const folder of eventFolders) {
            const eventFiles = fs.readdirSync(`./src/events/${folder}`).filter((file) => file.endsWith('.js'));

            switch(folder) {
                case 'client':
                    for (const file of eventFiles) {
                        const event = require(`../events/${folder}/${file}`);
                        if (event.once) {
                            client.once(event.name, (...args) => event.execute(...args, client));
                        } else {
                            client.on(event.name, (...args) => event.execute(...args, client));
                        }
                        // console.log(`Event ${event.name} has been required by handler`);
                    }
                    break;
                case 'player':
                    for (const file of eventFiles) {
                        const event = require(`../events/${folder}/${file}`);
                        if (event.once) {
                            client.player.events.once(event.name, (...args) => event.execute(...args, client));
                        } else {
                            client.player.events.on(event.name, (...args) => event.execute(...args, client));
                        }
                        // console.log(`Event ${event.name} has been required by handler`);
                    }
                    break;
                default:
                    break;
            }
        }
    }
}