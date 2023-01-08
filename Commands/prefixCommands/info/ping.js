const { Message, Client } = require("discord.js");

module.exports = {
    name: "ping",
    description: "ტესტ ბრძანება",
    aliases: ["pi", "p"],
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(client, message, args) {
        return message.reply({
            content: "pong!"
        })
    }
}