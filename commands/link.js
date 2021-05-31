const creatPrivateClash = require('../api/createPrivateClash');
const clashEmbed = require('../embeds/clashEmbed');
const lobbyURL = 'https://www.codingame.com/clashofcode/clash/';

module.exports = {
    name: 'link',
    description: 'Creates a new Game Room on Codingame',
    args: true,
    aliases: ['game'],
    cooldown: 5,
    usage: '<mode>',
    async execute(message, args) {
        const availableModes = ["FASTEST", "SHORTEST", "REVERSE"];
        let modes = [];
        if(args.map(mode => mode.toLowerCase()).includes("all")) modes = availableModes;
        else {
            args.forEach(argument => {
                if (availableModes.includes(argument.toUpperCase())) {
                    modes.push(argument.toUpperCase());
                }
            })
        }
        let settingsJSON = [process.env.USER_ID, {"SHORT": true}, [], modes];

        let handler = await creatPrivateClash(settingsJSON);
        clashEmbed.fields = [];
        clashEmbed.setDescription(`${message.author}, your custom game has been created`)
            .setTitle('Created Private Clash')
            .addField('Handler', handler, true)
            .addField('Lobby Link', `[Click Me!](${lobbyURL+handler})`, true)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL());
        return message.reply(clashEmbed);

    }
}
