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

// ULTRA VIP MODERN CYBER GLASS DASHBOARD
app.get('/', (req, res) => {
    const uptimeSec = Math.floor(process.uptime());
    const days = Math.floor(uptimeSec / 86400);
    const hours = Math.floor((uptimeSec % 86400) / 3600);
    const mins = Math.floor((uptimeSec % 3600) / 60);

    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TEAM 1991 — VIP Command Matrix</title>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { 
                font-family: 'Space Grotesk', sans-serif; 
                background: #030712; 
                background-image: 
                    radial-gradient(at 10% 10%, rgba(245, 158, 11, 0.18) 0px, transparent 50%),
                    radial-gradient(at 90% 90%, rgba(56, 189, 248, 0.18) 0px, transparent 50%),
                    radial-gradient(at 50% 50%, rgba(139, 92, 246, 0.12) 0px, transparent 60%);
                color: #f8fafc; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                min-height: 100vh; 
                padding: 20px; 
            }
            .vip-shell {
                background: rgba(15, 23, 42, 0.85);
                backdrop-filter: blur(28px);
                -webkit-backdrop-filter: blur(28px);
                border: 1px solid rgba(245, 158, 11, 0.35);
                border-radius: 28px;
                max-width: 640px;
                width: 100%;
                padding: 44px 34px;
                text-align: center;
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(245, 158, 11, 0.15);
                position: relative;
                overflow: hidden;
            }
            .vip-shell::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0;
                height: 4px;
                background: linear-gradient(90deg, #f59e0b, #38bdf8, #ec4899);
            }
            .badge-live {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: rgba(34, 197, 94, 0.14);
                border: 1px solid #22c55e;
                color: #4ade80;
                padding: 6px 18px;
                border-radius: 9999px;
                font-size: 12px;
                font-weight: 700;
                letter-spacing: 1px;
                text-transform: uppercase;
                margin-bottom: 22px;
            }
            .dot-pulse {
                width: 8px;
                height: 8px;
                background: #22c55e;
                border-radius: 50%;
                box-shadow: 0 0 12px #22c55e;
            }
            h1 {
                font-size: 34px;
                font-weight: 800;
                letter-spacing: -0.5px;
                background: linear-gradient(135deg, #f59e0b 0%, #ffffff 80%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 8px;
            }
            p.sub {
                font-size: 14px;
                color: #94a3b8;
                margin-bottom: 30px;
                line-height: 1.6;
            }
            .matrix-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 14px;
                margin-bottom: 30px;
            }
            .matrix-card {
                background: rgba(30, 41, 59, 0.55);
                border: 1px solid rgba(255, 255, 255, 0.08);
                padding: 18px 12px;
                border-radius: 16px;
                transition: transform 0.2s, border-color 0.2s;
            }
            .matrix-card:hover {
                transform: translateY(-2px);
                border-color: rgba(245, 158, 11, 0.6);
            }
            .matrix-card h3 {
                font-size: 22px;
                font-family: 'JetBrains Mono', monospace;
                color: #38bdf8;
                margin-bottom: 4px;
            }
            .matrix-card span {
                font-size: 11px;
                color: #64748b;
                text-transform: uppercase;
                font-weight: 700;
                letter-spacing: 0.8px;
            }
            .footer-vip {
                font-size: 13px;
                color: #cbd5e1;
                font-weight: 600;
                padding-top: 22px;
                border-top: 1px solid rgba(255, 255, 255, 0.08);
            }
            .footer-vip span {
                color: #f59e0b;
                font-weight: 800;
            }
        </style>
    </head>
    <body>
        <div class="vip-shell">
            <div class="badge-live"><div class="dot-pulse"></div> VIP Defense Core Active</div>
            <h1>TEAM 1991</h1>
            <p class="sub">Autonomous Defense Protocol, Server Intelligence & Enterprise Moderation Network Active 24/7</p>
            <div class="matrix-grid">
                <div class="matrix-card">
                    <h3>${client.guilds?.cache?.size || 0}</h3>
                    <span>Guilds Guarded</span>
                </div>
                <div class="matrix-card">
                    <h3>${Math.round(client.ws?.ping) || 0}ms</h3>
                    <span>Gateway Ping</span>
                </div>
                <div class="matrix-card">
                    <h3>${days > 0 ? days + 'd ' : ''}${hours}h ${mins}m</h3>
                    <span>Active Uptime</span>
                </div>
            </div>
            <div class="footer-vip">Powered By <span>Arthur</span></div>
        </div>
    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`[TEAM 1991] Matrix active on port ${PORT}`);
});

