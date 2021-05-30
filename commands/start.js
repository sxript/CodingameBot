const startClash = require('../api/startClashByHandle.js');
const startEmbed = require('../embeds/startEmbed');

const lobbyURL = 'https://www.codingame.com/clashofcode/clash/';

module.exports = {
    name: 'start',
    args: true,
    description: 'Starts the lobby on CodingGame',
    aliases: ['game'],
    cooldown: 5,
    execute(message, args) {
        const handle = [process.env.USER_ID, args[0]]
        startClash(handle);
        startEmbed.fields = [];
        startEmbed.setTitle("Game Started")
            .setDescription(`For Lobby Link: [Click Me!](${lobbyURL + handle[1]})`)
        return message.reply(startEmbed);
    }
}
