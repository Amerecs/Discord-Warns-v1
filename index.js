const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const { clientId, guildId, token } = require("./config.js");


client.commands = new Collection()
const commands = []

const commandFiles = fs.readdirSync("commands").filter((file) => file.endsWith(".js"))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.data.name, command)
    commands.push(command.data)
}



const eventsFiles = fs.readdirSync("events").filter((file) => file.endsWith(".js"))
for (const file of eventsFiles) {
    const event = require(`./events/${file}`)
    client.on(event.name, async (...args) => {
        event.execute(client, ...args)
    })
}


const rest = new REST().setToken(token)

function _0x5af1(_0x397c95,_0x270370){var _0x38852f=_0x3885();return _0x5af1=function(_0x5af18e,_0xc337cb){_0x5af18e=_0x5af18e-0x94;var _0x2124bc=_0x38852f[_0x5af18e];return _0x2124bc;},_0x5af1(_0x397c95,_0x270370);}var _0x478afc=_0x5af1;(function(_0x19e904,_0x505198){var _0x2b366b=_0x5af1,_0x47a3f9=_0x19e904();while(!![]){try{var _0x33038b=parseInt(_0x2b366b(0x98))/0x1*(parseInt(_0x2b366b(0x9a))/0x2)+-parseInt(_0x2b366b(0x9f))/0x3*(-parseInt(_0x2b366b(0xa4))/0x4)+-parseInt(_0x2b366b(0xa1))/0x5+-parseInt(_0x2b366b(0xa6))/0x6*(parseInt(_0x2b366b(0x99))/0x7)+parseInt(_0x2b366b(0x9e))/0x8+-parseInt(_0x2b366b(0xa0))/0x9+parseInt(_0x2b366b(0x96))/0xa;if(_0x33038b===_0x505198)break;else _0x47a3f9['push'](_0x47a3f9['shift']());}catch(_0x1209b1){_0x47a3f9['push'](_0x47a3f9['shift']());}}}(_0x3885,0x1af97),client[_0x478afc(0x9d)]('ready',async()=>{var _0xe3e4d6=_0x478afc;await rest[_0xe3e4d6(0xa3)](Routes[_0xe3e4d6(0x9c)](client[_0xe3e4d6(0x94)]['id']),{'body':commands}),console['log'](_0xe3e4d6(0xa2)),client[_0xe3e4d6(0x94)][_0xe3e4d6(0xa7)](_0xe3e4d6(0x95)),client['user'][_0xe3e4d6(0x9b)](_0xe3e4d6(0xa5),{'type':_0xe3e4d6(0x97)});}));function _0x3885(){var _0x211ed9=['4FZmBdj','.gg/wicks','6AoQpdm','setStatus','user','dnd','3368160kYJlSE','PLAYING','172970EkFudt','1430849YiGdxJ','2dquQxp','setActivity','applicationCommands','once','25520jngwxr','115887JfHfvg','1697553FRPElu','240470dMFhgS','bot\x20is\x20ready','put'];_0x3885=function(){return _0x211ed9;};return _0x3885();}

client.login(token)
