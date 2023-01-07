function eventHandler(client) {
    require("colors");
    const ascii = require("ascii-table");
    const fs = require("fs");
    const table = new ascii().setHeading("Events", "Status").setBorder("|", "=", "0", "0");
    
    const eventFolders = fs.readdirSync("./Events");
    for (const folder of eventFolders) {
        const eventFiles = fs.readdirSync(`./Events/${folder}`).filter((file) => file.endsWith(".js"));
        for (const file of eventFiles) {
            const event = require(`../Events/${folder}/${file}`);
            if (event.rest) {
                if (event.once) {
                    client.rest.once(event.name, (...args) => {event.execute(...args, client)})
                } else {
                    client.rest.on(event.name, (...args) => {
                        event.execute(...args, client);
                    });
                }
            } else {
                if (event.once) {
                    client.once(event.name, (...args) => {
                        event.execute(...args, client);
                    });
                } else {
                    client.on(event.name, (...args) => {
                        event.execute(...args, client);
                    });
                }
            }
            table.addRow(event.name, "🟢");
            continue;
        }
    }
    return console.log(table.toString().brightGreen);
}

module.exports = { eventHandler }