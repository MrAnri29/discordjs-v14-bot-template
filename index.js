require("dotenv").config();
require("colors");
const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, MessageContent } =
    GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const { eventHandler } = require("./handlers/event");
const { slashHandler } = require("./handlers/slash");
const { prefixHandler } =  require("./handlers/prefix");


const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
    partials: [User, Message, GuildMember, ThreadMember, Channel],
});

client.slashCommands = new Collection();
client.prefixCommands = new Collection();
client.aliasCommands = new Collection();

client.login(process.env.TOKEN).then(() => {
    console.log("Loading...".magenta);
    eventHandler(client);
    slashHandler(client);
    prefixHandler(client);
});

module.exports = { client }