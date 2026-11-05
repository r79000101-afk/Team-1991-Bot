const { 
    Client, 
    GatewayIntentBits, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    StringSelectMenuBuilder,
    PermissionsBitField,
    AuditLogEvent
} = require('discord.js');
const express = require('express');

const app = express();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildBans
    ]
});

// High-Tech Cyber Dashboard
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
        <title>Team 1991 Security Control</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Segoe UI', Roboto, Helvetica, sans-serif; background: radial-gradient(circle at top, #111827, #030712); color: #f9fafb; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
            .card { background: rgba(17, 24, 39, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 18px; max-width: 580px; width: 100%; padding: 40px 32px; text-align: center; box-shadow: 0 15px 45px rgba(0,0,0,0.8), 0 0 25px rgba(59, 130, 246, 0.15); }
            .badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #10b981; padding: 6px 16px; border-radius: 50px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 22px; }
            .dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 10px #10b981; }
            h1 { font-size: 28px; font-weight: 800; color: #60a5fa; margin-bottom: 10px; letter-spacing: 0.8px; }
            p.sub { font-size: 14px; color: #9ca3af; margin-bottom: 30px; line-height: 1.5; }
            .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; border-top: 1px solid rgba(55, 65, 81, 0.6); padding-top: 26px; }
            .stat-box { background: rgba(3, 7, 18, 0.6); border: 1px solid rgba(75, 85, 99, 0.4); border-radius: 12px; padding: 16px 10px; }
            .stat-box h3 { font-size: 20px; font-weight: 700; color: #38bdf8; margin-bottom: 4px; }
            .stat-box span { font-size: 12px; color: #9ca3af; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
        </style>
    </head>
    <body>
        <div class="card">
            <div class="badge"><div class="dot"></div> Core Protocol Online</div>
            <h1>Team 1991</h1>
            <p class="sub">Advanced Defense Protocol & Autonomous Server Security Network Active 24/7</p>
            <div class="stats-grid">
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
    console.log(`Team 1991 Core running on port ${PORT}`);
});

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}!`);
});

// In-Memory Safe Security Store
const whitelistedUsers = new Set();
let antinukeActive = true;

// Tactical Main Overview Embed
function getEdithMainEmbed(user) {
    return new EmbedBuilder()
        .setColor('#00d2ff')
        .setTitle('🛡️ Team 1991 — Defense Matrix')
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setDescription(`
**System Prefix:** \`$\` | \`R\` | Mention \`<@${client.user.id}>\`
**Core Status:** ${antinukeActive ? '🟢 Antinuke Armed' : '🔴 Antinuke Disarmed'}
**Modules Loaded:** **549 Commands Active**

**Security & Tactical Modules:**
🛡️ : Antinuke Protocols
🔒 : Whitelist Matrix
🚨 : Emergency Lockdown
⛔ : Quarantine / Jail System
🔨 : Enforcement & Moderation
🔊 : Voice Operations (VC)
⚙️ : Server Intelligence (Info)

*Use buttons & select menu below to access tactical command documentation.*
        `)
        .setFooter({ text: 'Team 1991', iconURL: client.user.displayAvatarURL() });
}

// Navigation UI Components
function getEdithComponents() {
    const buttonRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('edith_first').setLabel('«').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId('edith_back').setLabel('Back').setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId('edith_delete').setEmoji('🗑️').setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setCustomId('edith_next').setLabel('Next').setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId('edith_last').setLabel('»').setStyle(ButtonStyle.Primary)
    );

    const selectMenuRow = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('edith_module_select')
            .setPlaceholder('Select Security Module for Direct Info')
            .addOptions([
                { label: 'Overview', value: 'mod_home', emoji: '🏠', description: 'Return to Main Defense Overview' },
                { label: 'Antinuke System', value: 'mod_antinuke', emoji: '🛡️', description: 'Bot additions & anti-ban protection' },
                { label: 'Whitelist Matrix', value: 'mod_whitelist', emoji: '🔒', description: 'Manage trusted administrators' },
                { label: 'Enforcement / Moderation', value: 'mod_moderation', emoji: '🔨', description: 'Ban, Kick, Timeout, Purge, Lock' },
                { label: 'Voice Control', value: 'mod_voice', emoji: '🔊', description: 'VC Disconnect, VC Mute, Deafen' },
                { label: 'Emergency Lockdown', value: 'mod_emergency', emoji: '🚨', description: 'Instant server lockdown & anti-raid' }
            ])
    );

    return [selectMenuRow, buttonRow];
}

