const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    Client,
} = require("discord.js");

module.exports = {
    help: {
        name: "echo",
        description: "იმეორებს მოცემულ ტექსტს",
        utilization: "echo [text]",
        example: "echo hi sisters :wave:",
    },
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("იმეორებს მოცემულ ტექსტს")
        .setDefaultMemberPermissions(
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.MentionEveryone
        )
        .addStringOption((option) =>
            option
                .setName("text")
                .setDescription("ტექსტი რომელსაც გაიმეორებს ბოტი")
                .setRequired(true)
                .setMaxLength(2000)
        ),

    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(_, interaction) {
        const text = interaction.options.getString("text");
        return interaction.reply({
            content: text,
            ephemeral: false,
        });
    },
};
