function prefixHandler(client) {
    require("colors");
    const ascii = require("ascii-table");
    const fs = require("fs");
    const table = new ascii()
        .setHeading("prefixCommands", "Status")
        .setBorder("|", "=", "0", "0");

    fs.readdirSync("./Commands/prefixCommands/").forEach(async (dir) => {
        const files = fs
            .readdirSync(`./Commands/prefixCommands/${dir}/`)
            .filter((file) => file.endsWith(".js"));
        for (const file of files) {
            const prefixCommand = require(`../Commands/prefixCommands/${dir}/${file}`);
            client.prefixCommands.set(prefixCommand.name, prefixCommand);
            if (prefixCommand.aliases && Array.isArray(prefixCommand.aliases)) {
                prefixCommand.aliases.forEach((alias) =>
                    client.aliasCommands.set(alias, prefixCommand.name)
                );
            }

            if (prefixCommand.name) {
                table.addRow(file, "🟢");
            } else {
                table.addRow(file, "🔴");
            }
            continue;
        }
    });
    return console.log(table.toString().brightYellow);
}

module.exports = { prefixHandler };
