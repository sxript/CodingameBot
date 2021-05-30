module.exports = {
    name: 'link',
    description: 'Creates a new Game Room on Codingame',
    args: true,
    aliases: ['game'],
    cooldown: 5,
    execute(message, args) {
        let availableModes = ["FASTEST","SHORTEST","REVERSE"];
        let modes = [];
        args.forEach(argument => {
            if(availableModes.includes(argument.toUpperCase())) {
                modes.push(argument.toUpperCase());
            }
        })
        let settingsJSON = [process.env.USER_ID, {"SHORT": true}, [], modes];

        let handler = creatPrivateClash(settingsJSON);
        clashEmbed.setDescription(`@${message.author}, your custom game has been created`)
            .addField('Handler', handler, true)
            .addField('Lobby Link', lobbyURL+handler, true)

        return message.reply(clashEmbed);
    }
}
