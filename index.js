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

// Web dashboard & keep-alive endpoint
app.get('/', (req, res) => {
    res.send(`
    <body style="background:#0b0e14;color:white;font-family:sans-serif;text-align:center;padding:50px;">
        <h2>TEAM 1991 || OLYMPUS</h2>
        <p>Status: <span style="color:#22c55e;">Online 24/7</span></p>
        <p>Servers: ${client.guilds?.cache?.size || 0} | Ping: ${Math.round(client.ws?.ping) || 0}ms</p>
    </body>
    `);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
});

const PREFIX = '$';

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}!`);
});

// Helper: Main Olympus / Xieon Help Embed
function getMainHelpEmbed(user) {
    return new EmbedBuilder()
        .setColor('#FF0033') // Signature red accent line
        .setAuthor({ 
            name: `${user.username}`, 
            iconURL: user.displayAvatarURL({ dynamic: true }) 
        })
        .setDescription(`
**Bot Overview:**
🖊️ : Server Prefix: \`${PREFIX}\`
🔢 : Total Commands: 455 | Slash: 54
🔗 : [Get Olympus](https://team-1991-bot-jfya.onrender.com) | [Website](https://team-1991-bot-jfya.onrender.com)

\`\`\`
<@${client.user.id}> help <command/module>
for more info regarding that command/module!
Example: <@${client.user.id}> help mute
\`\`\`

**Main Modules:**
🛡️ : Antinuke Security
🔒 : Anti Betray ⭐
🔢 : Limit System ⭐
🚨 : Auto Emergency ⭐
❌ : Emergency
🔨 : Moderation
🔧 : Utility
🛑 : Automod
👋 : Welcoming
⭐ : Customroles
🎉 : Giveaway ⭐
🚫 : Boycott/VcBan \`NEW\`
⚙️ : Automations
🎭 : Fun
🔊 : Voice
🛑 : Admin / Mod Setup
⚙️ : Ignore Commands

*Use buttons to swap pages & menu to select help pages. Need help? Contact Support.*
        `)
        .setFooter({ text: 'TEAM 1991 || OLYMPUS', iconURL: client.user.displayAvatarURL() });
}

// Interactive Buttons & Selection Menu
function getHelpComponents() {
    const rowButtons = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_first').setEmoji('⏮️').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('help_prev').setEmoji('◀️').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('help_close').setEmoji('❌').setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setCustomId('help_next').setEmoji('▶️').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('help_last').setEmoji('⏭️').setStyle(ButtonStyle.Secondary)
    );

    const rowMenu = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('help_select')
            .setPlaceholder('Choose a Module for Help')
            .addOptions([
                { label: 'Overview', value: 'mod_home', emoji: '🏠', description: 'Return to main overview' },
                { label: 'Antinuke Security', value: 'mod_antinuke', emoji: '🛡️', description: 'Server protection setup' },
                { label: 'Moderation', value: 'mod_moderation', emoji: '🔨', description: 'Ban, Kick, Mute, Clear, Lock' },
                { label: 'Voice Controls', value: 'mod_voice', emoji: '🔊', description: 'Vc Kick, Vc Mute, Disconnect' },
                { label: 'Utility', value: 'mod_utility', emoji: '🔧', description: 'Ping, Stats, Serverinfo' }
            ])
    );

    return [rowButtons, rowMenu];
}

