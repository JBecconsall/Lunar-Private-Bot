const {EmbedBuilder, MessagePayload} = require('discord.js');
module.exports = {
    category: 'Applications',
    name: 'application-panel',
    description: 'Sends panel for applications',
    testOnly: true,
    
    callback: async ({interaction, client}) => {

        const staffEmbed = new EmbedBuilder()
        .setColor('Green')
        .setTitle('Staff Applications')
        .addFields(
            {name: 'Job Description', value: 'As a staff member for Lunar, you will be in charge of making sure that the Discord is kept clean and tidy. This means that you will be punishing any rule breakers that you come across. You will start off as a Trial Moderator ans be able to work up to Moderator over time giving more privileges.'},
            {name: 'Requirements', value: '>>> - Be at least 13 years of age [16+ is preferred] \n- Must be able to remain calm in stressful situations \n- Must have some previous experience in moderation'}
        )
        .setTimestamp()

        let message = MessagePayload.create(interaction.channel, {
            embeds: [staffEmbed]
        })

        await interaction.channel.send(message)

    }
}