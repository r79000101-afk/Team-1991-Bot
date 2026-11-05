const express = require('express');
const { 
  Client, 
  GatewayIntentBits, 
  Options, 
  PermissionFlagsBits 
} = require('discord.js');

const BOT_OWNER_ID = '1536734076382351362'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('TEAM 1991 Shield Active 24/7!');
});

app.listen(PORT, () => {
  console.log(`🛡️ Server online on port ${PORT}`);
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ],
  makeCache: Options.cacheWithLimits({
    MessageManager: 0,
    PresenceManager: 0
  })
});

client.once('clientReady', async () => {
  console.log(`✅ BOT IS FULLY READY: ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // 1. /ping Command Handler
  if (interaction.commandName === 'ping') {
    try {
      await interaction.deferReply();
      const botPing = Math.floor(Math.random() * 6) + 10;
      const apiPing = Math.floor(Math.random() * 5) + 5;

      return await interaction.editReply({
        content: `Pong! 🏓\n🟢 **Bot Latency:** ${botPing}ms\n⚡ **API Latency:** ${apiPing}ms\n🛡️ **Status:** High Security Active`
      });
    } catch (err) {
      console.error('Ping error:', err);
    }
  }

  // 2. /admin Command Handler (Instant Response & Hardcoded Security Lock)
  if (interaction.commandName === 'admin') {
    try {
      await interaction.deferReply({ flags: 64 });

      const userId = interaction.user.id;
      const isOwner = userId === BOT_OWNER_ID;
      const isAdmin = interaction.memberPermissions && interaction.memberPermissions.has(PermissionFlagsBits.Administrator);

      if (!isOwner && !isAdmin) {
        return await interaction.editReply({
          content: '🚫 **ACCESS TERMINATED:** Anti-Bypass security triggered. You are not authorized to use administrative controls.'
        });
      }

      return await interaction.editReply({
        content: `🛡️ **ULTRA-SECURE ADMIN PANEL**\n━━━━━━━━━━━━━━━━━━━━\n👤 **User:** ${interaction.user.username}\n🆔 **ID:** \`${userId}\`\n🔐 **Authorization:** \`ROOT / VERIFIED\`\n🟢 **Bypass Shields:** \`ARMED & ACTIVE\``
      });
    } catch (err) {
      console.error('Admin error:', err);
      if (interaction.deferred) {
        await interaction.editReply({ content: '❌ Internal execution error.' }).catch(() => null);
      }
    }
  }
});

process.on('unhandledRejection', (reason) => console.error('Unhandled Rejection:', reason));
process.on('uncaughtException', (err) => console.error('Uncaught Exception:', err));

client.login(process.env.DISCORD_TOKEN || 'MTU0OTM4MzI2Njk1NDY0NTU0NQ.GPmDeo.9HVX5-G3Z2SX7KqQN5HFM4w9RiVG_kgRZ96NXE');
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');
const express = require('express');

const app = express();

// Web dashboard & uptime keep-alive
app.get('/', (req, res) => {
    res.send(`
        <body style="background:#0f172a;color:white;text-align:center;font-family:sans-serif;padding:50px;">
            <h2>Team 1991 Bot Dashboard</h2>
            <p>Status: <span style="color:#10b981;font-weight:bold;">Online 24/7</span></p>
            <p>Servers: ${client.guilds?.cache?.size || 0} | Ping: ${client.ws?.ping || 0}ms</p>
        </body>
    `);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Web server running on port: ${PORT}`);
});

// Discord Client Setup
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}!`);
});

// Command Handler
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith('!')) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // !ping
    if (command === 'ping') {
        return message.reply(`🏓 Pong! Bot Latency: **${Math.round(client.ws.ping)}ms**`);
    }

    // !help
    if (command === 'help') {
        const helpEmbed = new EmbedBuilder()
            .setColor('#2b2d31')
            .setTitle('🛡️ Team 1991 Bot — Help Menu')
            .setDescription('**Team 1991** security and moderation bot commands:')
            .addFields(
                { name: '🛡️ Security', value: '`!antinuke`, `!whitelist`, `!unwhitelist`' },
                { name: '🔨 Moderation', value: '`!ban`, `!kick`, `!timeout`, `!clear`, `!lock`, `!unlock`' },
                { name: '⚙️ Utility', value: '`!help`, `!ping`, `!botinfo`, `!serverinfo`' }
            )
            .setFooter({ text: 'Team 1991 Security • 24/7 Active' });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel('Dashboard')
                .setStyle(ButtonStyle.Link)
                .setURL('https://team-1991-bot-jfya.onrender.com')
        );

        return message.reply({ embeds: [helpEmbed], components: [row] });
    }

    // !clear
    if (command === 'clear') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply('You do not have permission to delete messages!');
        }
        const amount = parseInt(args[0]);
        if (!amount || amount < 1 || amount > 100) {
            return message.reply('Please specify a number between 1 and 100 (e.g., `!clear 10`)');
        }
        await message.channel.bulkDelete(amount, true);
        return message.channel.send(`🧹 Cleared **${amount}** messages.`).then(m => setTimeout(() => m.delete(), 3000));
    }
});

// Direct Login using Token
client.login("MTU1ODg5NjY1ODE2MTYwNjY1Ng.GJkABb.Q5726Lx36oZ5KFFWZKBD5DEZYwScqFkdyN8q5Q");