// Command Handler
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // $help
    if (command === 'help') {
        const embed = getMainHelpEmbed(message.author);
        const components = getHelpComponents();
        return message.reply({ embeds: [embed], components: components });
    }

    // $ping
    if (command === 'ping') {
        return message.reply(`🏓 Pong! Latency: **${Math.round(client.ws.ping)}ms**`);
    }

    // $clear
    if (command === 'clear') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply('❌ You lack permission to delete messages!');
        }
        const amount = parseInt(args[0]);
        if (!amount || amount < 1 || amount > 100) {
            return message.reply('❌ Please specify a valid number between 1 and 100 (e.g. `$clear 20`)');
        }
        await message.channel.bulkDelete(amount, true);
        return message.channel.send(`🧹 Successfully purged **${amount}** messages.`).then(m => setTimeout(() => m.delete(), 3000));
    }

    // $ban
    if (command === 'ban') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.reply('❌ You lack permission to ban members!');
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a member: `$ban @user [reason]`');
        if (!member.bannable) return message.reply('❌ Cannot ban this user (Check role hierarchy).');
        await member.ban({ reason: args.slice(1).join(' ') || 'No reason provided' });
        return message.reply(`✅ Banned **${member.user.tag}**.`);
    }

    // $kick
    if (command === 'kick') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return message.reply('❌ You lack permission to kick members!');
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a member: `$kick @user`');
        if (!member.kickable) return message.reply('❌ Cannot kick this user.');
        await member.kick();
        return message.reply(`✅ Kicked **${member.user.tag}**.`);
    }

    // $mute / $timeout
    if (command === 'mute' || command === 'timeout') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply('❌ You lack permission to timeout members!');
        }
        const member = message.mentions.members.first();
        const mins = parseInt(args[1]) || 5;
        if (!member) return message.reply('❌ Mention a member: `$mute @user 10`');
        await member.timeout(mins * 60 * 1000, 'TEAM 1991 Moderation');
        return message.reply(`🔇 Muted **${member.user.tag}** for **${mins}** minutes.`);
    }

    // $unmute
    if (command === 'unmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply('❌ You lack permission to manage timeouts!');
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Mention a member: `$unmute @user`');
        await member.timeout(null);
        return message.reply(`🔊 Unmuted **${member.user.tag}**.`);
    }

    // $lock
    if (command === 'lock') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply('❌ You lack permission to manage channels!');
        }
        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: false });
        return message.reply('🔒 Channel locked.');
    }

    // $unlock
    if (command === 'unlock') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply('❌ You lack permission to manage channels!');
        }
        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: true });
        return message.reply('🔓 Channel unlocked.');
    }

    // $vckick
    if (command === 'vckick') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MoveMembers)) {
            return message.reply('❌ You lack permission to disconnect voice members!');
        }
        const member = message.mentions.members.first();
        if (!member || !member.voice.channel) return message.reply('❌ User must be inside a voice channel.');
        await member.voice.disconnect();
        return message.reply(`🔌 Disconnected **${member.user.tag}** from voice.`);
    }

    // $vcmute
    if (command === 'vcmute') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            return message.reply('❌ You lack permission to mute members in voice!');
        }
        const member = message.mentions.members.first();
        if (!member || !member.voice.channel) return message.reply('❌ User must be inside a voice channel.');
        await member.voice.setMute(true);
        return message.reply(`🔇 Muted **${member.user.tag}** in voice.`);
    }
});

// UI Interactions: Button Clicks & Dropdown Selections
client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'help_close') {
            return interaction.message.delete().catch(() => {});
        }
        if (interaction.customId === 'help_first' || interaction.customId === 'help_prev') {
            const embed = getMainHelpEmbed(interaction.user);
            return interaction.update({ embeds: [embed] });
        }
    }

    if (interaction.isStringSelectMenu() && interaction.customId === 'help_select') {
        const selected = interaction.values[0];

        if (selected === 'mod_home') {
            return interaction.update({ embeds: [getMainHelpEmbed(interaction.user)] });
        }

        const subEmbed = new EmbedBuilder().setColor('#FF0033');

        if (selected === 'mod_antinuke') {
            subEmbed.setTitle('🛡️ Antinuke Security Modules')
                .setDescription(`
**Available Commands:**
\`${PREFIX}antinuke enable/disable\` — Toggle automated raid protection
\`${PREFIX}whitelist @user\` — Grant antinuke immunity
\`${PREFIX}unwhitelist @user\` — Revoke whitelist permissions
\`${PREFIX}recovery\` — Emergency lockdown and permissions revert
                `);
        } else if (selected === 'mod_moderation') {
            subEmbed.setTitle('🔨 Moderation Modules')
                .setDescription(`
**Available Commands:**
\`${PREFIX}ban @user [reason]\` — Permanently ban member
\`${PREFIX}kick @user\` — Kick member from server
\`${PREFIX}mute @user [mins]\` — Apply member timeout
\`${PREFIX}unmute @user\` — Remove active timeout
\`${PREFIX}clear [amount]\` — Purge messages in bulk
\`${PREFIX}lock\` / \`${PREFIX}unlock\` — Toggle channel sending permissions
                `);
        } else if (selected === 'mod_voice') {
            subEmbed.setTitle('🔊 Voice Modules')
                .setDescription(`
**Available Commands:**
\`${PREFIX}vckick @user\` — Disconnect user from active voice channel
\`${PREFIX}vcmute @user\` — Server-mute user across voice
\`${PREFIX}vcunmute @user\` — Remove server-mute from user
                `);
        } else if (selected === 'mod_utility') {
            subEmbed.setTitle('🔧 Utility Modules')
                .setDescription(`
**Available Commands:**
\`${PREFIX}help\` — Open this interactive panel
\`${PREFIX}ping\` — Check websocket gateway ping
\`${PREFIX}serverinfo\` — Display member and channel metrics
                `);
        }

        return interaction.update({ embeds: [subEmbed] });
    }
});

// Logs in securely via the Render Environment Variable
client.login(process.env.DISCORD_TOKEN);
