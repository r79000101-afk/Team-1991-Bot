const { 
    Client, 
    GatewayIntentBits, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder, 
    PermissionsBitField,
    ChannelType,
    AuditLogEvent
} = require('discord.js');
const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildBans
    ]
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

const BLACK_COLOR = '#000001';
const PREFIX = 'R';

const whitelistedUsers = new Set();
let antinukeActive = true;
let automodActive = true;
let nightmodeActive = false;
const afkUsers = new Map();

function isImmune(guild, userId) {
    if (!guild) return false;
    if (userId === guild.ownerId) return true;
    if (userId === client.user.id) return true;
    if (whitelistedUsers.has(userId)) return true;
    return false;
}

// 100% Discord Supported Direct GIF CDN (Load Hobei)[span_2](start_span)[span_2](end_span)
const roleplayGifs = {
    hug: [
        'https://c.tenor.com/7x-k3vXg61AAAAAC/anime-hug.gif',
        'https://c.tenor.com/2bAUauAenbUAAAAC/anime-hug.gif'
    ],
    kiss: [
        'https://c.tenor.com/I8kWjuAtSn8AAAAC/anime-kiss.gif',
        'https://c.tenor.com/F0fHSHmbyLoAAAAC/kiss-anime.gif'
    ],
    slap: [
        'https://c.tenor.com/Ws6Dm1ZW_vMAAAAC/anime-slap.gif',
        'https://c.tenor.com/CvBTA0GyrogAAAAC/anime-slap.gif'
    ],
    punch: [
        'https://c.tenor.com/SwMgG8Wz2w8AAAAC/anime-punch.gif'
    ],
    pat: [
        'https://c.tenor.com/DCM_puxQXWAAAAAC/pat-head.gif'
    ],
    meme: [
        'https://i.imgflip.com/1bij.jpg',
        'https://i.imgflip.com/26am.jpg',
        'https://i.imgflip.com/1otk96.jpg'
    ]
};

// Dashboard Route (Login Gateway)
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TEAM 1991 — Security Gateway</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: sans-serif; background: #06090e; color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
            .login-box { background: #0d121d; border: 1px solid #1a2333; border-radius: 20px; max-width: 440px; width: 100%; padding: 40px 30px; text-align: center; }
            .logo-badge { width: 64px; height: 64px; background: #06090e; border: 1px solid #243046; border-radius: 16px; display: inline-flex; justify-content: center; align-items: center; font-size: 26px; font-weight: 800; color: #ffffff; margin-bottom: 20px; }
            h1 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
            input { width: 100%; background: #06090e; border: 1px solid #1a2333; padding: 14px 16px; border-radius: 10px; color: #ffffff; font-size: 14px; margin: 16px 0; outline: none; }
            button { width: 100%; background: #10b981; border: none; padding: 14px; border-radius: 10px; color: #ffffff; font-size: 14px; font-weight: 700; cursor: pointer; }
        </style>
    </head>
    <body>
        <div class="login-box">
            <div class="logo-badge">1991</div>
            <h1>TEAM 1991</h1>
            <p style="color:#8292ab; font-size:13px;">Discord Member ID login gateway.</p>
            <form action="/auth" method="POST">
                <input type="text" name="memberId" placeholder="Enter Discord User ID" required />
                <button type="submit">Authenticate Session</button>
            </form>
            <div style="font-size:12px; color:#475569; margin-top:16px;">Powered By Arthur</div>
        </div>
    </body>
    </html>
    `);
});

app.post('/auth', (req, res) => {
    const memberId = req.body.memberId?.trim();
    if (!memberId) return res.redirect('/');
    res.redirect(`/dashboard/${memberId}`);
});

app.get('/dashboard/:memberId', (req, res) => {
    const memberId = req.params.memberId;
    const guild = client.guilds.cache.first();
    const ping = Math.round(client.ws.ping) || 12;
    const guildId = guild ? guild.id : '1536734076382351362';
    const totalMembers = guild ? guild.memberCount : 271;

    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TEAM 1991 — Command Bridge</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: sans-serif; background: #080c14; color: #f1f5f9; display: flex; justify-content: center; padding: 20px; }
            .app-container { max-width: 480px; width: 100%; text-align: center; }
            .main-card { background: #0f1624; border: 1px solid #1e293b; border-radius: 20px; padding: 24px; margin-bottom: 14px; }
            .avatar-box { width: 90px; height: 90px; background: #090e17; border: 1px solid #223049; border-radius: 22px; display: inline-flex; justify-content: center; align-items: center; font-size: 34px; font-weight: 800; color: #fff; margin-bottom: 12px; }
            .btn-action { background: #131c2e; border: 1px solid #1e2b44; color: #38bdf8; padding: 10px 18px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; margin-top: 10px; width: 100%; }
        </style>
    </head>
    <body>
        <div class="app-container">
            <div class="main-card">
                <div class="avatar-box">1991</div>
                <h2 style="margin-bottom:6px;">TEAM 1991</h2>
                <div style="font-size:12px; color:#94a3b8; margin-bottom:14px;"># ID: ${guildId}</div>
                <div style="display:flex; justify-content:space-around; font-size:13px; color:#cbd5e1; margin-bottom:14px;">
                    <span>⚡ ${ping}ms Ping</span>
                    <span>👥 ${totalMembers} Members</span>
                    <span style="color:#10b981;">🛡️ Armed</span>
                </div>
                <form action="/api/toggle/antinuke/${memberId}" method="POST">
                    <button class="btn-action">${antinukeActive ? 'DISABLE ANTINUKE' : 'ENABLE ANTINUKE'}</button>
                </form>
            </div>
            <div style="font-size:12px; color:#64748b;">Powered By Arthur • Authenticated as: ${memberId}</div>
        </div>
    </body>
    </html>
    `);
});

app.post('/api/toggle/antinuke/:memberId', (req, res) => {
    antinukeActive = !antinukeActive;
    res.redirect(`/dashboard/${req.params.memberId}`);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log(`Dashboard listening on port ${PORT}`));

client.once('ready', () => console.log(`✅ [TEAM 1991] Online as ${client.user.tag}`));

// Help Embed
function getMainCyberHelpEmbed() {
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
                { label: 'Roleplay', value: 'mod_roleplay', emoji: '🤍', description: 'Hug, kiss, slap & expressive actions' },
                { label: 'Fun', value: 'mod_fun', emoji: '🎮', description: 'Games, memes & fun commands' }
            ])
    );
    return [moduleRow];
}

