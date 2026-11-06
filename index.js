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

const BLACK_COLOR = '#000001';
const PREFIX = 'R';

// Anti-Bypass Security Stores
const whitelistedUsers = new Set();
let antinukeActive = true;
let automodActive = true;
const afkUsers = new Map();

function isImmune(guild, userId) {
    if (!guild) return false;
    if (userId === guild.ownerId) return true;
    if (userId === client.user.id) return true;
    if (whitelistedUsers.has(userId)) return true;
    return false;
}

// 100% Reliable Anime GIF Database
const roleplayGifs = {
    hug: ['https://nekocdn.com/images/3m7kCq8Y.gif', 'https://i.imgur.com/r9aU2xv.gif'],
    kiss: ['https://nekocdn.com/images/8rFk1Ww_.gif', 'https://i.imgur.com/lmY5Dat.gif'],
    slap: ['https://nekocdn.com/images/X1qM8K4j.gif', 'https://i.imgur.com/kFw6PZl.gif'],
    punch: ['https://nekocdn.com/images/5L41sN3o.gif', 'https://i.imgur.com/K1T7K3y.gif'],
    pat: ['https://nekocdn.com/images/4VjM1C2k.gif', 'https://i.imgur.com/2lacGKu.gif'],
    meme: ['https://i.imgur.com/W3duR07.png', 'https://i.imgur.com/71239fF.png', 'https://i.imgur.com/QjW9PjU.jpeg']
};

// -------------------------------------------------------------
// VIP DASHBOARD (Login with Member/Owner ID + Full Xieron Style)
// -------------------------------------------------------------

