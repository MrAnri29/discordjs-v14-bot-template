const { Message, Client, EmbedBuilder } = require("discord.js");
const { transparent } = require("../../../Config/colors.json");
const { fail } = require("../../../Config/emojis.json");

module.exports = {
    name: "help",
    description: "help message",
    /**
     * @param {Client} client
     * @param {Message} message
     */
    async execute(client, message, args) {
        if (args[0]) {
            let command = client.prefixCommands.get(args[0]);
            if (!command)
                command = client.prefixCommands.get(
                    client.aliasCommands.get(args[0])
                );
            if (!command) {
                return message
                    .reply({
                        content: `${fail} that command doesn't exists`,
                    })
                    .catch(() => null);
            } else {
                const specificCommandEmbed = new EmbedBuilder()
                    .setTitle(command.name)
                    .setDescription(
                        command.description
                            ? command.description
                            : "No description"
                    )
                    .addFields(
                        {
                            name: "Aliases",
                            value: command.aliases
                                ? command.aliases
                                      .map((alias) => `\`${alias}\``)
                                      .join(" | ")
                                : "This command don't have aliases",
                        },
                        {
                            name: "Utilization",
                            value: command.utilization
                                ? command.utilization
                                : "No utilization given",
                        },
                        {
                            name: "Example",
                            value: command.example
                                ? command.example
                                : "No example given",
                        }
                    )
                    .setColor(transparent)
                    .setThumbnail(
                        client.user.displayAvatarURL({ dynamic: true })
                    );
                return message
                    .reply({ embeds: [specificCommandEmbed] })
                    .catch(() => null);
            }
        } else {
            const commands = client.prefixCommands;
            if (!commands)
                return message.reply({
                    content: "I don't have prefix commands",
                });
            const allCommandsEmbed = new EmbedBuilder()
                .setTitle(`Prefix commands for ${client.user.tag}`)
                .setDescription(
                    commands
                        ? commands.map((x) => `\`${x.name}\``).join(" | ")
                        : "I don't have prefix commands"
                )
                .setColor(transparent)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }));
            return message
                .reply({ embeds: [allCommandsEmbed] })
                .catch(() => null);
        }
    },
};
