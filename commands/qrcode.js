const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const QRCode = require('qrcode');

module.exports = {
    name: 'qr',
    description: 'Girilen metni QR koduna dönüştürür.',
    async execute(message, args) {
        if (args.length === 0) {
            return message.reply('Lütfen bir metin veya URL girin.');
        }

        const text = args.join(' ');

        try {
            // QR kodunu oluştur
            const qrCodeBuffer = await QRCode.toBuffer(text);

            // Görseli attachment olarak oluştur
            const attachment = new AttachmentBuilder(qrCodeBuffer, { name: 'qr-code.png' });

            // Embed oluştur
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('QR Kod')
                .setDescription(`Aşağıda ${text} metninin QR kodu bulunmaktadır.`)
                .setImage('attachment://qr-code.png');

            // Görseli ve açıklamayı gönder
            await message.reply({ embeds: [embed], files: [attachment] });
        } catch (error) {
            console.error('QR kodu oluşturulurken bir hata oluştu:', error);
            await message.reply('QR kodu oluşturulurken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
    },
};