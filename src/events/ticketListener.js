const { EmbedBuilder, MessagePayload, ChannelType } = require("discord.js");
const { client } = require("../index");
module.exports = async(instance, message) => {

    const gensupOpened = new EmbedBuilder()
    .setColor('Green')
    .setTitle('General Support Ticket')
    .setDescription('Thank you for opening a general support ticket! \n\nPlease briefly describe what we can do to help and a support team member will assist shortly!')
    .setTimestamp()
    .setImage('https://images-ext-2.discordapp.net/external/Qj_Pnp42psww6cHUxaNRklU7tbL_MftxRLk_Oxh5jEA/%3Fsize%3D4096/https/cdn.discordapp.com/icons/1026962943616753735/de0c023285404f5c8956f887c9a65824.png')
    .setFooter({text: 'Ticket System'})

    client.on("interactionCreate", async(interaction) => {
        if(!interaction.isStringSelectMenu()) return;

        if(interaction.customId === 'tickets') {
            if(interaction.values[0] === 'gensup') {
                let channelName = `ticket-${interaction.user.tag}`
                let parent = '1057286042165723176'

                let newTicket = await interaction.guild.channels.create({
                    name: channelName,
                    parent: parent,
                    topic: `${interaction.user.id}`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS"]
                        },
                        {
                            id: '1026963904171085904',
                            allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS"]
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ["VIEW_CHANNEL"]
                        }
                    ],
                }).then(async channel => {
                    let msg = MessagePayload.create(channel, {
                        embeds: [gensupOpened]
                    })
                    await channel.send(msg)
                    await channel.send(`<@${interaction.user.id}> <@&1026963904171085904>`)
                })
            }
        }
    })
}