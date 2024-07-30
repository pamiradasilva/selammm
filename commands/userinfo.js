const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Kullanıcı bilgilerini gösterir.',
    async execute(message, args) {
        // Kullanıcıyı belirle
        const user = message.mentions.users.first() || message.author;
        const member = message.guild.members.cache.get(user.id);

        // Kullanıcı bilgilerini içeren embed oluştur
        const userInfoEmbed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle(`${user.username} Bilgileri 👤`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: '📛 Kullanıcı Adı', value: `${user.username}`, inline: true },
                { name: '🆔 ID', value: `${user.id}`, inline: true },
                { name: '📅 Hesap Oluşturma Tarihi', value: `${user.createdAt.toDateString()}`, inline: true },
                { name: '📍 Sunucu Üyelik Tarihi', value: `${member.joinedAt.toDateString()}`, inline: true },
                { name: '🔗 Etiket', value: `${user.tag}`, inline: true },
                { name: '📧 Durum', value: `${user.presence ? user.presence.status : 'Bilinmiyor'}`, inline: true },
                { name: '📜 Roller', value: `${member.roles.cache.size > 1 ? member.roles.cache.map(role => role.name).join(', ') : 'Hiçbir rol yok'}`, inline: true },

            )
            .setTimestamp()
            .setFooter({ text: 'Kullanıcı Bilgileri', iconURL: user.displayAvatarURL() });

        // Embed'i yanıt olarak gönder
        await message.reply({ embeds: [userInfoEmbed] });
    },
};