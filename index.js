const {Client, IntentsBitField } = require('discord.js');
const CH = require('cmd-handler');
require('dotenv/config')

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds
    ]
});

client.on('ready', () => {
    console.log('The bot is online!')

});

client.login(process.env.TOKEN)