const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../config.json');
const os = require('os');

module.exports = {
    name: 'botinfo',
    description: 'Bot hakkında bilgi verir.',
    async execute(message) {
        // Botun izinlerini kontrol edin
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages) || !message.guild.members.me.permissions.has(PermissionsBitField.Flags.EmbedLinks)) {
            return message.reply('Bu komutu kullanmak için gerekli izinlere sahip değilim: `Send Messages` ve `Embed Links`');
        }

        // Toplam kullanıcı sayısını hesaplayın
        const totalUsers = message.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

        // Bot bilgilerini derleyin
        const botInfoEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Bot Bilgileri 🤖')
            .setThumbnail(message.client.user.displayAvatarURL())
            .addFields(
                { name: '🤖 Bot Adı', value: `${message.client.user.username}`, inline: true },
                { name: '🔢 Sürüm', value: `${require('discord.js').version}`, inline: true },
                { name: '🟢 Node.js Versiyonu', value: `${process.version}`, inline: true },
                { name: '📝 Prefix', value: `${config.prefix}`, inline: true },
                { name: '👑 Sahip', value: `<@${config.ownerID}>`, inline: true },
                { name: '📊 Toplam Sunucu', value: `${message.client.guilds.cache.size}`, inline: true },
                { name: '👥 Toplam Kullanıcı', value: `${totalUsers}`, inline: true },
                { name: '⏳ Çalışma Süresi', value: `${Math.floor(message.client.uptime / (1000 * 60 * 60))} saat`, inline: true },
                { name: '💻 İşletim Sistemi', value: `${os.type()} ${os.arch()}`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: 'Bot Bilgileri', iconURL: message.client.user.displayAvatarURL() });

        // Embed'i yanıt olarak gönderin
        await message.reply({ embeds: [botInfoEmbed] });
    },
};