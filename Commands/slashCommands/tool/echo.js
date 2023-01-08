const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    Client,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("repeats your message")
        .setDefaultMemberPermissions(
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.MentionEveryone
        )
        .addStringOption((option) =>
            option
                .setName("message")
                .setDescription("message that will be repeated")
                .setRequired(true)
                .setMaxLength(2000)
        ),

    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(_, interaction) {
        const message = interaction.options.getString("message");
        return interaction.reply({
            content: message,
            ephemeral: false,
        });
    },
};
