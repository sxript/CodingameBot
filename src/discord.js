const Discord = require('discord.js');
const loadCommands = require('../helpers/loadCommmands');


const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
loadCommands(client);

const { PREFIX } = process.env;
const {channel_id} = process.env

client.on('ready',()=>{
    console.log('Bot running');
});


client.on('message', (message)=>{
    if(!message.content.startsWith(PREFIX) || message.author.bot || message.channel.id != channel_id) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {

        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}`;
            if(command.usage) {
                reply += `\nThe proper usage would be: \`${PREFIX}${commandName} ${command.usage}\``;
            }
            return message.channel.send(reply);
        }
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }

});



client.login(process.env.TOKEN);