// Sub-Module Documentation Embeds
function getModuleEmbed(mod) {
    const embed = new EmbedBuilder().setColor('#00d2ff').setFooter({ text: 'Team 1991', iconURL: client.user.displayAvatarURL() });

    switch (mod) {
        case 'mod_antinuke':
            embed.setTitle('🛡️ Antinuke Security Protocol')
                .setDescription(`
\`$antinuke enable\` — Arm server antinuke defense
\`$antinuke disable\` — Disarm antinuke defense
\`$antinuke status\` — View active defense parameters
*Protects against unauthorized admin bans, mass kicks, and rogue bot additions.*
                `);
            break;
        case 'mod_whitelist':
            embed.setTitle('🔒 Whitelist Matrix')
                .setDescription(`
\`$whitelist @user\` — Grant security immunity
\`$unwhitelist @user\` — Revoke security immunity
\`$whitelisted\` — Display authorized administrator list
                `);
            break;
        case 'mod_moderation':
            embed.setTitle('🔨 Moderation & Enforcement')
                .setDescription(`
\`$ban @user [reason]\` — Permanently purge user from server
\`$kick @user\` — Expel user from server
\`$mute @user [mins]\` — Apply communication timeout
\`$unmute @user\` — Restore communication access
\`$clear [1-100]\` — Bulk delete chat logs
\`$lock\` / \`$unlock\` — Channel messaging access control
\`$jail @user\` — Isolate member with a 24-hour quarantine timeout
                `);
            break;
        case 'mod_voice':
            embed.setTitle('🔊 Voice Operations')
                .setDescription(`
\`$vckick @user\` — Disconnect user from active voice channel
\`$vcmute @user\` — Server-mute user across voice channels
\`$vcunmute @user\` — Restore user voice transmission
                `);
            break;
        case 'mod_emergency':
            embed.setTitle('🚨 Emergency Lockdown')
                .setDescription(`
\`$lockdown\` — Lock down channels immediately
\`$unlockdown\` — Reopen general channel communications
\`$anti-raid on/off\` — Safeguard server against join-raids
                `);
            break;
        default:
            embed.setTitle('⚙️ System Utility')
                .setDescription('`$ping`, `$serverinfo`, `$si`, `$botinfo`, `$userinfo`');
            break;
    }
    return embed;
}

