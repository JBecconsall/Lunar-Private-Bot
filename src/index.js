const {Client, IntentsBitField } = require('discord.js');
const CH = require('cmd-handler');
const path = require('path');
require('dotenv/config')

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds
    ]
});

module.exports = {
    client
}

client.on('ready', () => {
    console.log('The bot is online!')

    new CH({
        client,
        mongoUri: 'mongodb+srv://ignJosh:Buster12@cluster0.gzfgi5h.mongodb.net/?retryWrites=true&w=majority',
        commandsDir: path.join(__dirname, 'commands'),
        })



});

client.login('OTgyNzI0NTk1NzA4NzUxOTQy.Ghcxzq.5yctcDWZl87J0UDno_zO_yQ4pWmURL577_74zQ')