require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const { eventHandler } = require("./handlers/event");

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember],
});

client.login(process.env.TOKEN).then(() => {
    console.log("Loading...");
    eventHandler(client);
});

module.exports = { client }