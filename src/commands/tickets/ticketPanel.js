const { ButtonBuilder, EmbedBuilder, MessagePayload, ActionRowBuilder, ButtonStyle } = require("discord.js")
const { CommandType } = require("wokcommands");
module.exports = {
    category: 'Tickets',
    name: 'ticketpanel',
    description: 'Send panel for ticket selection',
    testOnly: true,
    type: CommandType.SLASH,
    ownerOnly: true,

    callback: async ({interaction, client}) => {

        const openButton = new ButtonBuilder()
                        .setCustomId('gensup')
                        .setEmoji('📩')
                        .setLabel('Create a Ticket')
                        .setStyle(ButtonStyle.Primary)

                    const row1 = new ActionRowBuilder()
                        .addComponents(openButton)

                    


        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle('Ticket Categories')
        .setDescription('Click below to open a ticket and get support from our team!')
        .setFooter({text: 'Ticket System'})
        .setTimestamp()

    
        let msg = MessagePayload.create(interaction.channel, {
            embeds: [embed],
            components: [row1]
        })

        await interaction.channel.send(msg)

    }
}