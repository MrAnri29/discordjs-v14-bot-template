const { CommandInteraction, messageLink } = require("discord.js");
const { prefix } = require("../../Config/index.json");

module.exports = {
    name: "messageCreate",
    execute(message, client) {
        if (message.author.bot) return;
        if (message.channel.type !== 0) return;
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;
        
        let command = client.prefixCommands.get(cmd);
        if (!command) command = client.prefixCommands.get(client.aliasCommands.get(cmd));
        if (command) {
            command.execute(client, message, args)
        }
    },
};
