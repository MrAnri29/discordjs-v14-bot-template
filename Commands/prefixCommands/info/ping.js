const { Message, Client } = require("discord.js");

module.exports = {
    name: "ping",
    description: "replies with pong",
    aliases: ["pi", "p"],
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(_, message) {
        return message.reply({
            content: "pong!"
        })
    }
}