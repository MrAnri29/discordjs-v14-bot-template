require("dotenv").config();
require("colors");
const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const { eventHandler } = require("./handlers/event");
const { slashHandler } = require("./handlers/slash");

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember],
});

client.slashCommands = new Collection();

client.login(process.env.TOKEN).then(() => {
    console.log("Loading...".magenta);
    eventHandler(client);
    slashHandler(client)
});

module.exports = { client }