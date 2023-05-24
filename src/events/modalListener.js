const {
    client
} = require("../index");
const {
    TextInputBuilder,
    ModalBuilder,
    TextInputStyle,
    ActionRow,
    ActionRowBuilder,
    MessagePayload,
    EmbedBuilder
} = require("discord.js");


module.exports = async (interaction) => {


    client.on("interactionCreate", async (interaction) => {

            if (!interaction.isModalSubmit()) return;

            if (interaction.customId === 'staffModal') {
                await interaction.reply({
                    content: 'You have successfully submitted your staff team application!',
                    ephemeral: true
                })

                const userID = interaction.fields.getTextInputValue('idQuestion');
                const reason = interaction.fields.getTextInputValue('whyQuestion')
                const experience = interaction.fields.getTextInputValue('experienceQuestion')
                const age = interaction.fields.getTextInputValue('ageQuestion')

                let logChannel = interaction.guild.channels.cache.get('1110857147685801994')

                const staffEmbed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle('New Staff Team application received!')
                    .addFields({
                        name: 'Submitted By',
                        value: `<@${userID}>`
                    }, {
                        name: 'User ID',
                        value: userID
                    }, {
                        name: 'How old are you?',
                        value: age
                    }, {
                        name: 'Why do you want to be a staff member?',
                        value: reason
                    }, {
                        name: 'What previous experience do you have?',
                        value: experience
                    }
                    )
                    .setTimestamp()

                let msg = MessagePayload.create(logChannel, {
                    embeds: [staffEmbed]
                })

                await logChannel.send(msg)
            }

        }

    )
}