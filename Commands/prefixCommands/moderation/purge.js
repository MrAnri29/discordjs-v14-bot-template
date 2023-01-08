const { Message, Client, PermissionsBitField, EmbedBuilder } = require("discord.js");
const { fail, purge } = require("../../../Config/emojis.json");
const { transparent } = require("../../../Config/colors.json");
const ms = require("ms");

module.exports = {
    name: "purge",
    description: "Bulk delete messages",
    /**
     * @param {Client} client 
     * @param {Message} message 
     */
    async execute(client, message, args) {
        if (!message.member.permissions.has(PermissionsBitField.ManageMessages)) {
            return message.reply({
                content: `${fail} you don't have permissions to use that command.`
            })
        }
        if (!message.guild.members.me.permissions.has(PermissionsBitField.ManageMessages)) {
            return message.reply({
                content: `${fail} I don't have permissions to run that command.`
            })
        }
            try {
                let parseNum = Number(args[0]);
                if (isNaN(parseNum)) {
                    return message.reply({
                        content: `${fail} given amount isn't a number.`,
                    });
                }
                const amount = parseNum + 1;
                if (amount > 100) {
                    return message.reply({
                        content: `${fail} you can't delete more than 99 messages together`,
                    });
                }
                const successEmbed = new EmbedBuilder()
                    .setAuthor({
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    })
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setColor(transparent)
                    .setFooter({
                        text: client.user.tag,
                        iconURL: client.user.displayAvatarURL({
                            dynamic: true,
                        }),
                    });

                const messages = await message.channel.messages.fetch({
                    limit: amount,
                });

                const filtered = messages.filter(
                    (msg) => Date.now() - msg.createdTimestamp < ms("14 days")
                );

                if (filtered.size <= 0) {
                    successEmbed.setDescription(
                        `${fail} I can't delete messages older than 14 days.`
                    );
                } else if (messages.size > filtered.size) {
                    successEmbed.setDescription(
                        `${purge} deleter ${
                            filtered.size - 1
                        } messages\nI can't delete ${
                            messages.size - filtered.size
                        } messages because they are older than 14 days.`
                    );
                } else {
                    successEmbed.setDescription(
                        `${purge} deleted ${filtered.size - 1} message.`
                    );
                }

                await message.channel.bulkDelete(filtered);

                message.channel
                    .send({
                        embeds: [successEmbed],
                    })
                    .then((msg) => {
                        setTimeout(() => msg.delete(), 5000);
                    })
                    .catch(() => null);
            } catch (err) {
                console.log(err);
            }
    },
};
