const {EmbedBuilder, MessagePayload, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');
const { CommandType } = require("wokcommands");
module.exports = {
    category: 'Applications',
    name: 'applicationpanel',
    description: 'Sends panel for applications',
    type: CommandType.SLASH,
    testOnly: true,
    ownerOnly: true,
    
    
    callback: async ({interaction, client}) => {

        const staffEmbed = new EmbedBuilder()
        .setColor('Green')
        .setTitle('Staff Team Applications')
        .addFields(
            {name: 'Job Description', value: 'As a staff member for Lunar, you will be in charge of making sure that the Discord is kept clean and tidy. This means that you will be punishing any rule breakers that you come across. You will start off as a Trial Moderator ans be able to work up to Moderator over time giving more privileges.'},
            {name: 'Requirements', value: '>>> - Be at least 13 years of age [16+ is preferred] \n- Must be able to remain calm in stressful situations \n- Must have some previous experience in moderation'}
        )
        .setTimestamp()

        const supportEmbed = new EmbedBuilder()
        .setColor('Green')
        .setTitle('Support Team Applications')
        .addFields(
            {name: 'Job Description', value: 'As a support team member for Lunar, you will be in charge of handling support tickets that come your way. You will be able to assist with General Inquiry tickets, with access to other tickets coming upon promotion to the Human Resources department.'},
            {name: 'Requirements', value: '>>> - Be at least 13 years of age [16+ is preferred] \n- Must be able to remain calm in stressful situations \n- Must be familiar with our services to provide the best support possible.'}
        )
        .setTimestamp()

        const staffButton = new ButtonBuilder()
        .setCustomId('staffApply')
        .setLabel('Apply for the Staff Team')
        .setStyle(ButtonStyle.Success)

        const supportButton = new ButtonBuilder()
        .setCustomId('supportApply')
        .setLabel('Apply for the Support Team')
        .setStyle(ButtonStyle.Success)

        const row1 = new ActionRowBuilder()
        .addComponents(staffButton)

        const row2 = new ActionRowBuilder()
        .addComponents(supportButton)

        let staffMessage = MessagePayload.create(interaction.channel, {
            embeds: [staffEmbed],
            components: [row1]
        })

        let supportMessage = MessagePayload.create(interaction.channel, {
            embeds: [supportEmbed],
            components: [row2]
        })

        await interaction.channel.send(staffMessage)
        await interaction.channel.send(supportMessage)

    },
}