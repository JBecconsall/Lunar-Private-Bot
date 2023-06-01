const {
    client
} = require("../index");
const {
    TextInputBuilder,
    ModalBuilder,
    TextInputStyle,
    ActionRow,
    ActionRowBuilder,
    EmbedBuilder,
    MessagePayload
} = require("discord.js");


module.exports = async (interaction) => {

    client.on("interactionCreate", async (interaction) => {

        if (interaction.customId === 'suggestionModal') {
            await interaction.reply({
                content: 'You have successfully submitted your suggestion!',
                ephemeral: true
            })

            const userID = interaction.user.id;
            const text = interaction.fields.getTextInputValue('suggestionInput')

            let logChannel = interaction.guild.channels.cache.get('1039586602659352796')

            const suggestionEmbed = new EmbedBuilder()
                .setColor('Blue')
                .setTitle('New Suggestion')
                .addFields({
                        name: `Suggestion made by:`,
                        value: `<@${userID}> \`(${userID})\``,
                        inline: true
                        //value: `\`\`\`${text}\`\`\``
                    },
                    {
                        name: 'Suggestion',
                        value: `\`\`\`${text}\`\`\``
                    })
                    .setTimestamp()

            let msg = MessagePayload.create(logChannel, {
                embeds: [suggestionEmbed]
            })

            await logChannel.send(msg)
        }
    })
}