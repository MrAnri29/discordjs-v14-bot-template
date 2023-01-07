require("colors");
const { readyLogChannel } = require("../../Config/logs.json");

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log("Client • ready!".blue);

        if (readyLogChannel) {
            client.channels.cache
                .get(readyLogChannel)
                .send({ content: "Client is ready!" })
                .catch(() => null);
        }
    },
};