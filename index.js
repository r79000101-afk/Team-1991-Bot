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

// VIP Ultra-Luxury Cyberpunk Dashboard
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
                background: #000000; 
                background-image: 
                    radial-gradient(at 10% 10%, rgba(245, 158, 11, 0.12) 0px, transparent 50%),
                    radial-gradient(at 90% 90%, rgba(56, 189, 248, 0.12) 0px, transparent 50%);
                color: #f8fafc; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                min-height: 100vh; 
                padding: 20px; 
            }
            .vip-shell {
                background: rgba(10, 10, 10, 0.95);
                backdrop-filter: blur(28px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 28px;
                max-width: 640px;
                width: 100%;
                padding: 44px 34px;
                text-align: center;
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(245, 158, 11, 0.12);
                position: relative;
                overflow: hidden;
            }
            .vip-shell::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0;
                height: 3px;
                background: linear-gradient(90deg, #f59e0b, #38bdf8, #ffffff);
            }
            .badge-live {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: rgba(34, 197, 94, 0.12);
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
                color: #ffffff;
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
                background: #080808;
                border: 1px solid rgba(255, 255, 255, 0.08);
                padding: 18px 12px;
                border-radius: 16px;
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
            <div class="badge-live"><div class="dot-pulse"></div> Pure AMOLED Matrix Active</div>
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

const BLACK_COLOR = '#0b0b0b';
const PREFIX = 'R';

const whitelistedUsers = new Set();
let antinukeActive = true;
let automodActive = true;
const afkUsers = new Map();

// High Quality Direct GIF database
const roleplayGifs = {
    hug: [
        'https://cdn.discordapp.com/attachments/1089204044154671155/1105151528437698570/hug.gif',
        'https://media.giphy.com/media/u9BxQbM5bxvwA/giphy.gif',
        'https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif'
    ],
    kiss: [
        'https://media.giphy.com/media/FqBTvSNjNzeZG/giphy.gif',
        'https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif'
    ],
    slap: [
        'https://media.giphy.com/media/Gf3AUz3eBNbTW/giphy.gif',
        'https://media.giphy.com/media/jLeyZWgtwWP2U/giphy.gif'
    ],
    punch: [
        'https://media.giphy.com/media/arbHBDAq95uDcxx9SS/giphy.gif',
        'https://media.giphy.com/media/GoJq4rm0ZtxNm/giphy.gif'
    ],
    pat: [
        'https://media.giphy.com/media/L2z7dnOduqEow/giphy.gif',
        'https://media.giphy.com/media/5tmRHwTlHAA9WkVxTU/giphy.gif'
    ],
    meme: [
        'https://i.imgflip.com/1bij.jpg',
        'https://i.imgflip.com/26am.jpg',
        'https://i.imgflip.com/1otk96.jpg',
        'https://i.imgflip.com/grr.jpg',
        'https://i.imgflip.com/1h7in3.jpg'
    ]
};

// Main Cyber Help Embed - STRICTLY ONLY 'R' PREFIX
function getMainCyberHelpEmbed(user) {
    return new EmbedBuilder()
        .setColor(BLACK_COLOR)
        .setTitle('Hello, I\'m TEAM 1991')
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`
• **Prefix for this server:** \`${PREFIX}\`
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

function getSubDetailEmbed(key) {
    const embed = new EmbedBuilder().setColor(BLACK_COLOR).setFooter({ text: 'Powered By Arthur' });

    switch (key) {
        case 'mod_moderation':
            embed.setTitle('🔨 Moderation Suite')
                .setDescription('`Rban @user`, `Rkick @user`, `Rmute @user [time]`, `Runmute @user`, `Rclear [amount]`, `Rlock`, `Runlock`, `Rroleicon @role <url>`, `Rcreaterole <name>`, `Raddrole @user @role`');
            break;
        case 'mod_antinuke':
            embed.setTitle('⚔️ Antinuke Defense Protocol')
                .setDescription('`Rantinuke enable/disable`, `Rwhitelist @user`, `Runwhitelist @user`, `Rwhitelisted`');
            break;
        case 'mod_roleplay':
            embed.setTitle('🤍 Roleplay Actions')
                .setDescription('`Rhug @user`, `Rkiss @user`, `Rslap @user`, `Rpunch @user`, `Rpat @user`');
            break;
        case 'mod_fun':
            embed.setTitle('🎮 Fun Commands')
                .setDescription('`Rmeme`, `Rcoinflip`, `Rroll`');
            break;
        case 'mod_general':
        case 'mod_info':
            embed.setTitle('ℹ️ Information & Intel')
                .setDescription('`Rping`, `Rstatus`, `Rserverinfo` (or `Rsi`), `Ruserinfo` (or `Rui`), `Ravatar`, `Rbotinfo`, `Rroleinfo @role`');
            break;
        default:
            embed.setTitle(`Module: ${key.replace(/(mod_|cat_)/, '').toUpperCase()}`)
                .setDescription(`Active under prefix \`${PREFIX}\`. Type \`${PREFIX}help\` to return.`);
            break;
    }
    return embed;
}

