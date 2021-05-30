const Discord = require('discord.js');

const clashEmbed = new Discord.MessageEmbed()
    .setColor('#00A7FF')
    .setTitle('Created Private Clash')
    .setThumbnail(process.env.CLASH_THUMBNAIL)
    .setTimestamp();

module.exports = clashEmbed;
