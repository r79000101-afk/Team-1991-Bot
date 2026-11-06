const { 
    Client, 
    GatewayIntentBits, 
    EmbedBuilder, 
    ActionRowBuilder, 
    StringSelectMenuBuilder, 
    PermissionsBitField,
    ChannelType
} = require('discord.js');
const express = require('express');

const app = express();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// VIP Ultra-Modern Futuristic Dashboard
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
        <title>TEAM 1991 || Official Control Matrix</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { 
                font-family: 'Plus Jakarta Sans', sans-serif; 
                background: #030712; 
                background-image: 
                    radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.18) 0px, transparent 50%),
                    radial-gradient(at 100% 100%, rgba(245, 158, 11, 0.15) 0px, transparent 50%);
                color: #f8fafc; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                min-height: 100vh; 
                padding: 24px; 
            }
            .dashboard-card { 
                background: rgba(15, 23, 42, 0.75); 
                backdrop-filter: blur(20px); 
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.08); 
                border-radius: 24px; 
                max-width: 580px; 
                width: 100%; 
                padding: 44px 32px; 
                text-align: center; 
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(59, 130, 246, 0.12);
                position: relative;
                overflow: hidden;
            }
            .dashboard-card::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0;
                height: 3px;
                background: linear-gradient(90deg, #3b82f6, #f59e0b, #ef4444);
            }
            .status-badge { 
                display: inline-flex; 
                align-items: center; 
                gap: 8px; 
                background: rgba(34, 197, 94, 0.12); 
                border: 1px solid rgba(34, 197, 94, 0.35); 
                color: #4ade80; 
                padding: 6px 18px; 
                border-radius: 9999px; 
                font-size: 13px; 
                font-weight: 700; 
                letter-spacing: 0.8px;
                text-transform: uppercase;
                margin-bottom: 24px; 
            }
            .pulse-dot { 
                width: 8px; 
                height: 8px; 
                background: #4ade80; 
                border-radius: 50%; 
                box-shadow: 0 0 12px #4ade80; 
            }
            h1 { 
                font-size: 32px; 
                font-weight: 800; 
                letter-spacing: -0.5px;
                background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 10px; 
            }
            p.desc { 
                font-size: 14px; 
                color: #94a3b8; 
                margin-bottom: 32px; 
                line-height: 1.6;
            }
            .stats-container { 
                display: grid; 
                grid-template-columns: repeat(3, 1fr); 
                gap: 16px; 
                margin-bottom: 30px;
            }
            .stat-box { 
                background: rgba(30, 41, 59, 0.5); 
                padding: 18px 12px; 
                border-radius: 16px; 
                border: 1px solid rgba(255, 255, 255, 0.05); 
                transition: transform 0.2s ease;
            }
            .stat-box:hover {
                transform: translateY(-2px);
                border-color: rgba(59, 130, 246, 0.4);
            }
            .stat-box h3 { 
                font-size: 22px; 
                font-weight: 700;
                color: #38bdf8; 
                margin-bottom: 4px; 
            }
            .stat-box span { 
                font-size: 11px; 
                color: #64748b; 
                text-transform: uppercase;
                font-weight: 700;
                letter-spacing: 0.5px;
            }
            .powered-tag { 
                font-size: 13px; 
                color: #cbd5e1; 
                font-weight: 600;
                padding-top: 20px;
                border-top: 1px solid rgba(255, 255, 255, 0.06);
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
            }
            .powered-tag span {
                color: #f59e0b;
                font-weight: 700;
            }
        </style>
    </head>
    <body>
        <div class="dashboard-card">
            <div class="status-badge"><div class="pulse-dot"></div> Systems Armed 24/7</div>
            <h1>TEAM 1991</h1>
            <p class="desc">Enterprise High-Defense Protocol, Antinuke Automation & Server Intelligence Network</p>
            <div class="stats-container">
                <div class="stat-box">
                    <h3>${client.guilds?.cache?.size || 0}</h3>
                    <span>Guilds</span>
                </div>
                <div class="stat-box">
                    <h3>${Math.round(client.ws?.ping) || 0}ms</h3>
                    <span>Gateway</span>
                </div>
                <div class="stat-box">
                    <h3>${hours}h ${mins}m</h3>
                    <span>Active Uptime</span>
                </div>
            </div>
            <div class="powered-tag">Powered By <span>Arthur</span></div>
        </div>
    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`[TEAM 1991] System operational on port ${PORT}`);
});

