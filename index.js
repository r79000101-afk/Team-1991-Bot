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

// Modern Neon Dashboard
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
        <title>Team 1991 || KRYPTON</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0d13; color: #ffffff; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
            .card { background: linear-gradient(145deg, #121620, #181d2a); border: 1px solid #232b3e; border-radius: 16px; max-width: 540px; width: 100%; padding: 36px 28px; text-align: center; box-shadow: 0 12px 35px rgba(0,0,0,0.7); }
            .status-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(34, 197, 94, 0.15); border: 1px solid #22c55e; color: #22c55e; padding: 6px 14px; border-radius: 50px; font-size: 13px; font-weight: 600; margin-bottom: 20px; }
            .dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 10px #22c55e; }
            h1 { font-size: 26px; font-weight: 700; color: #5865F2; margin-bottom: 8px; letter-spacing: 0.5px; }
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
    console.log(`Team 1991 Server is online on port ${PORT}`);
});

const PREFIX = 'R';

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}!`);
});

// Krypton Main Embed Generator[span_3](start_span)[span_3](end_span)
function getKryptonMainEmbed(user) {
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
        .setFooter({ text: 'Team 1991 || KRYPTON', iconURL: client.user.displayAvatarURL() });
}

// Interactive UI Buttons & Select Menu[span_4](start_span)[span_4](end_span)[span_5](start_span)[span_5](end_span)[span_6](start_span)[span_6](end_span)
function getKryptonComponents() {
    // 5 buttons: Primary «, Success Back, Danger Delete, Success Next, Primary »[span_7](start_span)[span_7](end_span)
    const buttonRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('krypton_first').setLabel('«').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId('krypton_back').setLabel('Back').setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId('krypton_delete').setEmoji('🗑️').setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setCustomId('krypton_next').setLabel('Next').setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId('krypton_last').setLabel('»').setStyle(ButtonStyle.Primary)
    );

    // Exact Krypton Modules in dropdown[span_8](start_span)[span_8](end_span)[span_9](start_span)[span_9](end_span)
    const selectMenuRow = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('krypton_module_select')
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

// Sub-Module Embeds[span_10](start_span)[span_10](end_span)[span_11](start_span)[span_11](end_span)
function getSubModuleEmbed(moduleName) {
    const embed = new EmbedBuilder().setColor('#2b2d31');

    switch (moduleName) {
        case 'mod_index':
            embed.setTitle('💻 Index Module')
                .setDescription(`\`${PREFIX}help\`, \`${PREFIX}ping\`, \`${PREFIX}invite\`, \`${PREFIX}support\`, \`${PREFIX}stats\``);
            break;
        case 'mod_antinuke':
            embed.setTitle('🛡️ Antinuke Module')
                .setDescription(`\`${PREFIX}antinuke enable\`, \`${PREFIX}antinuke disable\`, \`${PREFIX}whitelist @user\`, \`${PREFIX}unwhitelist @user\`, \`${PREFIX}whitelisted\``);
            break;
        case 'mod_moderation':
            embed.setTitle('🔨 Moderation Module')
                .setDescription(`\`${PREFIX}ban @user [reason]\`, \`${PREFIX}kick @user\`, \`${PREFIX}mute @user [time]\`, \`${PREFIX}unmute @user\`, \`${PREFIX}clear [amount]\`, \`${PREFIX}lock\`, \`${PREFIX}unlock\``);
            break;
        case 'mod_voice':
            embed.setTitle('🔊 Voice Module')
                .setDescription(`\`${PREFIX}vckick @user\`, \`${PREFIX}vcmute @user\`, \`${PREFIX}vcunmute @user\`, \`${PREFIX}vclock\`, \`${PREFIX}vcunlock\``);
            break;
        case 'mod_general':
            embed.setTitle('🌐 General Module')
                .setDescription(`\`${PREFIX}serverinfo\` (or \`${PREFIX}si\`), \`${PREFIX}userinfo\`, \`${PREFIX}avatar\`, \`${PREFIX}membercount\`, \`${PREFIX}botinfo\``);
            break;
        case 'mod_raidmode':
            embed.setTitle('👥 Raidmode Module')
                .setDescription(`\`${PREFIX}raidmode on\`, \`${PREFIX}raidmode off\`, \`${PREFIX}anti-bot on\`, \`${PREFIX}lockdown\``);
            break;
        case 'mod_welcomer':
            embed.setTitle('🚪 Welcomer Module')
                .setDescription(`\`${PREFIX}welcomer channel #channel\`, \`${PREFIX}welcomer message <text>\`, \`${PREFIX}welcomer test\``);
            break;
        default:
            embed.setTitle(`Module: ${moduleName.replace('mod_', '').toUpperCase()}`)
                .setDescription(`Commands for this module are active under prefix \`${PREFIX}\`. Type \`${PREFIX}help\` for overview.`);
            break;
    }
    return embed;
}

