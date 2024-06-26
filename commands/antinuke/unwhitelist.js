const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'unwhitelist',
    aliases: ['uwl'],
    
    category: 'security',
    premium: true,
    run: async (client, message, args) => {
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
        const check = await client.util.isExtraOwner(
            message.author,
            message.guild
        )
        if (!own && !check) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor('294462')
                        .setDescription(
                            `${client.emoji.cross} | Only Server Owner Or Extraowner Can Run This Command.!`
                        )
                ]
            })
        }
        if (
            !own &&
            !(
                message?.guild.members.cache.get(client.user.id).roles.highest
                    .position <= message?.member?.roles?.highest.position
            )
        ) {
            const higherole = new MessageEmbed()
                .setColor('294462')
                .setDescription(
                    `${client.emoji.cross} | Only Server Owner Or Extraowner Having Higher Role Than Me Can Run This Command`
                )
            return message.channel.send({ embeds: [higherole] })
        }
        const user =
            message.mentions.users.first() ||
            message.guild.members.cache.get(args[0])
        const uwl = new MessageEmbed()
            .setColor('294462')
            .setTitle(`__**Unwhitelist Commands**__`)
            .setDescription(
                `**Removes user from whitelisted users which means that there will be proper actions taken on the members if they trigger the antinuke module.**`
            )
            .addFields([
                {
                    name: `__**Usage**__`,
                    value: `<:Xerox_Dot:1255435848707735552>\`${message.guild.prefix}unwhitelist @user/id\`\n<:Xerox_Dot:1255435848707735552> \`${message.guild.prefix}uwl @user\``
                }
            ])
        const antinuke = await client.db.get(`${message.guild.id}_antinuke`)
        if (!antinuke) {
            const dissable = new MessageEmbed().setColor('294462')
                .setDescription(` ** ${message.guild.name} security settings <:Xerox_Antinuke:1255434662319226900>
Ohh NO! looks like your server doesn't enabled security

Current Status : <:Xerox_Failure:1255432339807408199><:Xerox_Success:1255432489795850280>

To enable use antinuke enable ** `)
            message.channel.send({ embeds: [dissable] })
        } else {
            await client.db
                .get(`${message.guild.id}_${user.id}_wl`)
                .then(async (data) => {
                    let has = client.db?.has(
                        `${message.guild.id}_${user.id}_wl`,
                        {
                            ban: false,
                            kick: false,
                            prune: false,
                            botadd: false,
                            serverup: false,
                            memup: false,
                            chcr: false,
                            chup: false,
                            chdl: false,
                            rlcr: false,
                            rldl: false,
                            rlup: false,
                            meneve: false,
                            mngweb: false,
                            mngstemo: false
                        }
                    )

                    if (!has) {
                        return message.channel.send({
                            embeds: [
                                new MessageEmbed()
                                    .setColor('294462')
                                    .setDescription(
                                        `${client.emoji.cross} | <@${user.id}> is not a whitelisted member.`
                                    )
                            ]
                        })
                    } else {
                        if (!user) {
                            message.channel.send({ embeds: [uwl] })
                        } else {
                            let data2 = await client.db?.get(
                                `${message.guild.id}_${user.id}_wl`
                            )
                            if (!data2) {
                                message.channel.send({
                                    embeds: [
                                        new MessageEmbed()
                                            .setColor('294462')
                                            .setDescription(
                                                `${client.emoji.cross} | <@${user.id}> is not a whitelisted member.`
                                            )
                                    ]
                                })
                            } else {
                                const userId = user.id
                                await client.db.pull(
                                    `${message.guild.id}_wl.whitelisted`,
                                    userId
                                )
                                await client.db?.delete(
                                    `${message.guild.id}_${user.id}_wl`
                                )
                                return message.channel.send({
                                    embeds: [
                                        new MessageEmbed()
                                            .setColor('294462')
                                            .setDescription(
                                                `${client.emoji.tick} | Successfully removed <@${user.id}> from whitelisted user.`
                                            )
                                    ]
                                })
                            }
                        }
                    }
                })
        }
    }
}
