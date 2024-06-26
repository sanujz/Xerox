const { MessageEmbed } = require('discord.js')
let enable = `<:Xerox_Failure:1255432339807408199><:Xerox_Failure:1255432339807408199>`
let disable = `<:Xerox_Failure:1255432339807408199><:Xerox_Success:1255432489795850280>`
let protect = `<:Xerox_Antinuke:1255434662319226900>`
let hii = `<:Xerox_:1255435050946793553>`
const wait = require('wait')

module.exports = {
    name: 'antilink',
    aliases: [],
    cooldown: 5,
    category: 'automod',
    subcommand: ['enable', 'disable', 'punishment'],
    premium: true,
    run: async (client, message, args) => {
        const embed = new MessageEmbed().setColor('294462')
        if (message.guild.memberCount < 30) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor('294462')
                        .setDescription(
                            `${client.emoji.cross} | Your Server Doesn't Meet My 30 Member Criteria`
                        )
                ]
            })
        }
        let own = message.author.id == message.guild.ownerId
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.channel.send({
                embeds: [
                    embed
                        .setColor('294462')
                        .setDescription(
                            `${client.emoji.cross} | You must have \`Administrator\` permissions to use this command.`
                        )
                ]
            })
        }
        if (!message.guild.me.permissions.has('ADMINISTRATOR')) {
            return message.channel.send({
                embeds: [
                    embed
                        .setColor('294462')
                        .setDescription(
                            `${client.emoji.cross} | I don't have \`Administrator\` permissions to execute this command.`
                        )
                ]
            })
        }
        if (
            !own &&
            message.member.roles.highest.position <=
                message.guild.me.roles.highest.position
        ) {
            return message.channel.send({
                embeds: [
                    embed
                        .setColor('294462')
                        .setDescription(
                            `${client.emoji.cross} | You must have a higher role than me to use this command.`
                        )
                ]
            })
        }
        let prefix = message.guild.prefix || '&' // Correct way to define default prefix

        const option = args[0]
        const isActivatedAlready =
            (await client.db.get(`antilink_${message.guild.id}`)) ?? null

        const antilink = new MessageEmbed()
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setColor('294462')
            .setTitle('__**Antilink**__')
            .setDescription(
                "Enhance your server's protection with Antilink! Our advanced algorithms swiftly identify suspicious links and take immediate action against them, safeguarding your community from potential threats."
            )
            .addField(
                '__**Antilink Enable**__',
                `To Enable Antilink, use \`${prefix}antilink enable\``
            )
            .addField(
                '__**Antilink Disable**__',
                `To Disable Antilink, use \`${prefix}antilink disable\``
            )
            .addField(
                '__**Antilink Punishment**__',
                'Configure the punishment for users posting suspicious links.'
            )
            .addField(
                'Options',
                '`ban` - Ban users, `kick` - Kick users, `mute` - Mute users'
            )
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())

        switch (option) {
            case undefined:
                message.channel.send({ embeds: [antilink] })
                break

            case 'enable':
                if (!isActivatedAlready) {
                    await client.db.set(`antilink_${message.guild.id}`, true)
                    await client.db.set(`antilinkp_${message.guild.id}`, {
                        data: 'mute'
                    })

                    const antilinkEnableMessage = new MessageEmbed()
                        .setColor('294462')
                        .setTitle('Antilink Enabled')
                        .setDescription(
                            '**Congratulations! Antilink has been successfully enabled on your server.**'
                        )
                        .addField(
                            'Enhanced Protection',
                            'Enjoy enhanced protection against suspicious links!'
                        )
                        .setTimestamp()
                        .setFooter(
                            client.user.username,
                            client.user.displayAvatarURL()
                        )

                    await message.channel.send({
                        embeds: [antilinkEnableMessage]
                    })
                } else {
                    const antilinkSettingsEmbed = new MessageEmbed()
                        .setTitle(
                            `Antilink Settings for ${message.guild.name} ${protect}`
                        )
                        .setColor('294462')
                        .setDescription(
                            '**Antilink is already enabled on your server.**'
                        )
                        .addField(
                            'Current Status',
                            `Antilink is already enabled on your server.\n\nCurrent Status: ${enable}`
                        )
                        .addField(
                            'To Disable',
                            `To disable Antilink, use \`${prefix}antilink disable\``
                        )
                        .setTimestamp()
                        .setFooter(
                            client.user.username,
                            client.user.displayAvatarURL()
                        )
                    await message.channel.send({
                        embeds: [antilinkSettingsEmbed]
                    })
                }

                break

            case 'disable':
                if (isActivatedAlready) {
                    await client.db.set(`antilink_${message.guild.id}`, false)
                    await client.db.set(`antilinkp_${message.guild.id}`, {
                        data: null
                    })
                    const antilinkDisableMessage = new MessageEmbed()
                        .setColor('294462')
                        .setTitle('Antilink Disabled')
                        .setDescription(
                            '**Antilink has been successfully disabled on your server.**'
                        )
                        .addField(
                            'Impact',
                            'Your server will no longer be protected against suspicious links.'
                        )
                        .setTimestamp()
                        .setFooter(
                            client.user.username,
                            client.user.displayAvatarURL()
                        )

                    await message.channel.send({
                        embeds: [antilinkDisableMessage]
                    })
                } else {
                    const antilinkSettingsEmbed = new MessageEmbed()
                        .setTitle(
                            `Antilink Settings for ${message.guild.name} ${protect}`
                        )
                        .setColor('294462')
                        .setDescription(`**Antilink Status**`)
                        .addField(
                            'Current Status',
                            `Antilink is currently disabled on your server.\n\nCurrent Status: ${disable}`
                        )
                        .addField(
                            'To Enable',
                            `To enable Antilink, use \`${prefix}antilink enable\``
                        )
                        .setTimestamp()
                        .setFooter(
                            client.user.username,
                            client.user.displayAvatarURL()
                        )
                    await message.channel.send({
                        embeds: [antilinkSettingsEmbed]
                    })
                }
                break

            case 'punishment':
                let punishment = args[1]
                if (!punishment) {
                    const embedMessage = new MessageEmbed()
                        .setColor('294462')
                        .setAuthor({
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL({
                                dynamic: true
                            })
                        })
                        .setDescription('**Invalid Punishment**')
                        .addField(
                            'Error',
                            'Please provide valid punishment arguments.'
                        )
                        .addField('Valid Options', '`ban`, `kick`, `mute`')
                        .setTimestamp()
                        .setFooter(
                            client.user.username,
                            client.user.displayAvatarURL()
                        )

                    return message.channel.send({ embeds: [embedMessage] })
                }
                if (punishment === 'ban') {
                    await client.db.set(`antilinkp_${message.guild.id}`, {
                        data: 'ban'
                    })
                    const embedMessage = new MessageEmbed()
                        .setColor('294462')
                        .setTitle('Punishment Configured')
                        .setDescription(
                            'The punishment has been successfully configured.'
                        )
                        .addField('Punishment Type', 'Ban')
                        .addField(
                            'Action Taken',
                            'Any user violating the rules will be banned from the server.'
                        )
                        .setTimestamp()
                        .setFooter(
                            client.user.username,
                            client.user.displayAvatarURL()
                        )
                    await message.channel.send({ embeds: [embedMessage] })
                }
                if (punishment === 'kick') {
                    await client.db.set(`antilinkp_${message.guild.id}`, {
                        data: 'kick'
                    })
                    const embedMessage = new MessageEmbed()
                        .setColor('294462')
                        .setTitle('Punishment Configured')
                        .setDescription(
                            'The punishment has been successfully configured.'
                        )
                        .addField('Punishment Type', 'Kick')
                        .addField(
                            'Action Taken',
                            'Any user violating the rules will be kicked from the server.'
                        )
                        .setTimestamp()
                        .setFooter(
                            client.user.username,
                            client.user.displayAvatarURL()
                        )

                    await message.channel.send({ embeds: [embedMessage] })
                }
                if (punishment === 'mute') {
                    await client.db.set(`antilinkp_${message.guild.id}`, {
                        data: 'mute'
                    })
                    const embedMessage = new MessageEmbed()
                        .setColor('294462')
                        .setTitle('Antilink Punishment Configured')
                        .setDescription(
                            'The antilink punishment has been successfully configured.'
                        )
                        .addField('Punishment Type', 'Mute')
                        .addField(
                            'Action Taken',
                            'Any user caught posting links will be muted.'
                        )
                        .setTimestamp()
                        .setFooter(
                            client.user.username,
                            client.user.displayAvatarURL()
                        )

                    await message.channel.send({ embeds: [embedMessage] })
                }
        }
    }
}
