const {
    MessageEmbed,
    Message,
    MessageActionRow,
    MessageButton,
    MessageSelectMenu,
    Client
} = require('discord.js')

const row = new MessageActionRow()
  .addComponents(
    new MessageButton()
      .setCustomId('moderationButton')
      .setLabel('Moderation')
      .setStyle('PRIMARY')
  );


module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'info',
    premium: true,
    run: async (client, message, args) => {
        let prefix = await client.db.get(`prefix_${message.guild.id}`)
        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('helpop')
                .setPlaceholder(`❯ ${client.user.username} Help Menu!`)
                .addOptions([
                    {
                        label: ' AntiNuke',
                        description: 'Get All AntiNuke Command List',
                        value: 'first',
                        emoji: '<:Xerox_Antinuke:1255434662319226900>'
                    },
                    {
                        label: ' Moderation',
                        description: 'Get All Moderation Command List',
                        value: 'second',
                        emoji: '<:Xerox_Moderation:1255448773467967488>'
                    },
                    {
                        label: 'Utility',
                        description: 'Get All Utility Command List',
                        value: 'third',
                        emoji: '<:Xerox_Utility:1255448776387067904>'
                    },
                    {
                        label: 'Welcomer',
                        description: 'Get All Welcomer Command List',
                        value: 'fourth',
                        emoji: '<:Xerox_Welcomer:1255448778941665333>'
                    },
                    {
                        label: 'Voice',
                        description: 'Get All Voice Command List',
                        value: 'fifth',
                        emoji: '<:Xerox_Voice:1255448787560955934>'
                    },
                    {
                        label: 'Role',
                        description: 'Get All Role Command List',
                        value: 'six',
                        emoji: '<:Xerox_Roles:1255448781705576469>'
                    },
                    {
                        label: 'Logging',
                        description: 'Get All Logging Command List',
                        value: 'seven',
                        emoji: '<:Xerox_Logging:1255448784222027918>'
                    },
                    {
                        label: 'Automod',
                        description: 'Get All Customrole Command List',
                        value: 'eight',
                        emoji: '<:Xerox_Automod:1255448810566455387>'
                    }
                ])
        )
        const embed = new MessageEmbed()
            .setColor('294462')
            .setAuthor({
                name: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`Prefix for this server: \`&\`
                Total Commands: \`${client.commands.size}\`
                \`\`\`fix
<> - Required Argument | () - Optional Argument\`\`\``)
            .addField('<:Xerox_Modules:1255449275593129985> **__Modules__**',
                `<:Xerox_Antinuke:1255434662319226900>\`:\`AntiNuke
                <:Xerox_Moderation:1255448773467967488>\`:\`Moderation
                <:Xerox_Utility:1255448776387067904>\`:\`Utility
                <:Xerox_Welcomer:1255448778941665333>\`:\`Welcomer`, true)
            .addField('⠀⠀⠀⠀',
                `<:Xerox_Voice:1255448787560955934>\`:\`Voice
                <:Xerox_Roles:1255448781705576469>\`:\`Role
                <:Xerox_Logging:1255448784222027918>\`:\`Logging
                <:Xerox_Automod:1255448810566455387>\`:\`Automod`, true)
            .addField(
                '<:Xerox_Link:1255440407018475521> Links',
                `\n\n**[Invite Me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) | [Support Server](https://discord.gg/zFtprCNv)**`
            )
            .setImage("https://media.discordapp.net/attachments/1232609079600353280/1255418128695824425/Xerox.jpg?ex=667d0ebe&is=667bbd3e&hm=0e71acc2e99b6abdc2cdbe5388c420c0699f3e9991216f6909d6525a42bfde9f&=&format=webp&width=844&height=307")
            .setFooter({
                text: 'Made By Sanujz',
                iconURL: client.user.displayAvatarURL()
            })

        message.channel.send({ embeds: [embed], components: [row] })
    }
}


  