const {
    client
} = require("../index");
module.exports = async (interaction) => {

    client.on("interactionCreate", async(interaction) => {
        if (!interaction.isButton()) return;


        if (interaction.customId === 'close') {

            interaction.channel.send('works')

            // if (interaction.member.guild.roles.cache.has('1026963904171085904')) {

            //     interaction.reply({
            //         content: 'debug',
            //         ephemeral: true
            //     })

            // } else {
            //     interaction.reply({
            //         content: 'You do not have permission to close tickets',
            //         ephemeral: true
            //     })
            // }

        }

    })
}