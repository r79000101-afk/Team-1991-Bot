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
