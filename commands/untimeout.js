const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'untimeout',
    description: 'Kullanıcının aktif timeout süresini kaldırır.',
    async execute(message, args) {
        // Bot sahibinin olup olmadığını kontrol et
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('Bu komutu kullanma izniniz yok.');
        }

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) {
            return message.reply('Lütfen bir kullanıcı belirtin.');
        }

        // Kullanıcının timeout olup olmadığını kontrol et
        if (!member.communicationDisabledUntil) {
            return message.reply('Bu kullanıcının aktif bir timeout süresi bulunmuyor.');
        }

        try {
            // Timeout süresini kaldır
            await member.timeout(null, 'Timeout kaldırıldı.');

            // Başarı mesajını oluştur
            const successEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Timeout Kaldırıldı')
                .setDescription(`${member.user.tag} kullanıcısının timeout süresi başarıyla kaldırıldı.`)
                .setTimestamp()
                .setFooter({ text: 'Komut başarıyla çalıştırıldı.', iconURL: message.client.user.displayAvatarURL() });

            await message.reply({ embeds: [successEmbed] });
        } catch (error) {
            console.error('Timeout kaldırılırken bir hata oluştu:', error);
            await message.reply('Timeout kaldırılırken bir hata oluştu.');
        }
    },
};