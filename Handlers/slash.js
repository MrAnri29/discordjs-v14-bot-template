function slashHandler(client) {
    require("colors");
    const ascii = require("ascii-table");
    const fs = require("fs");
    const table = new ascii()
        .setHeading("slashCommands", "Status")
        .setBorder("|", "=", "0", "0");

    let slashCommandsArray = [];
    fs.readdirSync("./Commands/slashCommands/").forEach(async (dir) => {
        const files = fs.readdirSync(`./Commands/slashCommands/${dir}/`).filter(file => file.endsWith(".js"));
        for (const file of files) {
            const slashCommand = require(`../Commands/slashCommands/${dir}/${file}`);
            client.slashCommands.set(slashCommand.data.name, slashCommand);
            
            if (slashCommand.data.name) {
                slashCommandsArray.push(slashCommand.data.toJSON());
                table.addRow(file, "🟢");
            } else {
                table.addRow(file, "🔴");
            }
            continue;
        }
    })
    client.application.commands.set(slashCommandsArray);
    return console.log(table.toString().brightCyan);
}

module.exports = { slashHandler };