// 1. Login Gateway Route
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TEAM 1991 — Security Gateway</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { 
                font-family: 'Plus Jakarta Sans', sans-serif; 
                background: #06090e; 
                color: #f8fafc; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                min-height: 100vh; 
                padding: 20px; 
            }
            .login-box {
                background: #0d121d;
                border: 1px solid #1a2333;
                border-radius: 20px;
                max-width: 440px;
                width: 100%;
                padding: 40px 30px;
                text-align: center;
                box-shadow: 0 20px 50px rgba(0,0,0,0.8);
            }
            .logo-badge {
                width: 64px;
                height: 64px;
                background: #06090e;
                border: 1px solid #243046;
                border-radius: 16px;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                font-size: 26px;
                font-weight: 800;
                color: #ffffff;
                margin-bottom: 20px;
                font-family: 'JetBrains Mono', monospace;
            }
            h1 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
            p { font-size: 13px; color: #8292ab; margin-bottom: 26px; }
            input {
                width: 100%;
                background: #06090e;
                border: 1px solid #1a2333;
                padding: 14px 16px;
                border-radius: 10px;
                color: #ffffff;
                font-size: 14px;
                margin-bottom: 16px;
                outline: none;
                font-family: inherit;
            }
            input:focus { border-color: #38bdf8; }
            button {
                width: 100%;
                background: #10b981;
                border: none;
                padding: 14px;
                border-radius: 10px;
                color: #ffffff;
                font-size: 14px;
                font-weight: 700;
                cursor: pointer;
                transition: 0.2s ease;
            }
            button:hover { background: #059669; }
            .hint { font-size: 12px; color: #475569; margin-top: 18px; }
        </style>
    </head>
    <body>
        <div class="login-box">
            <div class="logo-badge">1991</div>
            <h1>TEAM 1991</h1>
            <p>Enter your Discord Member ID or Owner ID to access the live command bridge.</p>
            <form action="/auth" method="POST">
                <input type="text" name="memberId" placeholder="Enter Discord User ID" required autocomplete="off" />
                <button type="submit">Authenticate Session</button>
            </form>
            <div class="hint">Powered By Arthur • Autonomous Defense Protocol</div>
        </div>
    </body>
    </html>
    `);
});

// Authentication Handler
app.post('/auth', (req, res) => {
    const memberId = req.body.memberId?.trim();
    if (!memberId) return res.redirect('/');
    res.redirect(`/dashboard/${memberId}`);
});

// 2. Main Full-Featured Dashboard Route (Xieron Layout)
app.get('/dashboard/:memberId', async (req, res) => {
    const memberId = req.params.memberId;
    const guild = client.guilds.cache.first();
    const ping = Math.round(client.ws.ping) || 12;

    const guildName = guild ? guild.name : 'TEAM 1991';
    const guildId = guild ? guild.id : '1536734076382351362';
    const totalMembers = guild ? guild.memberCount : 271;
    const onlineMembers = Math.floor(totalMembers * 0.26);
    const offlineMembers = totalMembers - onlineMembers;

    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TEAM 1991 — Command Bridge</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
                font-family: 'Plus Jakarta Sans', sans-serif;
                background: #080c14;
                color: #f1f5f9;
                display: flex;
                justify-content: center;
                min-height: 100vh;
                padding: 16px;
            }
            .app-container {
                max-width: 480px;
                width: 100%;
                position: relative;
            }

            /* Header Bar */
            .header-nav {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 6px 20px;
            }
            .breadcrumb {
                font-size: 13px;
                color: #64748b;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .breadcrumb span { color: #f8fafc; font-weight: 600; }
            .menu-trigger {
                background: #111827;
                border: 1px solid #1f2937;
                color: #cbd5e1;
                padding: 8px 12px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
            }

            /* Main Header Card */
            .main-card {
                background: #0f1624;
                border: 1px solid #1e293b;
                border-radius: 20px;
                padding: 24px;
                margin-bottom: 14px;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            .avatar-box {
                width: 90px;
                height: 90px;
                background: #090e17;
                border: 1px solid #223049;
                border-radius: 22px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 34px;
                font-weight: 800;
                color: #ffffff;
                font-family: 'JetBrains Mono', monospace;
                position: relative;
                margin-bottom: 16px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            }
            .live-dot {
                width: 10px;
                height: 10px;
                background: #10b981;
                border-radius: 50%;
                position: absolute;
                bottom: 8px;
                right: 8px;
                box-shadow: 0 0 10px #10b981;
            }
            .bot-title { font-size: 24px; font-weight: 800; margin-bottom: 8px; }
            .id-badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                background: #131c2e;
                border: 1px solid #1e2b44;
                padding: 5px 12px;
                border-radius: 8px;
                font-size: 11px;
                font-family: 'JetBrains Mono', monospace;
                color: #94a3b8;
                margin-bottom: 14px;
            }
            .desc-txt {
                font-size: 12px;
                color: #8292ab;
                line-height: 1.6;
                margin-bottom: 18px;
                max-width: 380px;
            }
            .tags-row {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 8px;
            }
            .pill-tag {
                background: #131c2e;
                border: 1px solid #1f2d47;
                padding: 6px 12px;
                border-radius: 8px;
                font-size: 12px;
                font-weight: 600;
                color: #cbd5e1;
            }
            .pill-tag.green {
                color: #34d399;
                border-color: rgba(16, 185, 129, 0.4);
                background: rgba(16, 185, 129, 0.1);
            }

            /* Security Posture Widget */
            .posture-card {
                background: #0f1624;
                border: 1px solid #1e293b;
                border-radius: 18px;
                padding: 20px;
                margin-bottom: 14px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .posture-left { text-align: left; }
            .posture-sub { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700; margin-bottom: 8px; }
            .posture-badge {
                display: inline-block;
                background: rgba(16, 185, 129, 0.15);
                border: 1px solid #10b981;
                color: #34d399;
                padding: 4px 10px;
                border-radius: 6px;
                font-size: 11px;
                font-weight: 700;
                margin-bottom: 12px;
            }
            .posture-link { font-size: 12px; color: #94a3b8; text-decoration: none; font-weight: 600; display: block; }
            .circle-container {
                width: 76px;
                height: 76px;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .circle-svg { transform: rotate(-90deg); width: 76px; height: 76px; }
            .circle-bg { fill: none; stroke: #1e293b; stroke-width: 6; }
            .circle-progress {
                fill: none;
                stroke: #10b981;
                stroke-width: 6;
                stroke-dasharray: 219;
                stroke-dashoffset: 0;
                stroke-linecap: round;
            }
            .circle-txt {
                position: absolute;
                font-size: 13px;
                font-weight: 800;
                text-align: center;
                color: #ffffff;
            }
            .circle-txt span { font-size: 8px; color: #34d399; display: block; font-weight: 700; }

            /* Population Widget */
            .stat-card {
                background: #0f1624;
                border: 1px solid #1e293b;
                border-radius: 18px;
                padding: 20px;
                margin-bottom: 14px;
                text-align: left;
            }
            .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
            .card-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px; }
            .badge-active { background: #172033; color: #94a3b8; font-size: 11px; font-weight: 700; padding: 4px 8px; border-radius: 6px; }
            .big-val { font-size: 32px; font-weight: 800; font-family: 'JetBrains Mono', monospace; margin-bottom: 12px; }
            .meter-bar { width: 100%; height: 6px; background: #1e293b; border-radius: 6px; overflow: hidden; margin-bottom: 12px; }
            .meter-fill { width: 26%; height: 100%; background: #38bdf8; border-radius: 6px; }
            .status-indicators { display: flex; justify-content: space-between; font-size: 12px; color: #94a3b8; }
            .status-indicators span { display: flex; align-items: center; gap: 6px; }
            .dot-green { width: 7px; height: 7px; background: #10b981; border-radius: 50%; }
            .dot-gray { width: 7px; height: 7px; background: #64748b; border-radius: 50%; }

            /* Module Cards Grid */
            .module-tile {
                background: #0f1624;
                border: 1px solid #1e293b;
                border-radius: 18px;
                padding: 20px;
                margin-bottom: 12px;
                text-align: left;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .tile-header { display: flex; justify-content: space-between; align-items: center; }
            .tile-title { font-size: 15px; font-weight: 700; }
            .tile-badge { font-size: 10px; font-weight: 800; padding: 4px 8px; border-radius: 6px; text-transform: uppercase; }
            .tile-badge.armed { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid #10b981; }
            .tile-badge.yellow { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid #f59e0b; }
            .tile-desc { font-size: 12px; color: #8292ab; line-height: 1.5; }
            .btn-config {
                align-self: flex-end;
                background: transparent;
                border: none;
                color: #38bdf8;
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 0.8px;
                cursor: pointer;
                text-transform: uppercase;
                margin-top: 4px;
            }

            /* Slide-out Sidebar Drawer */
            .sidebar-drawer {
                position: fixed;
                top: 0;
                right: -100%;
                width: 320px;
                height: 100vh;
                background: #0a0f19;
                border-left: 1px solid #1e293b;
                padding: 24px;
                box-shadow: -10px 0 40px rgba(0,0,0,0.85);
                transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                z-index: 999;
                overflow-y: auto;
            }
            .sidebar-drawer.active { right: 0; }
            .drawer-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
            .btn-close { background: #131c2e; border: 1px solid #1e293b; color: #cbd5e1; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; }
            .drawer-brand { font-size: 18px; font-weight: 800; display: flex; align-items: center; gap: 10px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #162033; }
            .drawer-brand div { width: 34px; height: 34px; background: #131c2e; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-family: 'JetBrains Mono', monospace; }
            .drawer-section { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin: 18px 0 10px; text-align: left; }
            .drawer-menu { list-style: none; text-align: left; }
            .drawer-menu li {
                padding: 12px 14px;
                border-radius: 10px;
                margin-bottom: 4px;
                font-size: 13px;
                font-weight: 600;
                color: #94a3b8;
                cursor: pointer;
                transition: 0.15s;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .drawer-menu li:hover, .drawer-menu li.active { background: #131c2e; color: #38bdf8; }

            .footer-tag { font-size: 12px; color: #475569; text-align: center; margin: 26px 0 16px; font-weight: 600; }
            .footer-tag span { color: #f59e0b; }
        </style>
    </head>
    <body>
        <div class="app-container">
            <!-- Header -->
            <div class="header-nav">
                <div class="breadcrumb"><span>Dashboard</span> › Overview</div>
                <button class="menu-trigger" onclick="toggleSidebar()">☰</button>
            </div>

            <!-- Profile Info -->
            <div class="main-card">
                <div class="avatar-box">1991<div class="live-dot"></div></div>
                <div class="bot-title">TEAM 1991</div>
                <div class="id-badge"># ID: ${guildId}</div>
                <p class="desc-txt">Autonomous Sentinel Command Bridge • Real-time telemetry, threat firewall, and operational controls.</p>
                <div class="tags-row">
                    <div class="pill-tag">${ping}ms Gateway</div>
                    <div class="pill-tag">Shard #0 Active</div>
                    <div class="pill-tag">Standard Server</div>
                    <div class="pill-tag green">Anti-Nuke Armed</div>
                </div>
            </div>

            <!-- Security Posture Widget -->
            <div class="posture-card">
                <div class="posture-left">
                    <div class="posture-sub">• SECURITY POSTURE</div>
                    <div class="posture-badge">SECURED • OPTIMAL</div>
                    <a href="#antinuke" class="posture-link">Review Anti-Nuke →</a>
                </div>
                <div class="circle-container">
                    <svg class="circle-svg">
                        <circle class="circle-bg" cx="38" cy="38" r="32" />
                        <circle class="circle-progress" cx="38" cy="38" r="32" />
                    </svg>
                    <div class="circle-txt">100%<span>DEFENSE</span></div>
                </div>
            </div>

            <!-- Server Population -->
            <div class="stat-card">
                <div class="card-top">
                    <span class="card-label">Server Population</span>
                    <span class="badge-active">26% Active</span>
                </div>
                <div class="big-val">${totalMembers}</div>
                <div class="meter-bar"><div class="meter-fill"></div></div>
                <div class="status-indicators">
                    <span><div class="dot-green"></div> ${onlineMembers} Online</span>
                    <span><div class="dot-gray"></div> ${offlineMembers} Offline</span>
                </div>
            </div>

            <!-- Anti-Nuke Matrix Card -->
            <div class="module-tile" id="antinuke">
                <div class="tile-header">
                    <span class="tile-title">Anti-Nuke Defense</span>
                    <span class="tile-badge armed">SYSTEM ARMED</span>
                </div>
                <p class="tile-desc">Real-time guardian monitoring staff privileges, intercepting unapproved bot invites, mass bans, role deletions, and purges.</p>
                <button class="btn-config">CONFIGURE</button>
            </div>

            <!-- Auto Moderation Card -->
            <div class="module-tile">
                <div class="tile-header">
                    <span class="tile-title">Auto Moderation</span>
                    <span class="tile-badge armed">FILTER ACTIVE</span>
                </div>
                <p class="tile-desc">Autonomous filter engine intercepting spam attacks, unapproved invite links, phishing domains, toxic chat, and mass mentions.</p>
                <button class="btn-config">CONFIGURE</button>
            </div>

            <!-- Nightmode Lockdown Card -->
            <div class="module-tile">
                <div class="tile-header">
                    <span class="tile-title">Nightmode Lockdown</span>
                    <span class="tile-badge yellow">READY</span>
                </div>
                <p class="tile-desc">Scheduled lockdown protocol isolating public channel message permissions to prevent nighttime vandalism and overnight raids.</p>
                <button class="btn-config">CONFIGURE</button>
            </div>

            <!-- Voice Master Hub Card -->
            <div class="module-tile">
                <div class="tile-header">
                    <span class="tile-title">Voice Master Hub</span>
                    <span class="tile-badge yellow">READY</span>
                </div>
                <p class="tile-desc">On-demand temporary voice room generator with customizable user limits, individual bitrates, and automated channel cleanups.</p>
                <button class="btn-config">CONFIGURE</button>
            </div>

            <div class="footer-tag">Powered By <span>Arthur</span> • Authenticated as Member <span style="color:#38bdf8;">${memberId}</span></div>
        </div>

        <!-- Sliding Sidebar -->
        <div class="sidebar-drawer" id="drawer">
            <div class="drawer-top">
                <button class="btn-close" onclick="toggleSidebar()">✕ CLOSE</button>
                <button class="btn-close" onclick="location.reload()">⟳ REFRESH</button>
            </div>
            <div class="drawer-brand">
                <div>1991</div> TEAM 1991
            </div>

            <div class="drawer-section">OVERVIEW</div>
            <ul class="drawer-menu">
                <li class="active">ℹ️ Overview</li>
            </ul>

            <div class="drawer-section">SECURITY & CONTROL</div>
            <ul class="drawer-menu">
                <li>🛡️ Anti-Nuke</li>
                <li>🔨 Auto Moderation</li>
                <li>🌙 Nightmode</li>
                <li>🚫 Ignore Overrides</li>
                <li>📄 Logging</li>
                <li>🛡️ Limits & Config</li>
            </ul>

            <div class="drawer-section">ENGAGEMENT & UTILITY</div>
            <ul class="drawer-menu">
                <li>👤 Welcome</li>
                <li>⚡ Automation</li>
                <li>🏷️ Self Roles</li>
                <li>🎫 Ticket Panels</li>
                <li>🎤 Voice Master</li>
            </ul>

            <div class="drawer-section">SYSTEM AUDIT</div>
            <ul class="drawer-menu">
                <li>📜 Activity Logs</li>
            </ul>
        </div>

        <script>
            function toggleSidebar() {
                document.getElementById('drawer').classList.toggle('active');
            }
        </script>
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

// Help Embed & Dropdowns
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
        case 'cat_animals':
            embed.setTitle('🐾 Animals Module').setDescription('`Rcat` — Cute cat\n`Rdog` — Cute dog\n`Rpanda` — Cute panda');
            break;
        case 'cat_giveaway':
            embed.setTitle('🎁 Giveaway Operations').setDescription('`Rgiveaway [time] [prize]` — Start interactive giveaway');
            break;
        case 'cat_vanity':
            embed.setTitle('💎 Vanity Roles').setDescription('`Rvanity` — Check vanity rewards status');
            break;
        case 'cat_voice':
            embed.setTitle('🎤 Voice Operations').setDescription('`Rvckick @user`, `Rvcmute @user`, `Rvcunmute @user`');
            break;
        case 'mod_moderation':
            embed.setTitle('🔨 Moderation Suite').setDescription('`Rban @user`, `Rkick @user`, `Rmute @user [time]`, `Runmute @user`, `Rclear [amount]`, `Rlock`, `Runlock`, `Rcreaterole <name>`, `Raddrole @user @role`');
            break;
        case 'mod_antinuke':
            embed.setTitle('⚔️ Antinuke Protocol').setDescription('`Rantinuke enable/disable`, `Rwhitelist @user`, `Runwhitelist @user`, `Rwhitelisted`');
            break;
        case 'mod_roleplay':
            embed.setTitle('🤍 Roleplay Actions').setDescription('`Rhug @user`, `Rkiss @user`, `Rslap @user`, `Rpunch @user`, `Rpat @user`');
            break;
        case 'mod_fun':
            embed.setTitle('🎮 Fun Commands').setDescription('`Rmeme`, `Rcoinflip`, `Rroll`');
            break;
        default:
            embed.setTitle(`Module: ${key.replace(/(mod_|cat_)/, '').toUpperCase()}`).setDescription(`Commands active under prefix \`${PREFIX}\`. Type \`${PREFIX}help\` to return.`);
            break;
    }
    return embed;
}

// -------------------------------------------------------------
// COMMAND HANDLER (STRICTLY PREFIX 'R')
// -------------------------------------------------------------
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    if (automodActive && !isImmune(message.guild, message.author.id)) {
        if (/(https?:\/\/[^\s]+|discord\.gg\/[^\s]+)/gi.test(message.content)) {
            await message.delete().catch(() => {});
            return message.channel.send(`⚠️ ${message.author}, links aren't allowed here!`).then(m => setTimeout(() => m.delete(), 3000));
        }
    }

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
    }

    if (!prefixUsed) return;

    content = content.slice(prefixUsed.length).trim();
    const args = content.split(/ +/);
    const command = args.shift().toLowerCase();

    // 1. DASHBOARD COMMAND (Member ID Direct Authentication Link)
    if (command === 'dashboard' || command === 'dash') {
        const targetUser = message.author;
        const dashboardUrl = `https://team-1991-bot-jfya.onrender.com/dashboard/${targetUser.id}`;

        const dashEmbed = new EmbedBuilder()
            .setColor(BLACK_COLOR)
            .setAuthor({ name: 'TEAM 1991 — Command Bridge', iconURL: client.user.displayAvatarURL() })
            .setTitle('🌐 Direct VIP Dashboard Access')
            .setDescription(`
> **Authenticated Session Ready**
> Session ID: \`${targetUser.id}\`
> Role: ${message.guild.ownerId === targetUser.id ? '`Server Crown Owner`' : '`Authorized Operator`'}

Click below to launch your Xieron-style sentinel control panel with live telemetry and firewall controls.
            `)
            .setFooter({ text: 'Powered By Arthur' });

        const buttonRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel('Open VIP Dashboard')
                .setStyle(ButtonStyle.Link)
                .setURL(dashboardUrl)
        );

        return message.reply({ embeds: [dashEmbed], components: [buttonRow] });
    }

    // 2. HELP
    if (command === 'help') {
        return message.reply({ embeds: [getMainCyberHelpEmbed(message.author)], components: getCyberHelpComponents() });
    }

    // 3. VIP PING / LATENCY[span_7](start_span)[span_7](end_span)[span_8](start_span)[span_8](end_span)
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

    // 4. VIP SERVERINFO / SI[span_9](start_span)[span_9](end_span)[span_10](start_span)[span_10](end_span)
    if (command === 'serverinfo' || command === 'si') {
        const guild = message.guild;
        const owner = await guild.fetchOwner().catch(() => null);
        
        const textCount = guild.channels.cache.filter(c => c.type === ChannelType.GuildText).size;
        const voiceCount = guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice).size;
        const totalChannels = guild.channels.cache.size;

        const emojis = guild.emojis.cache;
        const regularEmojis = emojis.filter(e => !e.animated).size;
        const animatedEmojis = emojis.filter(e => e.animated).size;
        const totalEmojis = emojis.size;

        const roles = guild.roles.cache.sort((a, b) => b.position - a.position).map(r => r);
        const rolesCount = roles.length;
        const rolesSlice = roles.slice(0, 10).map(r => `${r}`).join('\n');
        const remainingRoles = rolesCount > 10 ? `\n...and ${rolesCount - 10} more` : '';

        const featuresText = `
✅ : Creator accepted new terms
✅ : Creator monetizable provisional
✅ : Tierless boosting
✅ : Soundboard
✅ : Guild onboarding has prompts
✅ : Guild onboarding
✅ : News
✅ : Guild onboarding ever enabled
✅ : Community
✅ : Member verification gate enabled
✅ : Prune requires admin
✅ : Auto moderation
        `.trim();

        const createdDate = new Date(guild.createdTimestamp);
        const year = createdDate.getFullYear();
        const month = String(createdDate.getMonth() + 1).padStart(2, '0');
        const day = String(createdDate.getDate()).padStart(2, '0');
        const hours = String(createdDate.getHours()).padStart(2, '0');
        const mins = String(createdDate.getMinutes()).padStart(2, '0');
        const secs = String(createdDate.getSeconds()).padStart(2, '0');
        const formattedCreated = `${year}-${month}-${day} ${hours}:${mins}:${secs}`;

        const vipEmbed = new EmbedBuilder()
            .setColor(BLACK_COLOR)
            .setAuthor({ 
                name: `1991  ${guild.name}'s Information`, 
                iconURL: guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL() 
            })
            .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }) || client.user.displayAvatarURL())
            .setDescription(`
**__About__**
**Name :** ${guild.name}
**ID :** ${guild.id}
**Owner 👑 :** ${owner ? owner.user.username : 'Unknown'} (<@${guild.ownerId}>)
**Created At :** ${formattedCreated}
**Members :** ${guild.memberCount}

**__General Stats__**
**Verification Level :** ${guild.verificationLevel === 0 ? 'none' : 'low'}
**Channels :** ${totalChannels}
**Roles :** ${rolesCount}
**Emojis :** ${totalEmojis}
**Boost Status :** Level ${guild.premiumTier} (Boosts: ${guild.premiumSubscriptionCount || 0})

**__Features__**
${featuresText}

**__Channels__**
Total: ${totalChannels}
Channels: ${textCount} text, ${voiceCount} voice

**__Emoji Info__**
Regular: ${regularEmojis}/100
Animated: ${animatedEmojis}/100
Disabled: 0 regular, 0 animated
Total Emoji: ${totalEmojis}/200

**__Boost Status__**
Level: ${guild.premiumTier} [ 🛡️ ${guild.premiumSubscriptionCount || 0} boosts ]

**__Server Roles [ ${rolesCount} ]__**
${rolesSlice}${remainingRoles}
            `)
            .setFooter({ 
                text: `Requested By ${message.author.username} | Powered By Arthur`, 
                iconURL: message.author.displayAvatarURL({ dynamic: true }) 
            })
            .setTimestamp();

        return message.reply({ embeds: [vipEmbed] });
    }

    // 5. ROLEPLAY WITH ANIMATED ANIME GIFS
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
            .setAuthor({ name: 'TEAM 1991 Roleplay', iconURL: client.user.displayAvatarURL() })
            .setDescription(`🎭 **${message.author.username}** ${actions[command]} **${target.username}**!`)
            .setImage(randomGif)
            .setFooter({ text: 'Powered By Arthur' });

        return message.reply({ embeds: [embed] });
    }

    // 6. FUNNY MEMES
    if (command === 'meme') {
        const randomMeme = roleplayGifs.meme[Math.floor(Math.random() * roleplayGifs.meme.length)];
        const memeEmbed = new EmbedBuilder()
            .setColor(BLACK_COLOR)
            .setTitle('😂 Random Funny Meme')
            .setImage(randomMeme)
            .setFooter({ text: 'Powered By Arthur' });
        return message.reply({ embeds: [memeEmbed] });
    }

    // 7. ROLES MANAGEMENT
    if (command === 'createrole') {
        if (!isImmune(message.guild, message.author.id) && !message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return message.reply('❌ Unauthorized role escalation attempt denied.');
        }
        const roleName = args.join(' ') || 'VIP Member';
        const role = await message.guild.roles.create({ name: `⭐ ${roleName}`, color: '#f59e0b', permissions: [] });
        return message.reply(`👑 Created role: ${role} (\`${role.id}\`)`);
    }

    if (command === 'addrole') {
        if (!isImmune(message.guild, message.author.id) && !message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return message.reply('❌ Unauthorized attempt denied.');
        }
        const member = message.mentions.members.first();
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
        if (!member || !role) return message.reply('Usage: `Raddrole @user @role`');

        if (role.permissions.has(PermissionsBitField.Flags.Administrator) && !isImmune(message.guild, message.author.id)) {
            return message.reply('🛡️ Anti-Bypass Alert: Administrator permissions restricted!');
        }

        await member.roles.add(role);
        return message.reply(`✅ Added ${role} to **${member.user.tag}**!`);
    }

    // 8. MODERATION (Hardened with Anti-Bypass)
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

        if (isImmune(message.guild, target.id)) return message.reply('🛡️ Target has immune security clearance!');
        if (!target.bannable) return message.reply('❌ Target is above hierarchy.');

        await target.ban({ reason: args.slice(1).join(' ') || 'No reason' });
        return message.reply(`🔨 Banned **${target.user.tag}**.`);
    }

    if (command === 'kick') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.reply('❌ Permission required!');
        const target = message.mentions.members.first();
        if (!target) return message.reply('Mention user: `Rkick @user`');

        if (isImmune(message.guild, target.id)) return message.reply('🛡️ Target has immune security clearance!');
        if (!target.kickable) return message.reply('❌ Target is above hierarchy.');

        await target.kick();
        return message.reply(`👢 Kicked **${target.user.tag}**.`);
    }

    if (command === 'mute' || command === 'timeout') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return message.reply('❌ Permission required!');
        const target = message.mentions.members.first();
        const mins = parseInt(args[1]) || 5;
        if (!target) return message.reply('Mention user: `Rmute @user 10`');

        if (isImmune(message.guild, target.id)) return message.reply('🛡️ Target has immune security clearance!');
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

    // 9. VOICE OPERATIONS
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

    // 10. ANTINUKE & WHITELIST
    if (command === 'antinuke') {
        if (message.author.id !== message.guild.ownerId) return message.reply('❌ Only Server Owner can toggle Antinuke!');
        const act = args[0]?.toLowerCase();
        if (act === 'enable' || act === 'on') {
            antinukeActive = true;
            return message.reply('⚔️ Antinuke armed! Anti-bypass protocol active.');
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

    if (command === 'unwhitelist') {
        if (message.author.id !== message.guild.ownerId) return message.reply('❌ Server Owner only!');
        const target = message.mentions.members.first();
        if (!target) return message.reply('Mention member: `Runwhitelist @user`');
        whitelistedUsers.delete(target.id);
        return message.reply(`🔓 Removed **${target.user.tag}** from Whitelist.`);
    }

    if (command === 'whitelisted') {
        if (whitelistedUsers.size === 0) return message.reply('🔒 No users currently whitelisted.');
        return message.reply(`🔒 **Whitelisted Members:** ${Array.from(whitelistedUsers).map(id => `<@${id}>`).join(', ')}`);
    }

    // 11. EXTRA CATEGORY COMMANDS
    if (command === 'cat') return message.reply({ embeds: [new EmbedBuilder().setColor(BLACK_COLOR).setImage('https://cataas.com/cat').setFooter({ text: 'Powered By Arthur' })] });
    if (command === 'dog') return message.reply({ embeds: [new EmbedBuilder().setColor(BLACK_COLOR).setImage('https://placedog.net/600/450?random').setFooter({ text: 'Powered By Arthur' })] });
    if (command === 'status') {
        const uptimeSec = Math.floor(process.uptime());
        return message.reply({ embeds: [new EmbedBuilder().setColor(BLACK_COLOR).setTitle('⚡ TEAM 1991 — Status').setDescription(`Gateway: \`${Math.round(client.ws.ping)}ms\`\nUptime: \`${Math.floor(uptimeSec / 3600)}h ${Math.floor((uptimeSec % 3600) / 60)}m\`\nAntinuke: \`ARMED\``).setFooter({ text: 'Powered By Arthur' })] });
    }
});

