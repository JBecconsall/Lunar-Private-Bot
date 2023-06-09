const {
    EmbedBuilder,
    MessagePayload,
    ChannelType,
    PermissionsBitField,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
} = require("discord.js");
const {
    client
} = require("../index");
module.exports = async (instance, message) => {

    const gensupOpened = new EmbedBuilder()
        .setColor('Purple')
        .setTitle('General Support Ticket')
        .setDescription('>>> Thank you for contacting support \nPlease describe your issue and await a response')
        .setTimestamp()
        .setThumbnail('https://images-ext-2.discordapp.net/external/Qj_Pnp42psww6cHUxaNRklU7tbL_MftxRLk_Oxh5jEA/%3Fsize%3D4096/https/cdn.discordapp.com/icons/1026962943616753735/de0c023285404f5c8956f887c9a65824.png')
        .setFooter({
            text: 'Ticket System'
        })

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;



        if (interaction.customId === 'tickets') {
            if (interaction.values[0] === 'gensup') {
                let channelName = `ticket-${interaction.user.tag}`
                let parent = '1057286042165723176'

                let newTicket = await interaction.guild.channels.create({
                    name: channelName,
                    parent: parent,
                    topic: `${interaction.user.id}`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [{
                            id: interaction.user.id,
                            //allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES', 'ATTACH_FILES', 'EMBED_LINKS']
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                        },
                        {
                            id: '1026963904171085904',
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ViewChannel]
                        }
                    ],
                }).then(async channel => {

                    const closeButton = new ButtonBuilder()
                        .setCustomId('close')
                        .setEmoji('🔒')
                        .setLabel('Close')
                        .setStyle(ButtonStyle.Danger)

                    const row1 = new ActionRowBuilder()
                        .addComponents(closeButton)

                    let msg = MessagePayload.create(channel, {
                        embeds: [gensupOpened],
                        components: [row1]
                    })
                    await interaction.reply({
                        content: `Your ticket has been made at <#${channel.id}>`,
                        ephemeral: true
                    })
                    await channel.send(msg)
                    await channel.send(`<@${interaction.user.id}> <@&1026963904171085904>`)

                })
            }
        }


    })

}