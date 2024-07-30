// commands/say.js
const { AttachmentBuilder } = require('discord.js');
const sharp = require('sharp');
const axios = require('axios');

module.exports = {
    name: 'say',
    description: 'Sunucu üye sayısını güzel bir font ile resmin üzerine yazar.',
    async execute(message) {
        // Sunucudaki üye sayısını al
        const memberCount = message.guild.memberCount;

        // Üzerine yazı yazılacak boş bir resim oluştur
        const width = 800;
        const height = 200;
        const backgroundColor = { r: 255, g: 255, b: 255, alpha: 0 }; // Şeffaf arka plan

        // Yazı stillerini ayarla
        const text = `Üye Sayısı: ${memberCount}`;
        const fontSize = 72;
        const fontFamily = 'Arial';
        const textColor = { r: 0, g: 0, b: 0, alpha: 1 }; // Siyah yazı rengi

        try {
            // Sharp ile resim oluştur ve yazıyı ekle
            const imageBuffer = await sharp({
                create: {
                    width: width,
                    height: height,
                    channels: 4,
                    background: backgroundColor
                }
            })
            .composite([{
                input: Buffer.from(`<svg width="${width}" height="${height}">
                    <text x="50%" y="50%" font-family="${fontFamily}" font-size="${fontSize}" fill="rgba(${textColor.r},${textColor.g},${textColor.b},${textColor.alpha})" dominant-baseline="middle" text-anchor="middle">${text}</text>
                </svg>`),
                top: 0,
                left: 0
            }])
            .png()
            .toBuffer();

            // Görseli Discord'a gönder
            const attachment = new AttachmentBuilder(imageBuffer, { name: 'memberCount.png' });
            await message.reply({ files: [attachment] });
        } catch (error) {
            console.error('Resim oluşturulurken bir hata oluştu:', error);
            await message.reply('Resim oluşturulurken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
    },
};