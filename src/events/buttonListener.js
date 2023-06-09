const {
    client
} = require("../index");
const {
    EmbedBuilder,
    MessagePayload,
    ChannelType,
    PermissionsBitField,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
} = require("discord.js");
module.exports = async (interaction) => {

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isButton()) return;


        if (interaction.customId === 'close') {

            if (!interaction.member.roles.cache.has('1026963904171085904')) {

                interaction.reply({
                    content: 'You do not have permission to close tickets',
                    ephemeral: true
                })

            } else {


                interaction.channel.permissionOverwrites.set([{
                        id: interaction.guild.roles.everyone,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: interaction.channel.topic,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory],
                        deny: [PermissionsBitField.Flags.SendMessages]
                    },
                    {
                        id: '1026963904171085904',
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                    }
                ])


                const reopenButton = new ButtonBuilder()
                    .setCustomId('re-open')
                    .setEmoji('🔓')
                    .setLabel('Re-Open')
                    .setStyle(ButtonStyle.Secondary)



                const deleteButton = new ButtonBuilder()
                    .setCustomId('delete')
                    .setEmoji('🗑️')
                    .setLabel('Delete')
                    .setStyle(ButtonStyle.Secondary)



                const transcriptButton = new ButtonBuilder()
                    .setCustomId('transcript')
                    .setEmoji('📜')
                    .setLabel('Transcript')
                    .setStyle(ButtonStyle.Secondary)



                const row1 = new ActionRowBuilder()
                    .addComponents(reopenButton, transcriptButton, deleteButton)

                const closedEmbed = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle('Ticket Closed')
                    .setDescription(`This ticket was closed by <@${interaction.user.id}> (${interaction.user.tag})`)
                    .setFooter({
                        text: interaction.user.tag,
                        iconURL: interaction.user.avatarURL()
                    })
                    .setTimestamp()

                let closedMsg = MessagePayload.create(interaction.channel, {
                    embeds: [closedEmbed],
                    components: [row1]
                })

                interaction.channel.send(closedMsg)





            }

        }

        if (interaction.customId === 're-open') {

            interaction.channel.permissionOverwrites.set([{
                id: interaction.guild.roles.everyone,
                deny: [PermissionsBitField.Flags.ViewChannel]
            },
            {
                id: interaction.channel.topic,
                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages],
            },
            {
                id: '1026963904171085904',
                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
            }
        ])

            const reopenedEmbed = new EmbedBuilder()
                .setColor('Orange')
                .setTitle('Ticket Re-Opened')
                .setDescription(`This ticket was re-opened by <@${interaction.user.id}> (${interaction.user.tag})`)
                .setFooter({
                    text: interaction.user.tag,
                    iconURL: interaction.user.avatarURL()
                })
                .setTimestamp()

            let closedMsg = MessagePayload.create(interaction.channel, {
                embeds: [reopenedEmbed]
            })

            await interaction.channel.send(closedMsg)

        }

        if (interaction.customId === 'delete') {

            if (!interaction.member.roles.cache.has('1026963904171085904')) {

                interaction.reply({
                    content: 'You do not have permission to close tickets',
                    ephemeral: true
                })

            } else {

                const deleting = new EmbedBuilder()
                    .setColor('Yellow')
                    .setDescription("This ticket will be deleted in 10 seconds")

                let deleteMsg = MessagePayload.create(interaction.channel, {
                    embeds: [deleting]
                })

                await interaction.channel.send(deleteMsg).then(
                    interaction.deferUpdate().then(
                        setTimeout(() => {
                            interaction.channel.delete()

                        }, 10000)
                    ))

            }

        }

    })
}