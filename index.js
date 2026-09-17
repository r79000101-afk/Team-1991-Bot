const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const http = require('http');

http.createServer((req, res) => {
  res.write("Bot is active 24/7!");
  res.end();
}).listen(8080);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  presence: {
    activities: [{ name: '24/7 Online', type: ActivityType.Playing }],
    status: 'online'
  }
});

client.once('clientReady', (c) => {
  console.log(`Logged in as ${c.user.tag}! Bot is ready.`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  if (message.content.toLowerCase() === '!ping') {
    message.reply(`Pong! Latency is ${client.ws.ping}ms 🏓`);
  }
});

client.login(process.env.DISCORD_TOKEN);