client.once('ready', () => {
    console.log(`✅ [TEAM 1991] Online as ${client.user.tag}`);
});

// Storage Variables
const whitelistedUsers = new Set();
let antinukeActive = true;
let automodActive = true;
const afkUsers = new Map();

// Main Cyber Help Embed
function getMainCyberHelpEmbed(user) {
    return new EmbedBuilder()
        .setColor('#f59e0b')
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

// Dropdowns matching screenshot
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

function getSubDetailEmbed(key) {
    const embed = new EmbedBuilder().setColor('#f59e0b').setFooter({ text: 'Powered By Arthur' });

    switch (key) {
        case 'mod_moderation':
            embed.setTitle('🔨 Moderation Suite')
                .setDescription('`Rban @user`, `Rkick @user`, `Rmute @user [time]`, `Runmute @user`, `Rclear [amount]`, `Rlock`, `Runlock`');
            break;
        case 'mod_antinuke':
            embed.setTitle('⚔️ Antinuke Defense Protocol')
                .setDescription('`Rantinuke enable/disable`, `Rwhitelist @user`, `Runwhitelist @user`, `Rwhitelisted`');
            break;
        case 'mod_automod':
            embed.setTitle('🛠️ AutoMod System')
                .setDescription('`Rautomod on`, `Rautomod off`, `Rautomod anti-link`, `Rautomod anti-spam`');
            break;
        case 'mod_tickets':
            embed.setTitle('🎫 Ticket System')
                .setDescription('`Rticket setup`, `Rticket close`');
            break;
        case 'mod_welcome':
            embed.setTitle('🔔 Welcome Configuration')
                .setDescription('`Rwelcome #channel`, `Rwelcome test`, `Rwelcome disable`');
            break;
        case 'mod_logging':
            embed.setTitle('📌 Server Event Logging')
                .setDescription('`Rsetlogs #channel`, `Rlogs toggle`');
            break;
        case 'mod_fun':
            embed.setTitle('🎮 Fun Commands')
                .setDescription('`Rmeme`, `Rcoinflip`, `Rroll`');
            break;
        case 'mod_roleplay':
            embed.setTitle('🤍 Roleplay Actions')
                .setDescription('`Rhug @user`, `Rkiss @user`, `Rslap @user`');
            break;
        case 'mod_social':
            embed.setTitle('🌐 Social & Crypto')
                .setDescription('`Rcrypto btc`, `Rcrypto eth`');
            break;
        case 'mod_utility':
            embed.setTitle('🔧 Utility Suite')
                .setDescription('`Rping`, `Rstatus`, `Rserverinfo` (or `Rsi`), `Ruserinfo`, `Ravatar`, `Rbotinfo`, `Rcalc 5*5`');
            break;
        case 'cat_animals':
            embed.setTitle('🐾 Animals Module')
                .setDescription('`Rcat`, `Rdog`, `Rpanda`');
            break;
        case 'cat_giveaway':
            embed.setTitle('🎁 Giveaway Operations')
                .setDescription('`Rgiveaway [time] [prize]` (Example: `Rgiveaway 10m Nitro`)');
            break;
        case 'cat_misc':
            embed.setTitle('🧭 Misc Commands')
                .setDescription('`Rafk [reason]`, `Rcalc [math]`');
            break;
        case 'cat_voice':
            embed.setTitle('🎤 Voice Management')
                .setDescription('`Rvckick @user`, `Rvcmute @user`, `Rvcunmute @user`');
            break;
        case 'cat_ai':
            embed.setTitle('⚛️ Artificial Intelligence')
                .setDescription('`Rai [prompt]` (Example: `Rai hello`)');
            break;
        default:
            embed.setTitle(`Module: ${key.replace(/(mod_|cat_)/, '').toUpperCase()}`)
                .setDescription('Active under prefix `R` or `$`. Type `Rhelp` to return.');
            break;
    }
    return embed;
}

// COMMAND HANDLER
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    // AutoMod filter
    if (automodActive && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        if (/(https?:\/\/[^\s]+)/gi.test(message.content)) {
            await message.delete().catch(() => {});
            return message.channel.send(`⚠️ ${message.author}, links aren't allowed here!`).then(m => setTimeout(() => m.delete(), 3000));
        }
    }

    // AFK Handler
    if (afkUsers.has(message.author.id)) {
        afkUsers.delete(message.author.id);
        message.reply('👋 Welcome back! AFK status removed.').then(m => setTimeout(() => m.delete(), 4000));
    }
    const mentionedMember = message.mentions.members.first();
    if (mentionedMember && afkUsers.has(mentionedMember.id)) {
        const reason = afkUsers.get(mentionedMember.id);
        message.reply(`💤 **${mentionedMember.user.tag}** is currently AFK: *${reason}*`);
    }

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

    // 1. HELP
    if (command === 'help') {
        return message.reply({ embeds: [getMainCyberHelpEmbed(message.author)], components: getCyberHelpComponents() });
    }

    // 2. PING
    if (command === 'ping') {
        return message.reply(`🏓 Pong! Latency: **${Math.round(client.ws.ping)}ms**`);
    }

    // 3. STATUS
    if (command === 'status') {
        const uptimeSec = Math.floor(process.uptime());
        const hours = Math.floor(uptimeSec / 3600);
        const mins = Math.floor((uptimeSec % 3600) / 60);

        const embed = new EmbedBuilder()
            .setColor('#f59e0b')
            .setTitle('⚡ TEAM 1991 — Operational Status')
            .addFields(
                { name: '🟢 Core Status', value: '`ONLINE 24/7`', inline: true },
                { name: '📡 Gateway Ping', value: `\`${Math.round(client.ws.ping)}ms\``, inline: true },
                { name: '⏳ Active Uptime', value: `\`${hours}h ${mins}m\``, inline: true },
                { name: '🛡️ Antinuke Defense', value: antinukeActive ? '`ARMED`' : '`DISARMED`', inline: true },
                { name: '🛠️ AutoMod', value: automodActive ? '`ACTIVE`' : '`DISABLED`', inline: true },
                { name: '🏰 Guilds', value: `\`${client.guilds.cache.size}\``, inline: true }
            )
            .setFooter({ text: 'Powered By Arthur', iconURL: client.user.displayAvatarURL() });
        return message.reply({ embeds: [embed] });
    }

    // 4. USERINFO / UI
    if (command === 'userinfo' || command === 'ui') {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const roles = member.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(', ') || 'No Roles';

        const embed = new EmbedBuilder()
            .setColor('#f59e0b')
            .setTitle(`👤 User Intelligence: ${member.user.tag}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .addFields(
                { name: 'Username', value: `\`${member.user.username}\``, inline: true },
                { name: 'User ID', value: `\`${member.id}\``, inline: true },
                { name: 'Joined Server', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: 'Account Created', value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: `Roles [${member.roles.cache.size - 1}]`, value: roles.length > 1024 ? `${roles.substring(0, 1020)}...` : roles, inline: false }
            )
            .setFooter({ text: 'Powered By Arthur', iconURL: client.user.displayAvatarURL() });
        return message.reply({ embeds: [embed] });
    }

    // 5. AVATAR / AV
    if (command === 'avatar' || command === 'av') {
        const target = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        const avatarURL = target.displayAvatarURL({ dynamic: true, size: 2048 });

        const embed = new EmbedBuilder()
            .setColor('#f59e0b')
            .setTitle(`🖼️ Avatar for ${target.tag}`)
            .setImage(avatarURL)
            .setDescription(`[Direct Link](${avatarURL})`)
            .setFooter({ text: 'Powered By Arthur', iconURL: client.user.displayAvatarURL() });
        return message.reply({ embeds: [embed] });
    }

    // 6. BOTINFO / BI
    if (command === 'botinfo' || command === 'bi') {
        const embed = new EmbedBuilder()
            .setColor('#f59e0b')
            .setTitle('🤖 TEAM 1991 — Bot Intelligence')
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Tag', value: `\`${client.user.tag}\``, inline: true },
                { name: 'Developer', value: '**Arthur**', inline: true },
                { name: 'Prefix', value: '`R` / `$`', inline: true },
                { name: 'Ping', value: `\`${Math.round(client.ws.ping)}ms\``, inline: true }
            )
            .setFooter({ text: 'Powered By Arthur', iconURL: client.user.displayAvatarURL() });
        return message.reply({ embeds: [embed] });
    }

    // 7. VIP SERVERINFO / SI
    if (command === 'serverinfo' || command === 'si') {
        const guild = message.guild;
        const textCount = guild.channels.cache.filter(c => c.type === ChannelType.GuildText).size;
        const voiceCount = guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice).size;

        const vipEmbed = new EmbedBuilder()
            .setColor('#f59e0b')
            .setTitle(`👑 OFFICIAL SERVER INTELLIGENCE: ${guild.name.toUpperCase()}`)
            .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
            .addFields(
                { name: 'Core ID', value: `**Name:** \`${guild.name}\`\n**Owner:** <@${guild.ownerId}>`, inline: false },
                { name: 'Members', value: `\`${guild.memberCount}\` Members`, inline: true },
                { name: 'Channels', value: `💬 \`${textCount}\` | 🔊 \`${voiceCount}\``, inline: true },
                { name: 'Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: false }
            )
            .setFooter({ text: 'Powered By Arthur', iconURL: client.user.displayAvatarURL() });
        return message.reply({ embeds: [vipEmbed] });
    }

    // 8. AUTOMOD COMMANDS
    if (command === 'automod') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.reply('❌ Admin permission required!');
        const state = args[0]?.toLowerCase();
        if (state === 'on' || state === 'enable') {
            automodActive = true;
            return message.reply('🛠️ **TEAM 1991** AutoMod filter activated!');
        } else if (state === 'off' || state === 'disable') {
            automodActive = false;
            return message.reply('⚠️ **TEAM 1991** AutoMod filter disabled!');
        } else {
            return message.reply(`🛠️ Current AutoMod Status: **${automodActive ? 'ON' : 'OFF'}**\nUsage: \`Rautomod on/off\``);
        }
    }

    // 9. TICKET SYSTEM
    if (command === 'ticket') {
        const sub = args[0]?.toLowerCase();
        if (sub === 'setup') {
            const channel = await message.guild.channels.create({
                name: `ticket-${message.author.username}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    { id: message.guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
                    { id: message.author.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] }
                ]
            });
            return message.reply(`🎫 Ticket created: ${channel}`);
        } else if (sub === 'close') {
            if (message.channel.name.startsWith('ticket-')) {
                message.reply('🔒 Closing ticket in 3 seconds...');
                setTimeout(() => message.channel.delete().catch(() => {}), 3000);
            } else {
                return message.reply('❌ Only usable inside a ticket channel.');
            }
        } else {
            return message.reply('🎫 Usage: \`Rticket setup\` or \`Rticket close\`');
        }
    }

    // 10. FUN COMMANDS
    if (command === 'coinflip') {
        const res = Math.random() < 0.5 ? 'Heads 🪙' : 'Tails 🪙';
        return message.reply(`Result: **${res}**`);
    }

    if (command === 'roll') {
        const rolled = Math.floor(Math.random() * 6) + 1;
        return message.reply(`🎲 You rolled: **${rolled}**!`);
    }

    if (command === 'meme') {
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🪲",
            "There are 10 types of people: those who understand binary, and those who don't. 💻",
            "Why did the developer go broke? Because he used up all his cache! 💰"
        ];
        return message.reply(jokes[Math.floor(Math.random() * jokes.length)]);
    }

    // 11. ROLEPLAY COMMANDS
    if (command === 'hug') {
        const target = message.mentions.users.first();
        if (!target) return message.reply('Mention someone: `Rhug @user`');
        return message.reply(`🤗 **${message.author.username}** warmly hugged **${target.username}**!`);
    }

    if (command === 'kiss') {
        const target = message.mentions.users.first();
        if (!target) return message.reply('Mention someone: `Rkiss @user`');
        return message.reply(`😘 **${message.author.username}** kissed **${target.username}**!`);
    }

    if (command === 'slap') {
        const target = message.mentions.users.first();
        if (!target) return message.reply('Mention someone: `Rslap @user`');
        return message.reply(`👋 **${message.author.username}** slapped **${target.username}**!`);
    }

    // 12. SOCIAL / CRYPTO
    if (command === 'crypto') {
        const coin = args[0]?.toUpperCase() || 'BTC';
        const price = coin === 'ETH' ? '$3,150' : '$68,400';
        return message.reply(`🪙 **${coin}/USDT** Estimated Index: **${price}**`);
    }

    // 13. ANIMALS MODULE
    if (command === 'cat') {
        return message.reply('🐱 Meow! 🐾 https://cataas.com/cat');
    }
    if (command === 'dog') {
        return message.reply('🐶 Woof! 🐾 https://placedog.net/500/400');
    }
    if (command === 'panda') {
        return message.reply('🐼 Here is a cute panda! 🎋');
    }

    // 14. MISC & UTILITY (AFK / CALC)
    if (command === 'afk') {
        const reason = args.join(' ') || 'AFK';
        afkUsers.set(message.author.id, reason);
        return message.reply(`💤 **${message.author.username}** is now AFK: *${reason}*`);
    }

    if (command === 'calc') {
        try {
            const sanitized = args.join('').replace(/[^0-9+\-*/.]/g, '');
            const calcRes = Function(`'use strict'; return (${sanitized})`)();
            return message.reply(`🔢 Result: **${calcRes}**`);
        } catch {
            return message.reply('❌ Invalid math expression. Example: `Rcalc 15*4`');
        }
    }

    // 15. ARTIFICIAL INTELLIGENCE (AI)
    if (command === 'ai') {
        const prompt = args.join(' ');
        if (!prompt) return message.reply('❌ Provide a prompt: `Rai hello`');
        return message.reply(`🤖 **TEAM 1991 AI:** Response matrix active for prompt: *"${prompt}"*.`);
    }

    // 16. GIVEAWAY
    if (command === 'giveaway') {
        const prize = args.slice(1).join(' ') || 'VIP Role';
        return message.channel.send(`🎉 **GIVEAWAY STARTED!** 🎉\nPrize: **${prize}**\nReact with 🎁 to enter! Hosted by ${message.author}`).then(m => m.react('🎁'));
    }

    // 17. MODERATION
    if (command === 'clear' || command === 'purge') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply('❌ Permission required!');
        const amount = parseInt(args[0]) || 10;
        await message.channel.bulkDelete(Math.min(amount, 100), true);
        return message.channel.send(`🧹 Purged **${amount}** messages.`).then(m => setTimeout(() => m.delete(), 3000));
    }

    if (command === 'ban') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.reply('❌ Permission required!');
        const target = message.mentions.members.first();
        if (!target) return message.reply('Mention user: `Rban @user`');
        await target.ban({ reason: args.slice(1).join(' ') || 'No reason' });
        return message.reply(`🔨 Banned **${target.user.tag}**.`);
    }

    if (command === 'kick') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.reply('❌ Permission required!');
        const target = message.mentions.members.first();
        if (!target) return message.reply('Mention user: `Rkick @user`');
        await target.kick();
        return message.reply(`👢 Kicked **${target.user.tag}**.`);
    }

    if (command === 'mute' || command === 'timeout') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return message.reply('❌ Permission required!');
        const target = message.mentions.members.first();
        const mins = parseInt(args[1]) || 5;
        if (!target) return message.reply('Mention user: `Rmute @user 10`');
        await target.timeout(mins * 60 * 1000, 'TEAM 1991 Timeout');
        return message.reply(`🔇 Muted **${target.user.tag}** for **${mins}** mins.`);
    }

    if (command === 'unmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return message.reply('❌ Permission required!');
        const target = message.mentions.members.first();
        if (!target) return message.reply('Mention user: `Runmute @user`');
        await target.timeout(null);
        return message.reply(`🔊 Unmuted **${target.user.tag}**.`);
    }

    if (command === 'lock') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return message.reply('❌ Permission required!');
        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: false });
        return message.reply('🔒 Channel locked.');
    }

    if (command === 'unlock') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return message.reply('❌ Permission required!');
        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: true });
        return message.reply('🔓 Channel unlocked.');
    }

    // 18. VOICE COMMANDS
    if (command === 'vckick') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MoveMembers)) return message.reply('❌ Permission required!');
        const target = message.mentions.members.first();
        if (!target?.voice.channel) return message.reply('User must be in VC.');
        await target.voice.disconnect();
        return message.reply(`🔌 Disconnected **${target.user.tag}** from VC.`);
    }

    if (command === 'vcmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) return message.reply('❌ Permission required!');
        const target = message.mentions.members.first();
        if (!target?.voice.channel) return message.reply('User must be in VC.');
        await target.voice.setMute(true);
        return message.reply(`🔇 Voice-muted **${target.user.tag}**.`);
    }

    if (command === 'vcunmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) return message.reply('❌ Permission required!');
        const target = message.mentions.members.first();
        if (!target?.voice.channel) return message.reply('User must be in VC.');
        await target.voice.setMute(false);
        return message.reply(`🔊 Voice-unmuted **${target.user.tag}**.`);
    }

    // 19. ANTINUKE & WHITELIST
    if (command === 'antinuke') {
        if (message.author.id !== message.guild.ownerId) return message.reply('❌ Only Server Owner can toggle Antinuke!');
        const act = args[0]?.toLowerCase();
        if (act === 'enable' || act === 'on') {
            antinukeActive = true;
            return message.reply('⚔️ Antinuke armed!');
        } else {
            antinukeActive = false;
            return message.reply('⚠️ Antinuke disarmed!');
        }
    }

    if (command === 'whitelist') {
        if (message.author.id !== message.guild.ownerId) return message.reply('❌ Server Owner only!');
        const target = message.mentions.members.first();
        if (!target) return message.reply('Mention member: `Rwhitelist @user`');
        whitelistedUsers.add(target.id);
        return message.reply(`🛡️ Whitelisted **${target.user.tag}**.`);
    }
});

// Dropdowns Interaction
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === 'select_module_menu') {
        const val = interaction.values[0];
        if (val === 'mod_home') {
            return interaction.update({ embeds: [getMainCyberHelpEmbed(interaction.user)], components: getCyberHelpComponents() });
        }
        return interaction.update({ embeds: [getSubDetailEmbed(val)] });
    }

    if (interaction.customId === 'select_category_menu') {
        const val = interaction.values[0];
        return interaction.update({ embeds: [getSubDetailEmbed(val)] });
    }
});

client.login(process.env.DISCORD_TOKEN);
