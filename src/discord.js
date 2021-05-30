const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready',()=>{
    console.log('Bot running');
});


client.on('message', msg=>{
    
});



client.login(process.env.TOKEN);