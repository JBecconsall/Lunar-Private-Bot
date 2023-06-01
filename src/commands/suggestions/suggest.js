const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');
const { CommandType } = require("wokcommands");
module.exports = {
    category: 'Suggestions',
    name: 'suggest',
    description: 'Make a server suggestion',
    type: CommandType.SLASH,
    testOnly: true,
    ownerOnly: true,
    
    
    callback: async ({interaction, client}) => {

        const modal = new ModalBuilder()
            .setCustomId('suggestionModal')
            .setTitle('Suggestions')


            const questionOne = new TextInputBuilder()
            .setCustomId('suggestionInput')
            .setLabel('What is your suggestion?')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

            
            const actionRowOne = new ActionRowBuilder().addComponents(questionOne)


            modal.addComponents(actionRowOne)

            await interaction.showModal(modal)
        

    },
}