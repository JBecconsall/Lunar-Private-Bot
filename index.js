const {Client, IntentsBitField } = require('discord.js');
const CH = require('cmd-handler');
const path = require('path');
require('dotenv/config')

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds
    ]
});

client.on('ready', () => {
    console.log('The bot is online!')

    new CH({
        client,
        mongoUri: process.env.MONGO_URI,
        commandsDir: path.join(__dirname, 'commands')
    })

});

client.login(process.env.TOKEN)