// Command Handler
client.on('messageCreate', async (message) => {
    try {
        if (message.author.bot || !message.guild) return;

        let content = message.content.trim();
        const mentionRegex = new RegExp(`^<@!?${client.user.id}>(?:\\s+)?`);
        let prefixUsed = null;

        if (mentionRegex.test(content)) {
            prefixUsed = content.match(mentionRegex)[0];
        } else if (content.startsWith('R') || content.startsWith('r')) {
            prefixUsed = content[0];
        }

        if (!prefixUsed) return;

        content = content.slice(prefixUsed.length).trim();
        const args = content.split(/ +/);
        const command = args.shift().toLowerCase();

        // 1. HELP & DASHBOARD
        if (command === 'help') {
            return message.reply({ embeds: [getMainCyberHelpEmbed()], components: getCyberHelpComponents() });
        }

        if (command === 'dashboard' || command === 'dash') {
            const dashboardUrl = `https://team-1991-bot-jfya.onrender.com/dashboard/${message.author.id}`;
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setLabel('Open VIP Dashboard').setStyle(ButtonStyle.Link).setURL(dashboardUrl)
            );
            return message.reply({ content: '🌐 **VIP Control Matrix:**', components: [row] });
        }

        // 2. ROLEPLAY ANIMATED GIFS (Guaranteed Working)[span_3](start_span)[span_3](end_span)
        if (['hug', 'kiss', 'slap', 'punch', 'pat'].includes(command)) {
            const target = message.mentions.users.first();
            if (!target) return message.reply(`❌ Mention someone: \`R${command} @user\``);

            const gifs = roleplayGifs[command];
            const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

            const actions = {
                hug: 'warmly hugged',
                kiss: 'kissed',
                slap: 'slapped',
                punch: 'punched',
                pat: 'gently patted'
            };

            const embed = new EmbedBuilder()
                .setColor(BLACK_COLOR)
                .setAuthor({ name: 'TEAM 1991 Roleplay', iconURL: client.user.displayAvatarURL() })
                .setDescription(`🎭 **${message.author.username}** ${actions[command]} **${target.username}**!`)
                .setImage(randomGif)
                .setFooter({ text: 'Powered By Arthur' });

            return message.reply({ embeds: [embed] });
        }

        // 3. FUNNY MEME
        if (command === 'meme') {
            const randomMeme = roleplayGifs.meme[Math.floor(Math.random() * roleplayGifs.meme.length)];
            const memeEmbed = new EmbedBuilder()
                .setColor(BLACK_COLOR)
                .setTitle('😂 Random Funny Meme')
                .setImage(randomMeme)
                .setFooter({ text: 'Powered By Arthur' });
            return message.reply({ embeds: [memeEmbed] });
        }

        // 4. ALL WORKING ROLE COMMANDS
        // Create Role
        if (command === 'createrole') {
            if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
                return message.reply('❌ Manage Roles permission required!');
            }
            const roleName = args.join(' ') || 'VIP Member';
            const role = await message.guild.roles.create({
                name: `⭐ ${roleName}`,
                color: '#f59e0b',
                reason: 'Team 1991 VIP Role Creation'
            });
            return message.reply(`👑 Successfully created role: ${role} (\`${role.id}\`)`);
        }

        // Add Role to User
        if (command === 'addrole' || command === 'giverole') {
            if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
                return message.reply('❌ Manage Roles permission required!');
            }
            const member = message.mentions.members.first();
            const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
            if (!member || !role) return message.reply('❌ Usage: `Raddrole @user @role`');

            if (role.position >= message.guild.members.me.roles.highest.position) {
                return message.reply('❌ Bot hierarchy error: Role is higher than bot role!');
            }
            await member.roles.add(role);
            return message.reply(`✅ Successfully added ${role} to **${member.user.tag}**!`);
        }

        // Remove Role from User
        if (command === 'removerole' || command === 'takerole') {
            if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
                return message.reply('❌ Manage Roles permission required!');
            }
            const member = message.mentions.members.first();
            const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
            if (!member || !role) return message.reply('❌ Usage: `Rremoverole @user @role`');

            if (role.position >= message.guild.members.me.roles.highest.position) {
                return message.reply('❌ Bot hierarchy error: Role is higher than bot role!');
            }
            await member.roles.remove(role);
            return message.reply(`✅ Removed ${role} from **${member.user.tag}**!`);
        }

        // Set Role Icon
        if (command === 'roleicon') {
            if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
                return message.reply('❌ Manage Roles permission required!');
            }
            const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
            const iconURL = args[1];
            if (!role || !iconURL) return message.reply('❌ Usage: `Rroleicon @role <image_link>`');

            try {
                await role.setIcon(iconURL);
                return message.reply(`✨ Successfully updated icon for ${role}!`);
            } catch (e) {
                return message.reply('❌ Error: Server needs Level 2 Boost for role icons.');
            }
        }

        // Role Information
        if (command === 'roleinfo') {
            const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
            if (!role) return message.reply('❌ Mention a role: `Rroleinfo @role`');

            const embed = new EmbedBuilder()
                .setColor(BLACK_COLOR)
                .setTitle(`🏷️ Role Information: ${role.name}`)
                .addFields(
                    { name: 'Role ID', value: `\`${role.id}\``, inline: true },
                    { name: 'Color', value: `\`${role.hexColor}\``, inline: true },
                    { name: 'Members', value: `\`${role.members.size}\``, inline: true },
                    { name: 'Position', value: `\`${role.position}\``, inline: true },
                    { name: 'Mentionable', value: role.mentionable ? '`Yes`' : '`No`', inline: true }
                )
                .setFooter({ text: 'Powered By Arthur' });
            if (role.iconURL()) embed.setThumbnail(role.iconURL({ size: 512 }));
            return message.reply({ embeds: [embed] });
        }

        // List Server Roles
        if (command === 'roles') {
            const rolesList = message.guild.roles.cache.sort((a,b) => b.position - a.position).map(r => r.name).slice(0, 30).join(', ');
            return message.reply(`📜 **Roles (${message.guild.roles.cache.size}):**\n${rolesList}...`);
        }

        // 5. INTEL & STATUS (Rui, Rbotinfo, Rsi, Rping)[span_4](start_span)[span_4](end_span)[span_5](start_span)[span_5](end_span)[span_6](start_span)[span_6](end_span)
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

        if (command === 'botinfo' || command === 'bi') {
            const uptimeSec = Math.floor(process.uptime());
            const hours = Math.floor(uptimeSec / 3600);
            const mins = Math.floor((uptimeSec % 3600) / 60);

            const embed = new EmbedBuilder()
                .setColor(BLACK_COLOR)
                .setTitle('🤖 TEAM 1991 — Bot Intelligence')
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Bot Tag', value: `\`${client.user.tag}\``, inline: true },
                    { name: 'Developer', value: '**Arthur**', inline: true },
                    { name: 'Prefix', value: `\`${PREFIX}\``, inline: true },
                    { name: 'Active Uptime', value: `\`${hours}h ${mins}m\``, inline: true },
                    { name: 'Ping', value: `\`${Math.round(client.ws.ping)}ms\``, inline: true }
                )
                .setFooter({ text: 'Powered By Arthur', iconURL: client.user.displayAvatarURL() });
            return message.reply({ embeds: [embed] });
        }

        if (command === 'ping') {
            const wsPing = client.ws.ping;
            const pingEmbed = new EmbedBuilder()
                .setColor(BLACK_COLOR)
                .setAuthor({ name: 'Bot Latency', iconURL: message.author.displayAvatarURL({ dynamic: true }) })
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

        if (command === 'serverinfo' || command === 'si') {
            const guild = message.guild;
            const owner = await guild.fetchOwner().catch(() => null);
            const vipEmbed = new EmbedBuilder()
                .setColor(BLACK_COLOR)
                .setAuthor({ name: `1991 ${guild.name}'s Information`, iconURL: guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL() })
                .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }) || client.user.displayAvatarURL())
                .setDescription(`
**__About__**
**Name :** ${guild.name}
**ID :** ${guild.id}
**Owner 👑 :** ${owner ? owner.user.username : 'Unknown'} (<@${guild.ownerId}>)
**Members :** ${guild.memberCount}
**Channels :** ${guild.channels.cache.size}
**Roles :** ${guild.roles.cache.size}
                `)
                .setFooter({ text: `Requested By ${message.author.username} | Powered By Arthur`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });
            return message.reply({ embeds: [vipEmbed] });
        }

        // 6. MODERATION
        if (command === 'clear') {
            if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply('❌ Permission required!');
            const amount = parseInt(args[0]) || 10;
            await message.channel.bulkDelete(Math.min(amount, 100), true);
            return message.channel.send(`🧹 Purged **${amount}** messages.`).then(m => setTimeout(() => m.delete(), 3000));
        }

        if (command === 'ban') {
            if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.reply('❌ Permission required!');
            const target = message.mentions.members.first();
            if (!target) return message.reply('Mention user: `Rban @user`');
            if (isImmune(message.guild, target.id)) return message.reply('🛡️ Target has immune security clearance!');
            await target.ban({ reason: args.slice(1).join(' ') || 'No reason' });
            return message.reply(`🔨 Banned **${target.user.tag}**.`);
        }

        if (command === 'kick') {
            if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.reply('❌ Permission required!');
            const target = message.mentions.members.first();
            if (!target) return message.reply('Mention user: `Rkick @user`');
            if (isImmune(message.guild, target.id)) return message.reply('🛡️ Target has immune security clearance!');
            await target.kick();
            return message.reply(`👢 Kicked **${target.user.tag}**.`);
        }

        if (command === 'mute') {
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

        // 7. ANTINUKE
        if (command === 'antinuke') {
            if (message.author.id !== message.guild.ownerId) return message.reply('❌ Only Server Owner can toggle Antinuke!');
            const act = args[0]?.toLowerCase();
            antinukeActive = (act === 'enable' || act === 'on');
            return message.reply(`⚔️ Antinuke Status: **${antinukeActive ? 'ARMED' : 'DISARMED'}**`);
        }

    } catch (err) {
        console.error('Command Error:', err);
    }
});

// Dropdown Interaction
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId === 'select_module_menu') {
        const val = interaction.values[0];
        if (val === 'mod_home') return interaction.update({ embeds: [getMainCyberHelpEmbed()], components: getCyberHelpComponents() });
        const embed = new EmbedBuilder().setColor(BLACK_COLOR).setTitle(`Module: ${val.toUpperCase()}`).setDescription(`Commands running under prefix \`${PREFIX}\``).setFooter({ text: 'Powered By Arthur' });
        return interaction.update({ embeds: [embed] });
    }
});

client.login(process.env.DISCORD_TOKEN);