client.once('ready', () => {
    console.log(`✅ [TEAM 1991] Successfully deployed as ${client.user.tag}`);
});

const whitelistedUsers = new Set();
let antinukeActive = true;

// Cyber Lion Security Style Main Embed
function getMainCyberHelpEmbed(user) {
    return new EmbedBuilder()
        .setColor('#2b2d31')
        .setTitle('Hello, I\'m TEAM 1991')
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`
• **Prefix for this server:** \`R\` (also \`$\`)
• **Set prefix with:** \`/setprefix\`
• **Join [Support Server](https://team-1991-bot-jfya.onrender.com) For Help**

\`\`\`
💬 » General
ℹ️ » Information
🔨 » Moderation
⚔️ » Antinuke
🛠️ » AutoMod
🎫 » Tickets
🔔 » Welcome
📌 » Logging
🎮 » Fun
🤍 » Roleplay
🌐 » Social
🔧 » Utility
🐾 » Animals
🎁 » Giveaway
💎 » Vanity Roles
📢 » Feedback
🎧 » Join2Create
📡 » Automation
👤 » Profiles
📺 » Media
🧭 » Misc
⬆️ » Tracking
🎤 » Voice
⚛️ » Artificial Intelligence
⚙️ » Reaction Roles
\`\`\`
        `)
        .setFooter({ text: 'Powered By Arthur' });
}

// Dual Dropdown Components
function getCyberHelpComponents() {
    const moduleRow = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('select_module_menu')
            .setPlaceholder('⤹ Select a module to see')
            .addOptions([
                { label: 'Home', value: 'mod_home', emoji: '🏠', description: 'Return to the main help page' },
                { label: 'General', value: 'mod_general', emoji: '💬', description: 'Server utilities, lists, avatar & more' },
                { label: 'Information', value: 'mod_info', emoji: 'ℹ️', description: 'Bot info, server stats & user details' },
                { label: 'Moderation', value: 'mod_moderation', emoji: '🔨', description: 'Ban, kick, mute, lock & more' },
                { label: 'Antinuke', value: 'mod_antinuke', emoji: '⚔️', description: 'Protect your server from raids & nukes' },
                { label: 'AutoMod', value: 'mod_automod', emoji: '🛠️', description: 'Automatic message moderation filters' },
                { label: 'Tickets', value: 'mod_tickets', emoji: '🎫', description: 'Support ticket system management' },
                { label: 'Welcome', value: 'mod_welcome', emoji: '🔔', description: 'Welcome & farewell message setup' },
                { label: 'Logging', value: 'mod_logging', emoji: '📌', description: 'Server event logging configuration' },
                { label: 'Fun', value: 'mod_fun', emoji: '🎮', description: 'Games, memes & fun commands' },
                { label: 'Roleplay', value: 'mod_roleplay', emoji: '🤍', description: 'Hug, kiss, slap & expressive actions' },
                { label: 'Social', value: 'mod_social', emoji: '🌐', description: 'Social media, web search & crypto' },
                { label: 'Utility', value: 'mod_utility', emoji: '🔧', description: 'Conversions, files, to-do & ignore' }
            ])
    );

    const categoryRow = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('select_category_menu')
            .setPlaceholder('⤹ Select a category to see')
            .addOptions([
                { label: 'Animals', value: 'cat_animals', emoji: '🐾', description: 'Cute animal images & random facts' },
                { label: 'Giveaway', value: 'cat_giveaway', emoji: '🎁', description: 'Create, end & reroll giveaways' },
                { label: 'Vanity Roles', value: 'cat_vanity', emoji: '💎', description: 'Automatic vanity URL role rewards' },
                { label: 'Feedback', value: 'cat_feedback', emoji: '📢', description: 'Feedback panel & submission system' },
                { label: 'Join2Create', value: 'cat_j2c', emoji: '🎧', description: 'Dynamic voice channel creation' },
                { label: 'Automation', value: 'cat_automation', emoji: '📡', description: 'Autoreact & autopost triggers' },
                { label: 'Profiles', value: 'cat_profiles', emoji: '👤', description: 'User & bot profile customization' },
                { label: 'Media', value: 'cat_media', emoji: '📺', description: 'Media-only channels & profile pics' },
                { label: 'Misc', value: 'cat_misc', emoji: '🧭', description: 'Calculator, AFK, matrix & more' },
                { label: 'Tracking', value: 'cat_tracking', emoji: '⬆️', description: 'Message & invite leaderboards' },
                { label: 'Voice', value: 'cat_voice', emoji: '🎤', description: 'Voice channel moderation tools' },
                { label: 'Artificial Intelligence', value: 'cat_ai', emoji: '⚛️', description: 'AI chat, image analysis & more' },
                { label: 'Reaction Roles', value: 'cat_reaction', emoji: '⚙️', description: 'Self-assignable reaction role menus' }
            ])
    );

    return [moduleRow, categoryRow];
}

