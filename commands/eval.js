const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'eval',
    description: 'JavaScript kodu çalıştırır. Yalnızca bot sahibi tarafından kullanılabilir.',
    async execute(message, args) {
        if (message.author.id !== config.ownerID) {
            return message.reply('Bu komutu kullanma yetkiniz yok.');
        }

        // Kodun tamamını birleştirme
        const code = args.join(' ');

        if (!code) {
            return message.reply('Lütfen çalıştırmak için bir kod girin.');
        }

        try {
            // Kodun çalıştırılması
            let result = eval(code);

            // Kodun uzunluğu büyükse, sadece ilk 1000 karakteri göster
            if (typeof result !== 'string') {
                result = require('util').inspect(result);
            }

            // Embed oluşturma
            const evalEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Eval Sonucu')
                .addFields(
                    { name: 'Kod', value: `\`\`\`js\n${code}\n\`\`\``, inline: false },
                    { name: 'Sonuç', value: `\`\`\`js\n${result.substring(0, 1000)}\n\`\`\``, inline: false } // Sonucu kısıtla
                )
                .setTimestamp()
                .setFooter({ text: 'Eval Komutu', iconURL: message.client.user.displayAvatarURL() });

            await message.reply({ embeds: [evalEmbed] });
        } catch (error) {
            // Hata durumunda
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Eval Hatası')
                .addFields(
                    { name: 'Kod', value: `\`\`\`js\n${code}\n\`\`\``, inline: false },
                    { name: 'Hata', value: `\`\`\`js\n${error.message}\n\`\`\``, inline: false }
                )
                .setTimestamp()
                .setFooter({ text: 'Eval Komutu', iconURL: message.client.user.displayAvatarURL() });

            await message.reply({ embeds: [errorEmbed] });
        }
    },
};