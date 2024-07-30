const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'sunucuinfo',
    description: 'Sunucu hakkında detaylı bilgi verir ve botu sunucuya eklemek için buton içerir.',
    async execute(message) {
        // Sunucu bilgilerini al
        const guild = message.guild;
        const owner = await guild.fetchOwner();

        // Embed mesajı oluştur
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${guild.name} 🌟 Sunucu Bilgisi`)
            .setThumbnail(guild.iconURL({ format: 'png', dynamic: true }))
            .addFields(
                { name: '📛 Sunucu Adı', value: guild.name, inline: true },
                { name: '🆔 Sunucu ID', value: guild.id, inline: true },
                { name: '👑 Sahibi', value: owner.user.tag, inline: true },
                { name: '👥 Üye Sayısı', value: `${guild.memberCount}`, inline: true },
                { name: '🔢 Roller', value: `${guild.roles.cache.size}`, inline: true },
                { name: '📁 Kanal Sayısı', value: `${guild.channels.cache.size}`, inline: true },
                { name: '📅 Oluşturulma Tarihi', value: guild.createdAt.toDateString(), inline: true },
                { name: '🌍 Bölge', value: guild.preferredLocale, inline: true }
            )
            

        // Botu ekleme butonunu oluştur
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Beni Sunucuna Ekle 🤖')
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&scope=bot&permissions=8`)
            );

        // Mesajı gönder
        await message.reply({ embeds: [embed], components: [row] });
    },
};