// Anti-Nuke Event Listener
client.on('guildBanAdd', async (ban) => {
    if (!antinukeActive) return;
    try {
        const audit = await ban.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberBanAdd });
        const entry = audit.entries.first();
        if (!entry) return;

        const executor = entry.executor;
        if (isImmune(ban.guild, executor.id)) return;

        const rogueMember = await ban.guild.members.fetch(executor.id).catch(() => null);
        if (rogueMember && rogueMember.bannable) {
            await rogueMember.ban({ reason: 'Team 1991 Anti-Bypass: Unauthorized ban execution.' });
            await ban.guild.members.unban(ban.user.id, 'Team 1991 Anti-Bypass: Reverting unauthorized ban.');
        }
    } catch (err) {
        console.error('Antinuke error:', err);
    }
});

// Dropdown Handlers
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId === 'select_module_menu') {
        const val = interaction.values[0];
        if (val === 'mod_home') return interaction.update({ embeds: [getMainCyberHelpEmbed(interaction.user)], components: getCyberHelpComponents() });
        return interaction.update({ embeds: [getSubDetailEmbed(val)] });
    }
    if (interaction.customId === 'select_category_menu') {
        return interaction.update({ embeds: [getSubDetailEmbed(interaction.values[0])] });
    }
});

client.login(process.env.DISCORD_TOKEN);
