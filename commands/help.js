const Discord = require('discord.js');
const {PREFIX} = process.env;

module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args) {
        const { commands } = message.client;

        const embed = new Discord.MessageEmbed();

        if (!args.length) {
            embed.setTitle("Commands")
                .addField('Here\'s a list of all my commands:', commands.map(cmd => cmd.name).join(', '))
                .addField('To see more details about a command:', `${PREFIX}help [command name]`)
                .setColor('#b497ff')
                .setAuthor(message.client.user.username, message.client.user.displayAvatarURL());

            return message.author.send(embed)
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            embed.addField(name, 'That\'s not a valid command!')
                .setColor('#b497ff')
                .setAuthor(message.client.user.username, message.client.user.displayAvatarURL());
            return message.reply(embed);
        }

        embed.setTitle(`Command Info: ${name}`)
            .addField("**Name:**", command.name)
            .setColor('#b497ff')
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL());

        if (command.aliases) embed.addField("**Aliases:**", command.aliases.join(', '));
        if (command.description) embed.addField("**Description:**", command.description);
        if (command.usage) embed.addField("**Usage:**", `${PREFIX}${command.name} ${command.usage}`);

        embed.addField("**Cooldown:**", `${command.cooldown || 3} second(s)`);

        return message.channel.send(embed);
    },
};
