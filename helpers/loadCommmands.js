const fs = require('fs');

const loadCommands = (client) => {
    const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`../commands${file}`);
        client.commands.set(command.name, command);
    }
}