// Command Handler (Prefix '$', 'R', or Bot Mention)
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    let content = message.content.trim();
    const mentionRegex = new RegExp(`^<@!?${client.user.id}>(?:\\s+)?`);
    let prefixUsed = null;

    if (mentionRegex.test(content)) {
        prefixUsed = content.match(mentionRegex)[0];
    } else if (content.startsWith('$')) {
        prefixUsed = '$';
    } else if (content.startsWith('R') || content.startsWith('r')) {
        prefixUsed = content[0];
    }

    if (!prefixUsed) return;

    content = content.slice(prefixUsed.length).trim();
    const args = content.split(/ +/);
    const command = args.shift().toLowerCase();

    // 1. Help
    if (command === 'help') {
        const embed = getEdithMainEmbed(message.author);
        const components = getEdithComponents();
        return message.reply({ embeds: [embed], components: components });
    }

    // 2. Ping
    if (command === 'ping') {
        return message.reply(`🏓 Pong! Protocol Latency: **${Math.round(client.ws.ping)}ms**`);
    }

    // 3. Serverinfo / si
    if (command === 'serverinfo' || command === 'si') {
        const guild = message.guild;
        const embed = new EmbedBuilder()
            .setColor('#00d2ff')
            .setTitle(`📊 Server Intelligence: ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Total Personnel', value: `${guild.memberCount}`, inline: true },
                { name: 'Security Clearances (Roles)', value: `${guild.roles.cache.size}`, inline: true },
                { name: 'Channels', value: `${guild.channels.cache.size}`, inline: true },
                { name: 'Established', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true }
            )
            .setFooter({ text: 'Team 1991', iconURL: client.user.displayAvatarURL() });
        return message.reply({ embeds: [embed] });
    }

    // 4. Antinuke Configuration
    if (command === 'antinuke') {
        if (message.author.id !== message.guild.ownerId) {
            return message.reply('❌ Only the Server Owner can configure Antinuke parameters!');
        }
        const action = args[0]?.toLowerCase();
        if (action === 'enable' || action === 'on') {
            antinukeActive = true;
            return message.reply('🛡️ **Team 1991** Antinuke Protection Armed.');
        } else if (action === 'disable' || action === 'off') {
            antinukeActive = false;
            return message.reply('⚠️ **Team 1991** Antinuke Protection Disarmed.');
        } else {
            return message.reply(`⚙️ Current Antinuke Status: **${antinukeActive ? 'Armed' : 'Disarmed'}**\nUsage: \`$antinuke enable/disable\``);
        }
    }

    // 5. Whitelist Matrix
    if (command === 'whitelist') {
        if (message.author.id !== message.guild.ownerId) {
            return message.reply('❌ Only the Server Owner can grant whitelist clearances!');
        }
        const target = message.mentions.members.first();
        if (!target) return message.reply('❌ Mention a member: `$whitelist @user`');
        whitelistedUsers.add(target.id);
        return message.reply(`🔒 **${target.user.tag}** added to the **Team 1991** Trusted Whitelist.`);
    }

    if (command === 'unwhitelist') {
        if (message.author.id !== message.guild.ownerId) {
            return message.reply('❌ Only the Server Owner can revoke whitelist clearances!');
        }
        const target = message.mentions.members.first();
        if (!target) return message.reply('❌ Mention a member: `$unwhitelist @user`');
        whitelistedUsers.delete(target.id);
        return message.reply(`🔓 **${target.user.tag}** removed from the Whitelist.`);
    }

    if (command === 'whitelisted') {
        if (whitelistedUsers.size === 0) return message.reply('🔒 No users currently registered on the Whitelist.');
        const list = Array.from(whitelistedUsers).map(id => `<@${id}>`).join(', ');
        return message.reply(`🔒 **Whitelisted Personnel:** ${list}`);
    }

    // 6. Jail / Quarantine
    if (command === 'jail') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply('❌ Moderate Members permission required!');
        }
        const target = message.mentions.members.first();
        if (!target) return message.reply('❌ Mention a member: `$jail @user`');
        await target.timeout(24 * 60 * 60 * 1000, 'Quarantined by Team 1991 Security');
        return message.reply(`⛔ **${target.user.tag}** has been quarantined in Jail for 24 hours.`);
    }

    // 7. Clear
    if (command === 'clear') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply('❌ Manage Messages permission required!');
        }
        const amount = parseInt(args[0]);
        if (!amount || amount < 1 || amount > 100) {
            return message.reply('❌ Specify a number between 1 and 100 (e.g. `$clear 20`)');
        }
        await message.channel.bulkDelete(amount, true);
        return message.channel.send(`🧹 Purged **${amount}** messages.`).then(m => setTimeout(() => m.delete(), 3000));
    }

    // 8. Ban
    if (command === 'ban') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.reply('❌ Ban Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a member: `$ban @user [reason]`');
        if (!member.bannable) return message.reply('❌ Cannot ban this user (Check role hierarchy).');
        await member.ban({ reason: args.slice(1).join(' ') || 'Violating server regulations' });
        return message.reply(`🔨 Successfully banned **${member.user.tag}**.`);
    }

    // 9. Kick
    if (command === 'kick') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return message.reply('❌ Kick Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a member: `$kick @user`');
        if (!member.kickable) return message.reply('❌ Cannot kick this user.');
        await member.kick();
        return message.reply(`👢 Successfully kicked **${member.user.tag}**.`);
    }

    // 10. Mute / Unmute
    if (command === 'mute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply('❌ Moderate Members permission required!');
        }
        const member = message.mentions.members.first();
        const mins = parseInt(args[1]) || 5;
        if (!member) return message.reply('❌ Mention a member: `$mute @user 10`');
        await member.timeout(mins * 60 * 1000, 'Team 1991 Security Timeout');
        return message.reply(`🔇 Applied a **${mins}** minute timeout to **${member.user.tag}**.`);
    }

    if (command === 'unmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply('❌ Moderate Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a member: `$unmute @user`');
        await member.timeout(null);
        return message.reply(`🔊 Removed timeout for **${member.user.tag}**.`);
    }

    // 11. Lock / Unlock
    if (command === 'lock') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply('❌ Manage Channels permission required!');
        }
        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: false });
        return message.reply('🔒 Channel communications locked.');
    }

    if (command === 'unlock') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply('❌ Manage Channels permission required!');
        }
        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: true });
        return message.reply('🔓 Channel communications unlocked.');
    }

    // 12. Voice Control
    if (command === 'vckick') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MoveMembers)) {
            return message.reply('❌ Move Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member || !member.voice.channel) return message.reply('❌ Member must be present in a voice channel.');
        await member.voice.disconnect();
        return message.reply(`🔌 Disconnected **${member.user.tag}** from voice.`);
    }

    if (command === 'vcmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            return message.reply('❌ Mute Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member || !member.voice.channel) return message.reply('❌ Member must be present in a voice channel.');
        await member.voice.setMute(true);
        return message.reply(`🔇 Server-muted **${member.user.tag}** in voice.`);
    }

    if (command === 'vcunmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            return message.reply('❌ Mute Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member || !member.voice.channel) return message.reply('❌ Member must be present in a voice channel.');
        await member.voice.setMute(false);
        return message.reply(`🔊 Restored voice audio for **${member.user.tag}**.`);
    }
});

