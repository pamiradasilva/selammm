const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const sharp = require('sharp'); // Sharp modülünü yükleyin

module.exports = {
    name: 'renk',
    description: 'Rastgele bir renk önerir ve rengin görselini gönderir.',
    async execute(message) {
        // Rastgele renk oluştur
        const randomColor = `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`;

        // Renk görseli oluştur
        const imageBuffer = await sharp({
            create: {
                width: 200,
                height: 200,
                channels: 4,
                background: randomColor
            }
        })
        .png()
        .toBuffer();

        // Görseli AttachmentBuilder ile oluştur
        const attachment = new AttachmentBuilder(imageBuffer, { name: 'color.png' });

        // Embed oluştur
        const embed = new EmbedBuilder()
            .setColor(randomColor)
            .setTitle('Rastgele Renk')
            .setDescription(`Renk: ${randomColor}`)
            .setImage('attachment://color.png')
            .setFooter({ text: 'Rastgele renk önerisi' });

        // Görseli ve renk bilgisini gönder
        await message.reply({ embeds: [embed], files: [attachment] });
    },
};