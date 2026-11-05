const { 
    Client, 
    GatewayIntentBits, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
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

// Permanent Web Dashboard
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
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0d13; color: #ffffff; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
            .card { background: linear-gradient(145deg, #121620, #181d2a); border: 1px solid #232b3e; border-radius: 16px; max-width: 540px; width: 100%; padding: 36px 28px; text-align: center; box-shadow: 0 12px 35px rgba(0,0,0,0.7); }
            .status-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(34, 197, 94, 0.15); border: 1px solid #22c55e; color: #22c55e; padding: 6px 14px; border-radius: 50px; font-size: 13px; font-weight: 600; margin-bottom: 20px; }
            .dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 10px #22c55e; }
            h1 { font-size: 26px; font-weight: 700; color: #5865F2; margin-bottom: 8px; }
            p.sub { font-size: 14px; color: #94a3b8; margin-bottom: 26px; }
            .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; border-top: 1px solid #21293c; padding-top: 22px; }
            .stat-card { background: #0c1017; padding: 14px 10px; border-radius: 10px; border: 1px solid #1f283b; }
            .stat-card h3 { font-size: 18px; color: #38bdf8; margin-bottom: 4px; }
            .stat-card span { font-size: 12px; color: #64748b; }
        </style>
    </head>
    <body>
        <div class="card">
            <div class="status-badge"><div class="dot"></div> System Online 24/7</div>
            <h1>Team 1991</h1>
            <p class="sub">Advanced Antinuke, Moderation, Voice & Security System Active</p>
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>${client.guilds?.cache?.size || 0}</h3>
                    <span>Servers</span>
                </div>
                <div class="stat-card">
                    <h3>${Math.round(client.ws?.ping) || 0}ms</h3>
                    <span>Ping</span>
                </div>
                <div class="stat-card">
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
    console.log(`Team 1991 Dashboard running on port ${PORT}`);
});

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}!`);
});

// Main Help Embed - Showing only "Team 1991"
function getHelpOverviewEmbed(user) {
    return new EmbedBuilder()
        .setColor('#2b2d31')
        .setTitle('Help Command Overview')
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setDescription(`
Type \`<@${client.user.id}> help <command/module>\` to get more info regarding it
**549 Commands**

**Module**
🛡️ Antinuke
⚜️ Extra
🌐 General
🎉 Giveaways
🔨 Moderation
🎵 Music
✏️ Ignore
🖥️ Media
🎙️ Invc
👥 Raidmode
🔊 Voice
🎮 Games
🚪 Welcomer
        `)
        .setFooter({ text: 'Team 1991', iconURL: client.user.displayAvatarURL() });
}

// UI Buttons & Select Menu
function getHelpUIComponents() {
    const buttonRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_first').setLabel('«').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId('help_back').setLabel('Back').setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId('help_delete').setEmoji('🗑️').setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setCustomId('help_next').setLabel('Next').setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId('help_last').setLabel('»').setStyle(ButtonStyle.Primary)
    );

    const selectMenuRow = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('help_module_select')
            .setPlaceholder('Select Module To Get Help For That Module.')
            .addOptions([
                { label: 'Index', value: 'mod_index', emoji: '💻', description: 'Show You Index' },
                { label: 'Antinuke', value: 'mod_antinuke', emoji: '🛡️', description: 'Show You Antinuke Commands' },
                { label: 'Extra', value: 'mod_extra', emoji: '⚜️', description: 'Show You Extra Commands' },
                { label: 'General', value: 'mod_general', emoji: '🌐', description: 'Show You General Commands' },
                { label: 'Giveaways', value: 'mod_giveaways', emoji: '🎉', description: 'Show You Giveaways Commands' },
                { label: 'Moderation', value: 'mod_moderation', emoji: '🔨', description: 'Show You Moderation Commands' },
                { label: 'Music', value: 'mod_music', emoji: '🎵', description: 'Show You Music Commands' },
                { label: 'Ignore', value: 'mod_ignore', emoji: '✏️', description: 'Show You Ignore Commands' },
                { label: 'Media', value: 'mod_media', emoji: '🖥️', description: 'Show You Media Commands' },
                { label: 'Invc', value: 'mod_invc', emoji: '🎙️', description: 'Show You Invc Commands' },
                { label: 'Raidmode', value: 'mod_raidmode', emoji: '👥', description: 'Show You Raidmode Commands' },
                { label: 'Voice', value: 'mod_voice', emoji: '🔊', description: 'Show You Voice Commands' },
                { label: 'Games', value: 'mod_games', emoji: '🎮', description: 'Show You Games Commands' },
                { label: 'Welcomer', value: 'mod_welcomer', emoji: '🚪', description: 'Show You Welcomer Commands' }
            ])
    );

    return [selectMenuRow, buttonRow];
}

// Sub-Module Embed Details
function getModuleEmbed(mod) {
    const embed = new EmbedBuilder().setColor('#2b2d31').setFooter({ text: 'Team 1991', iconURL: client.user.displayAvatarURL() });

    switch (mod) {
        case 'mod_index':
            embed.setTitle('💻 Index Module')
                .setDescription('`help`, `ping`, `stats`, `invite`, `support`');
            break;
        case 'mod_antinuke':
            embed.setTitle('🛡️ Antinuke Module')
                .setDescription('`antinuke enable`, `antinuke disable`, `whitelist @user`, `unwhitelist @user`, `whitelisted`');
            break;
        case 'mod_moderation':
            embed.setTitle('🔨 Moderation Module')
                .setDescription('`ban @user [reason]`, `kick @user`, `mute @user [time]`, `unmute @user`, `clear [amount]`, `lock`, `unlock`');
            break;
        case 'mod_voice':
            embed.setTitle('🔊 Voice Module')
                .setDescription('`vckick @user`, `vcmute @user`, `vcunmute @user`, `vclock`, `vcunlock`');
            break;
        case 'mod_general':
            embed.setTitle('🌐 General Module')
                .setDescription('`serverinfo` (or `si`), `userinfo`, `avatar`, `membercount`, `botinfo`');
            break;
        case 'mod_raidmode':
            embed.setTitle('👥 Raidmode Module')
                .setDescription('`raidmode on`, `raidmode off`, `anti-bot on`, `lockdown`');
            break;
        case 'mod_welcomer':
            embed.setTitle('🚪 Welcomer Module')
                .setDescription('`welcomer channel #channel`, `welcomer message <text>`, `welcomer test`');
            break;
        default:
            embed.setTitle(`Module: ${mod.replace('mod_', '').toUpperCase()}`)
                .setDescription('All sub-commands are active for this module.');
            break;
    }
    return embed;
}

// Command Handler supporting '$', 'R', or bot mentions
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
        const embed = getHelpOverviewEmbed(message.author);
        const components = getHelpUIComponents();
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
            .setTitle(`📊 Server Information: ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Members', value: `${guild.memberCount}`, inline: true },
                { name: 'Roles', value: `${guild.roles.cache.size}`, inline: true },
                { name: 'Channels', value: `${guild.channels.cache.size}`, inline: true },
                { name: 'Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true }
            )
            .setFooter({ text: 'Team 1991', iconURL: client.user.displayAvatarURL() });
        return message.reply({ embeds: [embed] });
    }

    // 4. Whitelist
    if (command === 'whitelist') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('❌ Administrator permission required!');
        }
        const target = message.mentions.members.first();
        if (!target) return message.reply('❌ Mention a member: `whitelist @user`');
        return message.reply(`🛡️ **${target.user.tag}** has been added to the **Team 1991** Trusted Whitelist.`);
    }

    // 5. Clear
    if (command === 'clear') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply('❌ Manage Messages permission required!');
        }
        const amount = parseInt(args[0]);
        if (!amount || amount < 1 || amount > 100) {
            return message.reply('❌ Provide a number between 1 and 100 (e.g. `clear 20`)');
        }
        await message.channel.bulkDelete(amount, true);
        return message.channel.send(`🧹 **${amount}** messages cleared!`).then(m => setTimeout(() => m.delete(), 3000));
    }

    // 6. Ban
    if (command === 'ban') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.reply('❌ Ban Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a member: `ban @user [reason]`');
        if (!member.bannable) return message.reply('❌ Cannot ban this user (Check role hierarchy).');
        await member.ban({ reason: args.slice(1).join(' ') || 'No reason specified' });
        return message.reply(`🔨 Successfully banned **${member.user.tag}**.`);
    }

    // 7. Kick
    if (command === 'kick') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return message.reply('❌ Kick Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a member: `kick @user`');
        if (!member.kickable) return message.reply('❌ Cannot kick this user.');
        await member.kick();
        return message.reply(`👢 Successfully kicked **${member.user.tag}**.`);
    }

    // 8. Mute / Timeout
    if (command === 'mute' || command === 'timeout') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply('❌ Moderate Members permission required!');
        }
        const member = message.mentions.members.first();
        const mins = parseInt(args[1]) || 5;
        if (!member) return message.reply('❌ Mention a member: `mute @user 10`');
        await member.timeout(mins * 60 * 1000, 'Team 1991 Moderation');
        return message.reply(`🔇 **${member.user.tag}** has been timed out for **${mins}** minutes.`);
    }

    // 9. Unmute
    if (command === 'unmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply('❌ Moderate Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a member: `unmute @user`');
        await member.timeout(null);
        return message.reply(`🔊 Removed timeout from **${member.user.tag}**.`);
    }

    // 10. Lock
    if (command === 'lock') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply('❌ Manage Channels permission required!');
        }
        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: false });
        return message.reply('🔒 Channel locked.');
    }

    // 11. Unlock
    if (command === 'unlock') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply('❌ Manage Channels permission required!');
        }
        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: true });
        return message.reply('🔓 Channel unlocked.');
    }

    // 12. Voice Commands
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
});

// Button & Dropdown Interactions
client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'help_delete') {
            return interaction.message.delete().catch(() => {});
        }
        if (interaction.customId === 'help_back' || interaction.customId === 'help_first') {
            return interaction.update({ embeds: [getHelpOverviewEmbed(interaction.user)] });
        }
        if (interaction.customId === 'help_next' || interaction.customId === 'help_last') {
            return interaction.update({ embeds: [getModuleEmbed('mod_antinuke')] });
        }
    }

    if (interaction.isStringSelectMenu() && interaction.customId === 'help_module_select') {
        const val = interaction.values[0];
        if (val === 'mod_index') {
            return interaction.update({ embeds: [getHelpOverviewEmbed(interaction.user)] });
        }
        return interaction.update({ embeds: [getModuleEmbed(val)] });
    }
});

client.login(process.env.DISCORD_TOKEN);
