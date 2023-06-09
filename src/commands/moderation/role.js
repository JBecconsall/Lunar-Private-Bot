const {EmbedBuilder, MessagePayload, ApplicationCommandOptionType} = require("discord.js");
const { CommandType } = require("wokcommands");

module.exports = {
    category: 'Moderation',
    name: 'role',
    description: 'Adds a role to the user',
    testOnly: true,
    type: CommandType.SLASH,
    options: [
        {
            name: 'user',
            description: 'The user to give a role to',
            required: true,
            type: ApplicationCommandOptionType.User
        },
        {
            name: 'role',
            description: 'Role to give to the user',
            required: true,
            type: ApplicationCommandOptionType.Role
        }
    ],
    callback: ({interaction, client}) => {

        const user = interaction.options.getMember('user')
        const role = interaction.options.getRole('role')
        let roleToAdd = interaction.member.guild.roles.cache.find(r1 => r1.id === role.id);

        let logchannel =  interaction.guild.channels.cache.find(c => c.id === '1068190337224417451')


        if (interaction.member.guild.roles.cache.has('1029519784708149399') || interaction.member.guild.roles.cache.has('1026963714366263356') || interaction.member.permissions.has('MANAGE_ROLES')) {

            const denied = new EmbedBuilder()
                .setDescription(`<:redcross:1116854666861490276> You cannot do this as ${role} is higher than your highest role (${interaction.member.roles.highest})`)
                .setColor('Red')
                .setTimestamp()

            if (interaction.member.roles.highest.position < role.position) {
                let msg = MessagePayload.create(interaction.channel, {
                    embeds: [denied]
                })
                interaction.reply(msg)
            } else {
                user.roles.add(roleToAdd)
                const success = new EmbedBuilder()
                    .setTitle("Role Added")
                    .setDescription(`<:greentick:1116854720515018824> Successfully added ${role} to ${user}`)
                    .setThumbnail(interaction.user.avatarURL())
                    .setTimestamp()
                    .setColor('#1df028')
                    .setFooter({text: `Command executed by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL()})

                const logEmbed = new EmbedBuilder()
                    .setTitle("ROLE ADDED")
                    .setDescription(`<:greentick:1116854720515018824> <@${interaction.user.id}> has added ` + "`" + `${role.name}` + "`" + ` to ${user.user.tag} in ${interaction.guild.name}!`)
                    .addFields(
                        {name: 'Added By', value: "`" + `${interaction.user.tag} ` + "`", inline: true},
                        {name: 'Added By ID', value: "`" + `${interaction.user.id} ` + "`", inline: true},
                        {name: 'Added To', value: `<@${user.id}>`, inline: true},
                        {name: 'Added To ID', value: "`" + `${user.id} ` + "`", inline: true},
                        {name: 'Role Added', value: `${role.name}`, inline: false},

                    )
                    .setThumbnail(interaction.user.avatarURL())
                    .setTimestamp()
                    .setColor('Green')
                    .setFooter({text: `Command executed by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL()})

                let msg = MessagePayload.create(interaction.channel, {
                    embeds: [success]
                })
                interaction.reply(msg)
                let logMessage = MessagePayload.create(logchannel, {
                    embeds: [logEmbed]
                })
                logchannel.send(logMessage)
                


            }
        } else {
            interaction.reply({content: "You do not have permission to do this", ephemeral: true})
        }
    }
}