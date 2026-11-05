const { 
    Client, 
    GatewayIntentBits, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    PermissionsBitField 
} = require('discord.js');
const express = require('express');

const app = express();

// Discord Client Setup
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// 1. Web Dashboard (Xieon-style Dark Theme)
app.get('/', (req, res) => {
    const uptimeSec = Math.floor(process.uptime());
    const hours = Math.floor(uptimeSec / 3600);
    const mins = Math.floor((uptimeSec % 3600) / 60);

    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team 1991 Dashboard</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0e14; color: #e6edf3; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
            .card { background-color: #161b22; border: 1px solid #30363d; border-radius: 14px; max-width: 520px; width: 100%; padding: 32px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.6); }
            .badge { display: inline-flex; align-items: center; gap: 6px; background-color: rgba(35, 134, 54, 0.2); color: #3fb950; border: 1px solid #238636; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-bottom: 18px; }
            .pulse { width: 8px; height: 8px; background-color: #3fb950; border-radius: 50%; box-shadow: 0 0 8px #3fb950; }
            h1 { font-size: 24px; margin-bottom: 8px; color: #58a6ff; }
            p.desc { font-size: 14px; color: #8b949e; margin-bottom: 24px; }
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; border-top: 1px solid #21262d; padding-top: 20px; }
            .stat-box { background: #0d1117; padding: 14px 8px; border-radius: 8px; border: 1px solid #30363d; }
            .stat-box h3 { font-size: 18px; color: #f0f6fc; }
            .stat-box span { font-size: 12px; color: #8b949e; }
        </style>
    </head>
    <body>
        <div class="card">
            <div class="badge"><div class="pulse"></div> Online 24/7</div>
            <h1>Team 1991 Bot</h1>
            <p class="desc">Advanced server protection, voice management, and moderation systems active.</p>
            <div class="grid">
                <div class="stat-box">
                    <h3>${client.guilds?.cache?.size || 0}</h3>
                    <span>Servers</span>
                </div>
                <div class="stat-box">
                    <h3>${Math.round(client.ws?.ping) || 0}ms</h3>
                    <span>Ping</span>
                </div>
                <div class="stat-box">
                    <h3>${hours}h ${mins}m</h3>
                    <span>Uptime</span>
                </div>
            </div>
        </div>
    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Web Dashboard is active on port: ${PORT}`);
});

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}!`);
});

// 2. Command Handler
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith('!')) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // !help command
    if (command === 'help') {
        const helpEmbed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('🛡️ Team 1991 — Command Center')
            .setDescription('**Team 1991** features advanced moderation, server security, and voice utilities.')
            .addFields(
                { 
                    name: '🛡️ Security & Antinuke', 
                    value: '`!antinuke [on/off]`, `!whitelist @user`, `!unwhitelist @user`, `!recovery`' 
                },
                { 
                    name: '🔨 Moderation', 
                    value: '`!ban @user [reason]`, `!kick @user`, `!mute @user [minutes]`, `!unmute @user`, `!clear [amount]`, `!lock`, `!unlock`' 
                },
                { 
                    name: '🔊 Voice Controls', 
                    value: '`!vckick @user`, `!vcmute @user`, `!vcunmute @user`' 
                },
                { 
                    name: '⚙️ Utility & Info', 
                    value: '`!ping`, `!botinfo`, `!serverinfo`, `!userinfo [@user]`' 
                }
            )
            .setFooter({ text: 'Team 1991 Security • 24/7 Active' })
            .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel('Live Dashboard')
                .setStyle(ButtonStyle.Link)
                .setURL('https://team-1991-bot-jfya.onrender.com')[span_0](start_span)[span_0](end_span)
        );

        return message.reply({ embeds: [helpEmbed], components: [row] });
    }

    // !ping command
    if (command === 'ping') {
        return message.reply(`🏓 Pong! Latency: **${Math.round(client.ws.ping)}ms**`);
    }

    // !botinfo command
    if (command === 'botinfo') {
        const uptime = Math.floor(process.uptime() / 60);
        const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('🤖 Team 1991 — Bot Stats')
            .addFields(
                { name: 'Servers', value: `${client.guilds.cache.size}`, inline: true },
                { name: 'Ping', value: `${Math.round(client.ws.ping)}ms`, inline: true },
                { name: 'Uptime', value: `${uptime} mins`, inline: true }
            );
        return message.reply({ embeds: [embed] });
    }

    // !serverinfo command
    if (command === 'serverinfo') {
        const embed = new EmbedBuilder()
            .setColor('#2b2d31')
            .setTitle(`📊 Server Info: ${message.guild.name}`)
            .addFields(
                { name: 'Members', value: `${message.guild.memberCount}`, inline: true },
                { name: 'Roles', value: `${message.guild.roles.cache.size}`, inline: true },
                { name: 'Channels', value: `${message.guild.channels.cache.size}`, inline: true }
            );
        return message.reply({ embeds: [embed] });
    }

    // !ban command
    if (command === 'ban') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.reply('❌ You do not have permission to ban members!');
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply('Mention the member to ban (e.g. `!ban @user`)');
        if (!member.bannable) return message.reply('❌ Cannot ban this user (Check role hierarchy).');
        await member.ban({ reason: args.slice(1).join(' ') || 'No reason specified' });
        return message.reply(`✅ Successfully banned **${member.user.tag}**.`);
    }

    // !kick command
    if (command === 'kick') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return message.reply('❌ You do not have permission to kick members!');
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply('Mention the member to kick (e.g. `!kick @user`)');
        if (!member.kickable) return message.reply('❌ Cannot kick this user.');
        await member.kick();
        return message.reply(`✅ Successfully kicked **${member.user.tag}**.`);
    }

    // !mute / !timeout command
    if (command === 'mute' || command === 'timeout') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply('❌ You do not have permission to timeout members!');
        }
        const member = message.mentions.members.first();
        const minutes = parseInt(args[1]) || 5;
        if (!member) return message.reply('Mention the member to mute (e.g. `!mute @user 10`)');
        await member.timeout(minutes * 60 * 1000, 'Team 1991 Moderation');
        return message.reply(`🔇 Muted **${member.user.tag}** for **${minutes}** minutes.`);
    }

    // !unmute command
    if (command === 'unmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply('❌ You do not have permission to moderate members!');
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply('Mention the member to unmute (e.g. `!unmute @user`)');
        await member.timeout(null);
        return message.reply(`🔊 Unmuted **${member.user.tag}**.`);
    }

    // !clear command
    if (command === 'clear') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply('❌ You do not have permission to delete messages!');
        }
        const amount = parseInt(args[0]);
        if (!amount || amount < 1 || amount > 100) {
            return message.reply('Provide a count between 1 and 100 (e.g. `!clear 20`)');
        }
        await message.channel.bulkDelete(amount, true);
        return message.channel.send(`🧹 Deleted **${amount}** messages.`).then(m => setTimeout(() => m.delete(), 3000));
    }

    // !lock command
    if (command === 'lock') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply('❌ You do not have permission to manage channels!');
        }
        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: false });
        return message.reply('🔒 Channel locked.');
    }

    // !unlock command
    if (command === 'unlock') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply('❌ You do not have permission to manage channels!');
        }
        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: true });
        return message.reply('🔓 Channel unlocked.');
    }

    // !vckick command
    if (command === 'vckick') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MoveMembers)) {
            return message.reply('❌ You do not have permission to disconnect voice members!');
        }
        const member = message.mentions.members.first();
        if (!member || !member.voice.channel) return message.reply('User must be in a voice channel.');
        await member.voice.disconnect();
        return message.reply(`🔌 Disconnected **${member.user.tag}** from voice.`);
    }

    // !vcmute command
    if (command === 'vcmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            return message.reply('❌ You do not have permission to mute members in voice!');
        }
        const member = message.mentions.members.first();
        if (!member || !member.voice.channel) return message.reply('User must be in a voice channel.');
        await member.voice.setMute(true);
        return message.reply(`🔇 Voice-muted **${member.user.tag}**.`);
    }

    // !vcunmute command
    if (command === 'vcunmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            return message.reply('❌ You do not have permission to unmute members in voice!');
        }
        const member = message.mentions.members.first();
        if (!member || !member.voice.channel) return message.reply('User must be in a voice channel.');
        await member.voice.setMute(false);
        return message.reply(`🔊 Unmuted **${member.user.tag}** in voice.`);
    }
});

// Authenticate securely via environment variable
client.login(process.env.DISCORD_TOKEN);
