const Discord = require('discord.js');
const startClash = require('../api/startClashByHandle.js');
const startEmbed = require('../embeds/startEmbed');

const lobbyURL = 'https://www.codingame.com/clashofcode/clash/';

const images = ['https://i.imgur.com/TrCFTrZ.png', 'https://i.imgur.com/IOjHILW.png',
    'https://i.imgur.com/OqeyhDM.png', 'https://i.imgur.com/UXq598c.png', 'https://i.imgur.com/kGy52I4.png']

const seconds = 1;
const startingCounter = 5;
let counter = startingCounter;

const getEmbed = () => {
    let embed = new Discord.MessageEmbed();
    embed.setThumbnail(images[counter-1])
        .setColor('#00A7FF')
    return embed;
}

const updateCounter = (message, handle) => {
    let embed = getEmbed();
    embed.setTitle("Game Starting")
        .setDescription(`For Lobby Link: [Click Me!](${lobbyURL + handle[1]})`)
        .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())

    message.edit(embed);
    counter -= seconds;

    if(counter <= 0) {
        counter = startingCounter;
        embed.setTitle("Game has Started")
            .setThumbnail(process.env.CLASH_THUMBNAIL);
        return message.edit(embed);
    } else {
        setTimeout(() => {
            updateCounter(message, handle)
        }, 1000 * seconds)
    }
}

module.exports = {
    name: 'start',
    args: true,
    description: 'Starts the lobby on CodingGame',
    aliases: ['game'],
    usage: '<lobby-handle>',
    cooldown: 5,
    execute(message, args) {
        const handle = [process.env.USER_ID, args[0]]
        startClash(handle);
        startEmbed.fields = [];
        startEmbed.setTitle("Game Starting")
            .setDescription(`For Lobby Link: [Click Me!](${lobbyURL + handle[1]})`)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL());
        message.reply(startEmbed).then(botMessage => {
            updateCounter(botMessage, handle);
        });
    }
}
