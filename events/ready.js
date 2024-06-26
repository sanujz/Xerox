module.exports = async (client) => {
    client.on('ready', async () => {
        client.user.setPresence({
            activities: [
                {
                    name: `.gg/chillzone | &help`,
                    type: `CUSTOM`,
                    properties: {
                        $os: "android",
                        $browser: "Discord Android",
                        $device: "Discord Android",
                    },
                }
            ],
            status: "dnd"
        })
        client.logger.log(`Logged in to ${client.user.tag}`, 'ready')
    })

}