// Sub-Embed Responses
function getSubDetailEmbed(key) {
    const embed = new EmbedBuilder().setColor('#2b2d31').setFooter({ text: 'Powered By Arthur' });

    switch (key) {
        case 'mod_moderation':
            embed.setTitle('🔨 Moderation Suite')
                .setDescription('`Rban @user [reason]`, `Rkick @user`, `Rmute @user [time]`, `Runmute @user`, `Rclear [amount]`, `Rlock`, `Runlock`');
            break;
        case 'mod_antinuke':
            embed.setTitle('⚔️ Antinuke Defense Protocol')
                .setDescription('`Rantinuke enable/disable`, `Rwhitelist @user`, `Runwhitelist @user`, `Rwhitelisted`');
            break;
        case 'mod_general':
        case 'mod_info':
            embed.setTitle('ℹ️ Information & Intel')
                .setDescription('`Rserverinfo` (or `Rsi`), `Ruserinfo @user`, `Ravatar @user`, `Rping`, `Rbotinfo`');
            break;
        case 'cat_voice':
            embed.setTitle('🎤 Voice Management')
                .setDescription('`Rvckick @user`, `Rvcmute @user`, `Rvcunmute @user`');
            break;
        case 'mod_welcome':
            embed.setTitle('🔔 Welcome Configuration')
                .setDescription('`Rwelcome #channel`, `Rwelcome test`, `Rwelcome disable`');
            break;
        case 'cat_giveaway':
            embed.setTitle('🎁 Giveaway Operations')
                .setDescription('`Rgstart [time] [prize]`, `Rgend [msgID]`, `Rgreroll [msgID]`');
            break;
        default:
            embed.setTitle(`Module: ${key.replace(/(mod_|cat_)/, '').toUpperCase()}`)
                .setDescription(`All tactical commands ready under prefix \`R\` or \`$\`. Type \`Rhelp\` to return.`);
            break;
    }
    return embed;
}

