require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember],
});

client.on("ready", () => {
    console.log("Client is ready!");
});

client.login(process.env.TOKEN).then(() => {
    console.log("Loading...");
});
