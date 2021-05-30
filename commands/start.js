const startClash = require('../api/startClashByHandle.js');

module.exports = {
    name: 'start',
    args: true,
    description: 'Starts the lobby on CodingGame',
    aliases: ['game'],
    cooldown: 5,
    execute(message, args) {
        const handle = [process.env.USER_ID, args[0]]
        startClash(handle);
        return message.reply("Game Started");
    }
}