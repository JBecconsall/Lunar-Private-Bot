const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, MessagePayload, ActionRowBuilder } = require("discord.js")
const { CommandType } = require("wokcommands");
module.exports = {
    category: 'Tickets',
    name: 'ticketpanel',
    description: 'Send panel for ticket selection',
    testOnly: true,
    type: CommandType.SLASH,
    ownerOnly: true,

    callback: async ({interaction, client}) => {

        const selections = new StringSelectMenuBuilder()
        .setCustomId('tickets')
        .setPlaceholder('Make a selection!')
        .addOptions(
            new StringSelectMenuOptionBuilder()
            .setLabel('General Support')
            .setDescription('General Questions and Support')
            .setValue('gensup')
            .setEmoji('🎫'),
        )

        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle('Ticket Categories')
        .setDescription('The ticket categories for this guild are shown below. Please select the correct ticket type to start.')
        .setFooter({text: 'Ticket System'})
        .setTimestamp()

        const row = new ActionRowBuilder()
        .addComponents(selections)

        let msg = MessagePayload.create(interaction.channel, {
            embeds: [embed],
            components: [row]
        })

        await interaction.channel.send(msg)

    }
}