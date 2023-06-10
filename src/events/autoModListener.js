const {
    EmbedBuilder,
    MessagePayload
} = require("discord.js")
const {
    client
} = require("../index");


module.exports = async (interaction, message) => {

    client.on('messageCreate', async (message) => {


        if (message.content.includes('discord.gg/')) {

            if (!message.member.roles.cache.has('1116876087989903411')) {

                try {
                    message.delete().then(message.member.timeout(300000, 'Sending invite links'))

                } catch (err) {
                    console.log(err)
                }
                const autoModEmbed = new EmbedBuilder()
                    .setTitle(`⚠️ Auto Moderation`)
                    .addFields({
                        name: 'Action',
                        value: "`" + `Timeout (AutoMod)` + "`"
                    }, {
                        name: 'Details',
                        value: "`" + 'User:' + "` " + `<@${message.author.id}>` + "`" + `(${message.author.id})` + "`\n" + "`" + 'Time' + "` " + "5m\n" + "`" + "Reason:" + "` " + "Posted an invite link in " + `<#${message.channel.id}> ` + "`" + "(" + `${message.content})` + "`"
                    })
                    .setTimestamp()
                    .setColor('Red')

                let automodChannel = message.guild.channels.cache.find(c => c.id === '1114178682295164959')

                let logMsg = MessagePayload.create(automodChannel, {
                    embeds: [autoModEmbed]
                })

                await automodChannel.send(logMsg)

                const dmEmbed = new EmbedBuilder()
                    .setTitle(`⚠️ Moderation Alert`)
                    .setDescription(`You were timed out in ${message.guild.name}`)
                    .addFields({
                        name: 'Details',
                        value: "`" + 'Time' + "` " + "5m\n" + "`" + "Reason:" + "` " + "Posted an invite link in " + `<#${message.channel.id}> ` + "`" + "(" + `${message.content})` + "`"
                    })
                    .setTimestamp()
                    .setColor('Red')

                let dmMsg = MessagePayload.create(automodChannel, {
                    embeds: [dmEmbed]
                })


                try {
                    message.author.send(dmMsg)
                } catch (err) {
                    console.log(err)
                }

            } else {

                console.log('Bypass')



            }
        }

        if (message.content.includes('nigger') || message.content.includes('Nigger')) {

            if (!message.member.roles.cache.has('1116876087989903411')) {

                let automodChannel = message.guild.channels.cache.find(c => c.id === '1114178682295164959')

                const dmEmbed = new EmbedBuilder()
                    .setTitle(`⚠️ Moderation Alert`)
                    .setDescription(`You were banned from ${message.guild.name}`)
                    .addFields({
                        name: 'Details',
                        value: "`" + 'Time' + "` " + "Permanent\n" + "`" + "Reason:" + "` " + "Posted a banned word in " + `<#${message.channel.id}> ` + "`" + "(" + `${message.content})` + "`"
                    })
                    .setTimestamp()
                    .setColor('Red')


                let dmMsg = MessagePayload.create(automodChannel, {
                    embeds: [dmEmbed]
                })


                
                try {
                    message.author.send(dmMsg)
                } catch (err) {
                    console.log(err)
                }


                setTimeout(() => {
                    try {
                        message.delete().then(
                            message.guild.bans.create(message.member, {reason: 'Racism'})
                        )
    
                    } catch (err) {
                        console.log(err)
                    }

                }, 5000)
                
                const autoModEmbed = new EmbedBuilder()
                    .setTitle(`⚠️ Auto Moderation`)
                    .addFields({
                        name: 'Action',
                        value: "`" + `Ban (AutoMod)` + "`"
                    }, {
                        name: 'Details',
                        value: "`" + 'User:' + "` " + `<@${message.author.id}>` + "`" + `(${message.author.id})` + "`\n" + "`" + 'Time' + "` " + "Permanent\n" + "`" + "Reason:" + "` " + "Posted a banned word in " + `<#${message.channel.id}> ` + "`" + "(" + `${message.content})` + "`"
                    })
                    .setTimestamp()
                    .setColor('Red')

    

                let logMsg = MessagePayload.create(automodChannel, {
                    embeds: [autoModEmbed]
                })

                await automodChannel.send(logMsg)

                
            
            } else {

                console.log('Bypass')



            }
        }

    })
}