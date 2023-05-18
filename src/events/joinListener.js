const { EmbedBuilder, MessagePayload, Discord } = require("discord.js")
const { client } = require("../index");


module.exports = async(interaction) => {
    client.on('guildMemberAdd', async (interaction, member) => {

        const embed = new EmbedBuilder()
        .setColor('#6666cc')
            .setTitle('Welcome!')
            .setDescription(`Welcome <@${interaction.user.id}> to **Lunar Support**`)
            .setThumbnail("https://images-ext-2.discordapp.net/external/Qj_Pnp42psww6cHUxaNRklU7tbL_MftxRLk_Oxh5jEA/%3Fsize%3D4096/https/cdn.discordapp.com/icons/1026962943616753735/de0c023285404f5c8956f887c9a65824.png")
            .setTimestamp()

        let channel = interaction.guild.channels.cache.find(c => c.id === '1027268283763785759')

        let message = MessagePayload.create(channel,{
            embeds: [embed]
        });

        await channel.send(`<@{interaction.user.id}>`).then(channel.send(message))

    })
}