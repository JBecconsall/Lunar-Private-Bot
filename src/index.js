const {Client, IntentsBitField, GatewayIntentBits } = require('discord.js');
const CH = require('wokcommands');
const path = require('path');
require('dotenv/config')

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
    ]
});

module.exports = {
    client
}

client.on('ready', async () => {
    console.log('The bot is online!')

    const guild = await client.guilds.cache.get("1026962943616753735")

    const activities = [
        `over ${guild.memberCount} members`
    ]

    setInterval(() => {
        const status = activities[Math.floor(Math.random() * activities.length)];
        client.user.setPresence({activities: [{name: `${status}`}], type: "WATCHING "});
    }, 5000)

    new CH({
        client,
        debug: true,
        commandsdir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'events'),
        showWarns: true,
        mongoUri: 'mongodb+srv://ignJosh:Buster12@cluster0.gzfgi5h.mongodb.net/?retryWrites=true&w=majority',
        testServers: ['1026962943616753735'],
        
    })


});

client.login('OTgyNzI0NTk1NzA4NzUxOTQy.Ghcxzq.5yctcDWZl87J0UDno_zO_yQ4pWmURL577_74zQ')