// Commands Handler with Prefix R and Mention Support[span_12](start_span)[span_12](end_span)
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Both Prefix 'R' and Bot Mention support[span_13](start_span)[span_13](end_span)
    const mentionRegex = new RegExp(`^<@!?${client.user.id}>(?:\\s+)?`);
    let isMention = false;
    let rawContent = message.content;

    if (mentionRegex.test(rawContent)) {
        isMention = true;
        rawContent = rawContent.replace(mentionRegex, '').trim();
    } else if (rawContent.startsWith(PREFIX)) {
        rawContent = rawContent.slice(PREFIX.length).trim();
    } else {
        return;
    }

    const args = rawContent.split(/ +/);
    const command = args.shift().toLowerCase();

    // Help Command
    if (command === 'help') {
        const embed = getKryptonMainEmbed(message.author);
        const components = getKryptonComponents();
        return message.reply({ embeds: [embed], components: components });
    }

    // Ping
    if (command === 'ping') {
        return message.reply(`🏓 Pong! Latency: **${Math.round(client.ws.ping)}ms**`);
    }

    // Serverinfo / si[span_14](start_span)[span_14](end_span)
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
            );
        return message.reply({ embeds: [embed] });
    }

    // Whitelist Command[span_15](start_span)[span_15](end_span)
    if (command === 'whitelist') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('❌ You need Administrator permission!');
        }
        const target = message.mentions.members.first();
        if (!target) return message.reply(`❌ Mention a member: \`${PREFIX}whitelist @user\``);
        return message.reply(`🛡️ **${target.user.tag}** has been added to the Trusted Whitelist.`);
    }

    // Clear Command
    if (command === 'clear') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply('❌ Manage Messages permission required!');
        }
        const amount = parseInt(args[0]);
        if (!amount || amount < 1 || amount > 100) {
            return message.reply(`❌ Provide a number 1-100 (e.g. \`${PREFIX}clear 20\`)`);
        }
        await message.channel.bulkDelete(amount, true);
        return message.channel.send(`🧹 Successfully cleared **${amount}** messages.`).then(m => setTimeout(() => m.delete(), 3000));
    }

    // Ban Command
    if (command === 'ban') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.reply('❌ Ban Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply(`❌ Mention a member: \`${PREFIX}ban @user [reason]\``);
        if (!member.bannable) return message.reply('❌ Cannot ban this user (Check role hierarchy).');
        await member.ban({ reason: args.slice(1).join(' ') || 'No reason specified' });
        return message.reply(`🔨 Successfully banned **${member.user.tag}**.`);
    }

    // Kick Command
    if (command === 'kick') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return message.reply('❌ Kick Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply(`❌ Mention a member: \`${PREFIX}kick @user\``);
        if (!member.kickable) return message.reply('❌ Cannot kick this user.');
        await member.kick();
        return message.reply(`👢 Successfully kicked **${member.user.tag}**.`);
    }

    // Mute Command
    if (command === 'mute' || command === 'timeout') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply('❌ Moderate Members permission required!');
        }
        const member = message.mentions.members.first();
        const mins = parseInt(args[1]) || 5;
        if (!member) return message.reply(`❌ Mention a member: \`${PREFIX}mute @user 10\``);
        await member.timeout(mins * 60 * 1000, 'Team 1991 Moderation');
        return message.reply(`🔇 Timed out **${member.user.tag}** for **${mins}** minutes.`);
    }

    // Unmute Command
    if (command === 'unmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply('❌ Moderate Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply(`❌ Mention a member: \`${PREFIX}unmute @user\``);
        await member.timeout(null);
        return message.reply(`🔊 Removed timeout from **${member.user.tag}**.`);
    }

    // Lock Channel
    if (command === 'lock') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply('❌ Manage Channels permission required!');
        }
        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: false });
        return message.reply('🔒 Channel has been locked.');
    }

    // Unlock Channel
    if (command === 'unlock') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply('❌ Manage Channels permission required!');
        }
        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: true });
        return message.reply('🔓 Channel has been unlocked.');
    }

    // VC Kick
    if (command === 'vckick') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MoveMembers)) {
            return message.reply('❌ Move Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member || !member.voice.channel) return message.reply('❌ User must be in a voice channel.');
        await member.voice.disconnect();
        return message.reply(`🔌 Disconnected **${member.user.tag}** from VC.`);
    }

    // VC Mute
    if (command === 'vcmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            return message.reply('❌ Mute Members permission required!');
        }
        const member = message.mentions.members.first();
        if (!member || !member.voice.channel) return message.reply('❌ User must be in a voice channel.');
        await member.voice.setMute(true);
        return message.reply(`🔇 Server-muted **${member.user.tag}** in VC.`);
    }
});

// UI Interactions (Buttons & Select Menu Handler)[span_16](start_span)[span_16](end_span)[span_17](start_span)[span_17](end_span)[span_18](start_span)[span_18](end_span)
client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'krypton_delete') {
            return interaction.message.delete().catch(() => {});
        }
        if (interaction.customId === 'krypton_back' || interaction.customId === 'krypton_first') {
            const mainEmbed = getKryptonMainEmbed(interaction.user);
            return interaction.update({ embeds: [mainEmbed] });
        }
        if (interaction.customId === 'krypton_next' || interaction.customId === 'krypton_last') {
            const subEmbed = getSubModuleEmbed('mod_antinuke');
            return interaction.update({ embeds: [subEmbed] });
        }
    }

    if (interaction.isStringSelectMenu() && interaction.customId === 'krypton_module_select') {
        const val = interaction.values[0];
        if (val === 'mod_index') {
            return interaction.update({ embeds: [getKryptonMainEmbed(interaction.user)] });
        }
        const moduleEmbed = getSubModuleEmbed(val);
        return interaction.update({ embeds: [moduleEmbed] });
    }
});

client.login(process.env.DISCORD_TOKEN);
