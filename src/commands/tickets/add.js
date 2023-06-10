const {EmbedBuilder, MessagePayload, ApplicationCommandOptionType, PermissionsBitField} = require("discord.js");
const { CommandType } = require("wokcommands");

module.exports = {
    category: 'Tickets',
    name: 'add',
    description: 'Adds a user to the ticket',
    testOnly: true,
    type: CommandType.SLASH,
    ownerOnly: true,
    options: [
        {
            name: 'user',
            description: 'The user to add to the ticket',
            required: true,
            type: ApplicationCommandOptionType.User
        }
    ],
    callback: async ({interaction, client}) => {

        const user = interaction.options.getMember('user')
        

        const success = new EmbedBuilder()
        .setColor('Green')
        .setDescription(`${user.user.tag} has been added to the ticket!`)
        .setTimestamp()

        if (!interaction.member.roles.cache.has('1026963904171085904')) {

            interaction.reply({
                content: 'You do not have permission to add people to tickets',
                ephemeral: true
            })

        } else {

            
                await interaction.channel.permissionOverwrites.edit([
                    {
                        id: user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
            
                    }

                ])

                let msg = MessagePayload.create(interaction.channel, {
                    embeds: [success]
                })

                await interaction.channel.send(msg)
            

        } 


    }
}