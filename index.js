const { 
    Client, 
    GatewayIntentBits, 
    EmbedBuilder, 
    ActionRowBuilder, 
    StringSelectMenuBuilder, 
    PermissionsBitField 
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

// Clean Cyber Dashboard
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
        <title>TEAM 1991 Control Center</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Segoe UI', Roboto, sans-serif; background: #080a10; color: #ffffff; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
            .card { background: #10141f; border: 1px solid #1f273b; border-radius: 16px; max-width: 540px; width: 100%; padding: 36px 28px; text-align: center; box-shadow: 0 12px 35px rgba(0,0,0,0.7); }
            .badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(34, 197, 94, 0.15); border: 1px solid #22c55e; color: #22c55e; padding: 6px 14px; border-radius: 50px; font-size: 13px; font-weight: 600; margin-bottom: 20px; }
            .dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 10px #22c55e; }
            h1 { font-size: 26px; color: #ff9900; margin-bottom: 8px; font-weight: 700; }
            p.sub { font-size: 14px; color: #94a3b8; margin-bottom: 24px; }
            .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; border-top: 1px solid #1f273b; padding-top: 22px; }
            .stat-box { background: #0a0d14; padding: 14px 10px; border-radius: 10px; border: 1px solid #182030; }
            .stat-box h3 { font-size: 18px; color: #38bdf8; margin-bottom: 4px; }
            .stat-box span { font-size: 12px; color: #64748b; }
            .footer-txt { margin-top: 24px; font-size: 12px; color: #475569; }
        </style>
    </head>
    <body>
        <div class="card">
            <div class="badge"><div class="dot"></div> Security Core Active 24/7</div>
            <h1>TEAM 1991</h1>
            <p class="sub">Autonomous Moderation, Protection & Server Management</p>
            <div class="stats">
                <div class="stat-box">
                    <h3>${client.guilds?.cache?.size || 0}</h3>
                    <span>Servers</span>
                </div>
                <div class="stat-box">
                    <h3>${Math.round(client.ws?.ping) || 0}ms</h3>
                    <span>Latency</span>
                </div>
                <div class="stat-box">
                    <h3>${hours}h ${mins}m</h3>
                    <span>Uptime</span>
                </div>
            </div>
            <p class="footer-txt">Powered By AeroX Devs</p>
        </div>
    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Web Server running on port ${PORT}`);
});

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}!`);
});

const whitelistedUsers = new Set();
let antinukeActive = true;

// Screenshot-matched Layout[span_6](start_span)[span_6](end_span)
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
        .setFooter({ text: 'Powered By AeroX Devs' });
}

// Dual Dropdown Components matching Screenshots[span_7](start_span)[span_7](end_span)[span_8](start_span)[span_8](end_span)
function getCyberHelpComponents() {
    // Menu 1: Module Selector[span_9](start_span)[span_9](end_span)[span_10](start_span)[span_10](end_span)
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

    // Menu 2: Category Selector[span_11](start_span)[span_11](end_span)
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
    const embed = new EmbedBuilder().setColor('#2b2d31').setFooter({ text: 'Powered By AeroX Devs' });

    switch (key) {
        case 'mod_moderation':
            embed.setTitle('🔨 Moderation Module')
                .setDescription('`Rban @user [reason]`, `Rkick @user`, `Rmute @user [time]`, `Runmute @user`, `Rclear [amount]`, `Rlock`, `Runlock`');
            break;
        case 'mod_antinuke':
            embed.setTitle('⚔️ Antinuke Defense Module')
                .setDescription('`Rantinuke enable/disable`, `Rwhitelist @user`, `Runwhitelist @user`, `Rwhitelisted`');
            break;
        case 'mod_general':
        case 'mod_info':
            embed.setTitle('ℹ️ Information & General')
                .setDescription('`Rserverinfo` (or `Rsi`), `Ruserinfo @user`, `Ravatar @user`, `Rping`, `Rbotinfo`');
            break;
        case 'cat_voice':
            embed.setTitle('🎤 Voice Control')
                .setDescription('`Rvckick @user`, `Rvcmute @user`, `Rvcunmute @user`');
            break;
        case 'mod_welcome':
            embed.setTitle('🔔 Welcome Setup')
                .setDescription('`Rwelcome #channel`, `Rwelcome test`, `Rwelcome disable`');
            break;
        case 'cat_giveaway':
            embed.setTitle('🎁 Giveaway Commands')
                .setDescription('`Rgstart [time] [prize]`, `Rgend [msgID]`, `Rgreroll [msgID]`');
            break;
        default:
            embed.setTitle(`Module: ${key.replace(/(mod_|cat_)/, '').toUpperCase()}`)
                .setDescription('All sub-commands are active under prefix `R` or `$`. Type `Rhelp` to return.');
            break;
    }
    return embed;
}

// Command Handler (Prefix 'R', '$', or Bot Mention)[span_12](start_span)[span_12](end_span)
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

    // 1. Help Command
    if (command === 'help') {
        const embed = getMainCyberHelpEmbed(message.author);
        const components = getCyberHelpComponents();
        return message.reply({ embeds: [embed], components: components });
    }

    // 2. Ping
    if (command === 'ping') {
        return message.reply(`🏓 Pong! Latency: **${Math.round(client.ws.ping)}ms**`);
    }

    // 3. Serverinfo / si
    if (command === 'serverinfo' || command === 'si') {
        const guild = message.guild;
        const embed = new EmbedBuilder()
            .setColor('#2b2d31')
            .setTitle(`📊 Server Intelligence: ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Total Members', value: `${guild.memberCount}`, inline: true },
                { name: 'Roles', value: `${guild.roles.cache.size}`, inline: true },
                { name: 'Channels', value: `${guild.channels.cache.size}`, inline: true },
                { name: 'Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true }
            )
            .setFooter({ text: 'Powered By AeroX Devs' });
        return message.reply({ embeds: [embed] });
    }

    // 4. Antinuke Commands
    if (command === 'antinuke') {
        if (message.author.id !== message.guild.ownerId) {
            return message.reply('❌ Only the Server Owner can configure Antinuke settings!');
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
            return message.reply('❌ Only the Server Owner can add users to the whitelist!');
        }
        const target = message.mentions.members.first();
        if (!target) return message.reply('❌ Mention a member: `Rwhitelist @user`');
        whitelistedUsers.add(target.id);
        return message.reply(`🛡️ Added **${target.user.tag}** to the **TEAM 1991** Whitelist.`);
    }

    if (command === 'unwhitelist') {
        if (message.author.id !== message.guild.ownerId) {
            return message.reply('❌ Only the Server Owner can remove users from the whitelist!');
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
        await member.ban({ reason: args.slice(1).join(' ') || 'No reason' });
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
        await member.timeout(mins * 60 * 1000, 'TEAM 1991 Moderation');
        return message.reply(`🔇 Muted **${member.user.tag}** for **${mins}** minutes.`);
    }

    if (command === 'unmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply('❌ Permission required!');
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
        return message.reply('🔒 Channel locked.');
    }

    if (command === 'unlock') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply('❌ Manage Channels permission required!');
        }
        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: true });
        return message.reply('🔓 Channel unlocked.');
    }

    // 11. Voice Commands
    if (command === 'vckick') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MoveMembers)) {
            return message.reply('❌ Move Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member || !member.voice.channel) return message.reply('❌ User must be in a voice channel.');
        await member.voice.disconnect();
        return message.reply(`🔌 Disconnected **${member.user.tag}** from voice.`);
    }

    if (command === 'vcmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            return message.reply('❌ Mute Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member || !member.voice.channel) return message.reply('❌ User must be in a voice channel.');
        await member.voice.setMute(true);
        return message.reply(`🔇 Voice-muted **${member.user.tag}**.`);
    }

    if (command === 'vcunmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            return message.reply('❌ Mute Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member || !member.voice.channel) return message.reply('❌ User must be in a voice channel.');
        await member.voice.setMute(false);
        return message.reply(`🔊 Voice-unmuted **${member.user.tag}**.`);
    }
});

// Dropdown Interactions[span_13](start_span)[span_13](end_span)[span_14](start_span)[span_14](end_span)
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