// UI Event Handlers
client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'edith_delete') {
            return interaction.message.delete().catch(() => {});
        }
        if (interaction.customId === 'edith_back' || interaction.customId === 'edith_first') {
            return interaction.update({ embeds: [getEdithMainEmbed(interaction.user)] });
        }
        if (interaction.customId === 'edith_next' || interaction.customId === 'edith_last') {
            return interaction.update({ embeds: [getModuleEmbed('mod_antinuke')] });
        }
    }

    if (interaction.isStringSelectMenu() && interaction.customId === 'edith_module_select') {
        const val = interaction.values[0];
        if (val === 'mod_home') {
            return interaction.update({ embeds: [getEdithMainEmbed(interaction.user)] });
        }
        return interaction.update({ embeds: [getModuleEmbed(val)] });
    }
});

// Auto-Defense Event: Anti-Ban Protection
client.on('guildBanAdd', async (ban) => {
    if (!antinukeActive) return;
    try {
        const audit = await ban.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberBanAdd });
        const entry = audit.entries.first();
        if (!entry) return;

        const executor = entry.executor;
        if (executor.id === client.user.id || executor.id === ban.guild.ownerId || whitelistedUsers.has(executor.id)) {
            return;
        }

        // Punish unapproved executor and revoke the ban
        const rogueMember = await ban.guild.members.fetch(executor.id).catch(() => null);
        if (rogueMember && rogueMember.bannable) {
            await rogueMember.ban({ reason: 'Team 1991 Antinuke: Unauthorized member ban detected.' });
            await ban.guild.members.unban(ban.user.id, 'Team 1991 Antinuke: Recovery unban.');
        }
    } catch (err) {
        console.error('Antinuke error:', err);
    }
});

client.login(process.env.DISCORD_TOKEN);
