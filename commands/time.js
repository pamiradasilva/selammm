const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'time',
    description: 'Belirtilen tarih ve saati zaman damgası formatında gösterir.',
    async execute(message, args) {
        if (args.length < 3) {
            return message.reply('Lütfen geçerli bir tarih ve saat formatı girin: `.time YYYY MM DD HH:mm`');
        }

        const [year, month, day, time] = args;
        const date = new Date(`${year}-${month}-${day}T${time}:00Z`);

        if (isNaN(date.getTime())) {
            return message.reply('Geçersiz tarih ve saat formatı. Lütfen `YYYY MM DD HH:mm` formatını kullanın.');
        }

        // UNIX zaman damgasına dönüştürme
        const timestamp = Math.floor(date.getTime() / 1000);

        // Zaman damgası emojisi
        const timestampEmoji = `<t:${timestamp}:F>`;

        // Embed oluşturma
        const timeEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Zaman Damgası')
            .setDescription(`**Tarih ve Saat:** ${timestampEmoji}`)
            .setTimestamp()
            .setFooter({ text: 'Zaman Damgası', iconURL: message.client.user.displayAvatarURL() });

        await message.reply({ embeds: [timeEmbed] });
    },
};