const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    Client,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("ტესტ ბრძანება")
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(_, interaction) {
        return interaction.reply({
            content: "pong!",
            ephemeral: true,
        });
    },
};