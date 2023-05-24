const { client } = require("../index");
const { TextInputBuilder, ModalBuilder, TextInputStyle, ActionRow, ActionRowBuilder} = require("discord.js");


module.exports = async(interaction) => {


    client.on("interactionCreate", async(interaction) => {

        if(!interaction.isButton()) return;

        if(interaction.customId === 'staffApply') {


            const staffModal = new ModalBuilder()
            .setCustomId('staffModal')
            .setTitle('Staff Team Application')


            const questionOne = new TextInputBuilder()
            .setCustomId('idQuestion')
            .setLabel('What is your Discord ID?')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

            const questionTwo = new TextInputBuilder()
            .setCustomId('whyQuestion')
            .setLabel('Why do you want to be a staff member?')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)

            const questionThree = new TextInputBuilder()
            .setCustomId('experienceQuestion')
            .setLabel('Do you have previous moderation experience?')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)

            const questionFour = new TextInputBuilder()
            .setCustomId('ageQuestion')
            .setLabel('How old are you?')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

            const actionRowOne = new ActionRowBuilder().addComponents(questionOne)
            const actionRowTwo = new ActionRowBuilder().addComponents(questionTwo)
            const actionRowThree = new ActionRowBuilder().addComponents(questionThree)
            const actionRowFour = new ActionRowBuilder().addComponents(questionFour)


            staffModal.addComponents(actionRowOne, actionRowTwo, actionRowThree, actionRowFour)

            await interaction.showModal(staffModal)
        }
    })
}