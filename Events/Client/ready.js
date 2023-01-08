require("colors");
const { readyLogChannel } = require("../../Config/logs.json");
const mongoose = require("mongoose");

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log("Client • ready".cyan);

        if (readyLogChannel) {
            client.channels.cache
                .get(readyLogChannel)
                .send({ content: "Client is ready!" })
                .catch(() => null);
        }

        const Database = process.env.MONGO_DB;

        if (Database) {
            mongoose.set('strictQuery', false);
            mongoose
                .connect(Database, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })
                .then(() => {
                    console.log("Mongo Database • Connected".cyan);
                })
                .catch((err) => {
                    console.log(err.red);
                });
        }
    },
};