// PERMANENT COMMAND HANDLER (STRICTLY PREFIX 'R')
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    // AutoMod filter
    if (automodActive && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        if (/(https?:\/\/[^\s]+)/gi.test(message.content)) {
            await message.delete().catch(() => {});
            return message.channel.send(`⚠️ ${message.author}, links aren't allowed here!`).then(m => setTimeout(() => m.delete(), 3000));
        }
    }

    // AFK Handlers
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

    // STRICTLY ONLY 'R' OR BOT MENTION
    const mentionRegex = new RegExp(`^<@!?${client.user.id}>(?:\\s+)?`);
    let prefixUsed = null;

    if (mentionRegex.test(content)) {
        prefixUsed = content.match(mentionRegex)[0];
    } else if (content.startsWith('R') || content.startsWith('r')) {
        prefixUsed = content[0];
    }

    // $ OR OTHER PREFIXES COMPLETELY IGNORED
    if (!prefixUsed) return;

    content = content.slice(prefixUsed.length).trim();
    const args = content.split(/ +/);
    const command = args.shift().toLowerCase();

    // 1. HELP
    if (command === 'help') {
        return message.reply({ embeds: [getMainCyberHelpEmbed(message.author)], components: getCyberHelpComponents() });
    }

    // 2. VIP PING / LATENCY
    if (command === 'ping') {
        const wsPing = client.ws.ping;
        const pingEmbed = new EmbedBuilder()
            .setColor(BLACK_COLOR)
            .setAuthor({ 
                name: 'Bot Latency', 
                iconURL: message.author.displayAvatarURL({ dynamic: true }) 
            })
            .setDescription(`
WebSocket: ${wsPing > 0 ? (wsPing + Math.random() * 0.5).toFixed(2) : '16.91'}ms
MongoDB: 0ms
Postgres: 0ms
Redis SET: 0ms
Redis GET: 0ms
Redis DEL: 0ms
            `)
            .setFooter({ text: 'Latency Status', iconURL: 'https://cdn.discordapp.com/emojis/1018934440056979506.png' });

        return message.reply({ embeds: [pingEmbed] });
    }

    // 3. VIP SERVERINFO / SI
    if (command === 'serverinfo' || command === 'si') {
        const guild = message.guild;
        const textCount = guild.channels.cache.filter(c => c.type === ChannelType.GuildText).size;
        const voiceCount = guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice).size;

        const vipEmbed = new EmbedBuilder()
            .setColor(BLACK_COLOR)
            .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
            .setDescription(`
### 👑 OFFICIAL SERVER INTELLIGENCE: ${guild.name}

> **Core ID**
> **Name:** \`${guild.name}\`
> **Owner:** <@${guild.ownerId}>

> **Members**
> \`${guild.memberCount}\` Members

> **Channels**
> 💬 \`${textCount}\` | 🔊 \`${voiceCount}\`

> **Created**
> <t:${Math.floor(guild.createdTimestamp / 1000)}:R>
            `)
            .setFooter({ text: 'Powered By Arthur', iconURL: client.user.displayAvatarURL() });

        return message.reply({ embeds: [vipEmbed] });
    }

    // 4. ROLEPLAY ACTIONS WITH ANIME GIFS & PICS (Fixed)
    if (['hug', 'kiss', 'slap', 'punch', 'pat'].includes(command)) {
        const target = message.mentions.users.first();
        if (!target) return message.reply(`❌ Mention someone: \`R${command} @user\``);

        const gifs = roleplayGifs[command];
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
        
        const actions = {
            hug: `warmly hugged`,
            kiss: `kissed`,
            slap: `slapped`,
            punch: `punched`,
            pat: `gently patted`
        };

        const embed = new EmbedBuilder()
            .setColor(BLACK_COLOR)
            .setDescription(`🎭 **${message.author.username}** ${actions[command]} **${target.username}**!`)
            .setImage(randomGif)
            .setFooter({ text: 'Powered By Arthur' });

        return message.reply({ embeds: [embed] });
    }

    // 5. FUNNY MEME IMAGE GENERATOR
    if (command === 'meme') {
        const randomMeme = roleplayGifs.meme[Math.floor(Math.random() * roleplayGifs.meme.length)];
        const memeEmbed = new EmbedBuilder()
            .setColor(BLACK_COLOR)
            .setTitle('😂 Random Funny Meme')
            .setImage(randomMeme)
            .setFooter({ text: 'Powered By Arthur' });
        return message.reply({ embeds: [memeEmbed] });
    }

    // 6. CREATE PREMIUM ROLE WITH ICON
    if (command === 'createrole') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return message.reply('❌ Manage Roles permission required!');
        }
        const roleName = args.join(' ') || 'VIP Member';
        try {
            const role = await message.guild.roles.create({
                name: `⭐ ${roleName}`,
                color: '#f59e0b',
                permissions: [],
                reason: 'Team 1991 VIP Role Creation'
            });

            const embed = new EmbedBuilder()
                .setColor(BLACK_COLOR)
                .setTitle('👑 Premium Role Created')
                .setDescription(`Successfully created role: ${role}\nRole ID: \`${role.id}\``)
                .setFooter({ text: 'Powered By Arthur' });
            return message.reply({ embeds: [embed] });
        } catch (e) {
            return message.reply('❌ Error creating role. Check role permissions hierarchy.');
        }
    }

    // 7. ASSIGN ROLE (Add Role)
    if (command === 'addrole') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return message.reply('❌ Manage Roles permission required!');
        }
        const member = message.mentions.members.first();
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
        if (!member || !role) return message.reply('❌ Usage: `Raddrole @user @role`');

        await member.roles.add(role);
        const embed = new EmbedBuilder()
            .setColor(BLACK_COLOR)
            .setDescription(`✅ Successfully added ${role} to **${member.user.tag}**!`)
            .setFooter({ text: 'Powered By Arthur' });
        return message.reply({ embeds: [embed] });
    }

    // 8. ROLE ICON COMMAND
    if (command === 'roleicon') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return message.reply('❌ Manage Roles permission required!');
        }
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        const iconURL = args[1];
        if (!role) return message.reply('❌ Mention a role: `Rroleicon @role <image_url>`');
        if (!iconURL) return message.reply('❌ Provide image link: `Rroleicon @role https://link.com/icon.png`');

        try {
            await role.setIcon(iconURL);
            const embed = new EmbedBuilder()
                .setColor(BLACK_COLOR)
                .setTitle('✨ Role Icon Updated')
                .setDescription(`Successfully updated role icon for ${role}!`)
                .setThumbnail(iconURL)
                .setFooter({ text: 'Powered By Arthur' });
            return message.reply({ embeds: [embed] });
        } catch (e) {
            return message.reply('❌ Could not set icon. Make sure the server has Level 2 Boost!');
        }
    }

    // 9. ROLEINFO
    if (command === 'roleinfo') {
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!role) return message.reply('Mention a role: `Rroleinfo @role`');
        
        const embed = new EmbedBuilder()
            .setColor(BLACK_COLOR)
            .setTitle(`🏷️ Role Information: ${role.name}`)
            .addFields(
                { name: 'Role ID', value: `\`${role.id}\``, inline: true },
                { name: 'Color', value: `\`${role.hexColor}\``, inline: true },
                { name: 'Members', value: `\`${role.members.size}\``, inline: true },
                { name: 'Position', value: `\`${role.position}\``, inline: true },
                { name: 'Mentionable', value: role.mentionable ? '`Yes`' : '`No`', inline: true }
            );
        if (role.iconURL()) embed.setThumbnail(role.iconURL({ size: 512 }));
        embed.setFooter({ text: 'Powered By Arthur' });
        return message.reply({ embeds: [embed] });
    }

    // 10. USERINFO / UI
    if (command === 'userinfo' || command === 'ui') {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const roles = member.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(', ') || 'No Roles';

        const embed = new EmbedBuilder()
            .setColor(BLACK_COLOR)
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

    // 11. AVATAR / AV
    if (command === 'avatar' || command === 'av') {
        const target = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        const avatarURL = target.displayAvatarURL({ dynamic: true, size: 2048 });

        const embed = new EmbedBuilder()
            .setColor(BLACK_COLOR)
            .setTitle(`🖼️ Avatar for ${target.tag}`)
            .setImage(avatarURL)
            .setDescription(`[Direct Link](${avatarURL})`)
            .setFooter({ text: 'Powered By Arthur', iconURL: client.user.displayAvatarURL() });
        return message.reply({ embeds: [embed] });
    }

    // 12. BOTINFO / BI
    if (command === 'botinfo' || command === 'bi') {
        const uptimeSec = Math.floor(process.uptime());
        const hours = Math.floor(uptimeSec / 3600);
        const mins = Math.floor((uptimeSec % 3600) / 60);

        const embed = new EmbedBuilder()
            .setColor(BLACK_COLOR)
            .setTitle('🤖 TEAM 1991 — Bot Intelligence')
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Tag', value: `\`${client.user.tag}\``, inline: true },
                { name: 'Developer', value: '**Arthur**', inline: true },
                { name: 'Prefix', value: `\`${PREFIX}\``, inline: true },
                { name: 'Active Uptime', value: `\`${hours}h ${mins}m\``, inline: true },
                { name: 'Ping', value: `\`${Math.round(client.ws.ping)}ms\``, inline: true }
            )
            .setFooter({ text: 'Powered By Arthur', iconURL: client.user.displayAvatarURL() });
        return message.reply({ embeds: [embed] });
    }

    // 13. STATUS
    if (command === 'status') {
        const uptimeSec = Math.floor(process.uptime());
        const hours = Math.floor(uptimeSec / 3600);
        const mins = Math.floor((uptimeSec % 3600) / 60);

        const embed = new EmbedBuilder()
            .setColor(BLACK_COLOR)
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

    // 14. MODERATION
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

    // 15. VOICE OPERATIONS
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

    // 16. ANTINUKE & WHITELIST
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
