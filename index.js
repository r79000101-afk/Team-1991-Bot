const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const http = require('http');

// Render dynamic port configuration
const PORT = process.env.PORT || 10000;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write("Bot is active 24/7!");
  res.end();
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});

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