// Command Handler (Prefix R, $, Mention)
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    let content = message.content.trim();
    const mentionRegex = new RegExp(`^<@!?${client.user.id}>(?:\\s+)?`);
    let prefixUsed = null;

    if (mentionRegex.test(content)) {
        prefixUsed = content.match(mentionRegex)[0];
    } else if (content.startsWith('R') || content.startsWith('r')) {
        prefixUsed = content[0];
    } else if (content.startsWith('$')) {
        prefixUsed = '$';
    }

    if (!prefixUsed) return;

    content = content.slice(prefixUsed.length).trim();
    const args = content.split(/ +/);
    const command = args.shift().toLowerCase();

    // 1. Help
    if (command === 'help') {
        const embed = getMainCyberHelpEmbed(message.author);
        const components = getCyberHelpComponents();
        return message.reply({ embeds: [embed], components: components });
    }

    // 2. Ping
    if (command === 'ping') {
        return message.reply(`🏓 Pong! Latency: **${Math.round(client.ws.ping)}ms**`);
    }

    // 3. VIP Official Serverinfo / si
    if (command === 'serverinfo' || command === 'si') {
        const guild = message.guild;
        const owner = await guild.fetchOwner().catch(() => null);

        const textCount = guild.channels.cache.filter(c => c.type === ChannelType.GuildText).size;
        const voiceCount = guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice).size;
        const totalMembers = guild.memberCount;
        const totalRoles = guild.roles.cache.size - 1; // excluding @everyone

        const vipEmbed = new EmbedBuilder()
            .setColor('#f59e0b')
            .setTitle(`👑 OFFICIAL SERVER INTELLIGENCE: ${guild.name.toUpperCase()}`)
            .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
            .setDescription(`
> **Team 1991 VIP Security Protocol Active**
> High-tier defense matrix protecting guild infrastructure.
            `)
            .addFields(
                {
                    name: '📌 Core Identity',
                    value: `**Server Name:** \`${guild.name}\`\n**Server ID:** \`${guild.id}\`\n**Crown / Owner:** <@${guild.ownerId}> (\`${owner?.user?.tag || guild.ownerId}\`)`,
                    inline: false
                },
                {
                    name: '👥 Personnel Analytics',
                    value: `**Total Members:** \`${totalMembers}\`\n**Roles Hierarchy:** \`${totalRoles}\` Roles\n**Verification Tier:** \`${guild.verificationLevel}\``,
                    inline: true
                },
                {
                    name: '📡 Channel Spectrum',
                    value: `**Total Channels:** \`${guild.channels.cache.size}\`\n💬 **Text:** \`${textCount}\` | 🔊 **Voice:** \`${voiceCount}\`\n💎 **Boost Level:** \`Tier ${guild.premiumTier}\` (\`${guild.premiumSubscriptionCount || 0} Boosts\`)`,
                    inline: true
                },
                {
                    name: '⏳ Establishment Timeline',
                    value: `**Created On:** <t:${Math.floor(guild.createdTimestamp / 1000)}:F>\n**Elapsed Age:** <t:${Math.floor(guild.createdTimestamp / 1000)}:R>`,
                    inline: false
                }
            )
            .setFooter({ text: 'Powered By Arthur', iconURL: client.user.displayAvatarURL() })
            .setTimestamp();

        return message.reply({ embeds: [vipEmbed] });
    }

    // 4. Antinuke Setup
    if (command === 'antinuke') {
        if (message.author.id !== message.guild.ownerId) {
            return message.reply('❌ Only the Server Owner can configure Antinuke parameters!');
        }
        const action = args[0]?.toLowerCase();
        if (action === 'enable' || action === 'on') {
            antinukeActive = true;
            return message.reply('⚔️ **TEAM 1991** Antinuke Protection Armed!');
        } else if (action === 'disable' || action === 'off') {
            antinukeActive = false;
            return message.reply('⚠️ **TEAM 1991** Antinuke Protection Disarmed!');
        } else {
            return message.reply(`⚙️ Antinuke Status: **${antinukeActive ? 'Active' : 'Disabled'}**\nUsage: \`Rantinuke enable/disable\``);
        }
    }

    // 5. Whitelist
    if (command === 'whitelist') {
        if (message.author.id !== message.guild.ownerId) {
            return message.reply('❌ Only the Server Owner can grant whitelist clearances!');
        }
        const target = message.mentions.members.first();
        if (!target) return message.reply('❌ Mention a member: `Rwhitelist @user`');
        whitelistedUsers.add(target.id);
        return message.reply(`🛡️ Added **${target.user.tag}** to the **TEAM 1991** Whitelist.`);
    }

    if (command === 'unwhitelist') {
        if (message.author.id !== message.guild.ownerId) {
            return message.reply('❌ Only the Server Owner can revoke whitelist clearances!');
        }
        const target = message.mentions.members.first();
        if (!target) return message.reply('❌ Mention a member: `Runwhitelist @user`');
        whitelistedUsers.delete(target.id);
        return message.reply(`🔓 Removed **${target.user.tag}** from the Whitelist.`);
    }

    if (command === 'whitelisted') {
        if (whitelistedUsers.size === 0) return message.reply('🔒 No users are currently whitelisted.');
        const list = Array.from(whitelistedUsers).map(id => `<@${id}>`).join(', ');
        return message.reply(`🔒 **Whitelisted Members:** ${list}`);
    }

    // 6. Clear / Purge
    if (command === 'clear' || command === 'purge') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply('❌ Manage Messages permission required!');
        }
        const amount = parseInt(args[0]);
        if (!amount || amount < 1 || amount > 100) {
            return message.reply('❌ Provide a number between 1 and 100 (Example: `Rclear 20`)');
        }
        await message.channel.bulkDelete(amount, true);
        return message.channel.send(`🧹 Cleared **${amount}** messages!`).then(m => setTimeout(() => m.delete(), 3000));
    }

    // 7. Ban
    if (command === 'ban') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.reply('❌ Ban Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a member: `Rban @user [reason]`');
        if (!member.bannable) return message.reply('❌ Cannot ban this user (Check role hierarchy).');
        await member.ban({ reason: args.slice(1).join(' ') || 'No reason specified' });
        return message.reply(`🔨 Successfully banned **${member.user.tag}**.`);
    }

    // 8. Kick
    if (command === 'kick') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return message.reply('❌ Kick Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a member: `Rkick @user`');
        if (!member.kickable) return message.reply('❌ Cannot kick this user.');
        await member.kick();
        return message.reply(`👢 Successfully kicked **${member.user.tag}**.`);
    }

    // 9. Mute / Timeout
    if (command === 'mute' || command === 'timeout') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply('❌ Moderate Members permission required!');
        }
        const member = message.mentions.members.first();
        const mins = parseInt(args[1]) || 5;
        if (!member) return message.reply('❌ Mention a member: `Rmute @user 10`');
        await member.timeout(mins * 60 * 1000, 'TEAM 1991 Enforcement');
        return message.reply(`🔇 Applied a **${mins}** minute timeout to **${member.user.tag}**.`);
    }

    if (command === 'unmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply('❌ Moderate Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a member: `Runmute @user`');
        await member.timeout(null);
        return message.reply(`🔊 Removed timeout from **${member.user.tag}**.`);
    }

    // 10. Lock & Unlock
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

    // 11. Voice Commands
    if (command === 'vckick') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MoveMembers)) {
            return message.reply('❌ Move Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member || !member.voice.channel) return message.reply('❌ User must be inside a voice channel.');
        await member.voice.disconnect();
        return message.reply(`🔌 Disconnected **${member.user.tag}** from voice.`);
    }

    if (command === 'vcmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            return message.reply('❌ Mute Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member || !member.voice.channel) return message.reply('❌ User must be inside a voice channel.');
        await member.voice.setMute(true);
        return message.reply(`🔇 Server-muted **${member.user.tag}** in voice.`);
    }

    if (command === 'vcunmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            return message.reply('❌ Mute Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member || !member.voice.channel) return message.reply('❌ User must be inside a voice channel.');
        await member.voice.setMute(false);
        return message.reply(`🔊 Restored voice audio for **${member.user.tag}**.`);
    }
});

// Dropdown Menus Interaction Handler
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === 'select_module_menu') {
        const val = interaction.values[0];
        if (val === 'mod_home') {
            return interaction.update({ 
                embeds: [getMainCyberHelpEmbed(interaction.user)], 
                components: getCyberHelpComponents() 
            });
        }
        return interaction.update({ embeds: [getSubDetailEmbed(val)] });
    }

    if (interaction.customId === 'select_category_menu') {
        const val = interaction.values[0];
        return interaction.update({ embeds: [getSubDetailEmbed(val)] });
    }
});

client.login(process.env.DISCORD_TOKEN);
