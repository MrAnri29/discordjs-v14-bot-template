const { CommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {CommandInteraction} interaction
     */
    execute(interaction, client) {
        if (!interaction.type == 2) return;
        const slashCommand = client.slashCommands.get(interaction.commandName);
        console.log(interaction.commandName);
        if (!slashCommand) {
            client.slashCommands.delete(interaction.commandName);
            return interaction.reply({
                content: ":x: ეს ბრძანება აგარ არსებობს",
            });
        }
        slashCommand.execute(client, interaction);
    },
};