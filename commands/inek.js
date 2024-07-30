const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const sharp = require('sharp');
const axios = require('axios');

module.exports = {
    name: 'inek',
    description: 'İnek fotoğrafının kafasına kullanıcı avatarını koyar.',
    async execute(message) {
        // Kullanıcıyı etiketle
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Lütfen bir kullanıcıyı etiketleyin.');
        }

        try {
            // Kullanıcının avatarını indir
            const avatarUrl = user.displayAvatarURL({ format: 'png', size: 128 });
            const avatarResponse = await axios.get(avatarUrl, { responseType: 'arraybuffer' });
            const avatarBuffer = Buffer.from(avatarResponse.data);

            // Avatarı daire şeklinde kes
            const circleAvatarBuffer = await sharp(avatarBuffer)
                .resize(128, 128)
                .composite([{
                    input: Buffer.from(
                        `<svg><circle cx="64" cy="64" r="64"/></svg>`
                    ),
                    blend: 'dest-in'
                }])
                .png()
                .toBuffer();

            // İnek fotoğrafını yükle ve avatarı yerleştir
            const cowImage = await sharp('./images/inek.jpg')
                .resize(500, 500)
                .composite([{ input: circleAvatarBuffer, top: 100, left: 350 }])
                .png()
                .toBuffer();

            // Görseli AttachmentBuilder ile oluştur
            const attachment = new AttachmentBuilder(cowImage, { name: 'cow_avatar.png' });

            // Embed oluştur
            const embed = new EmbedBuilder()
                .setTitle('Mööööö')
                .setDescription(`${user.username}  🐄`)
                .setColor('#00FF00')
                .setImage('attachment://cow_avatar.png')
                .setFooter({ text: 'sanırım aramızda cok bilmiş inek var.' });

            // Görseli ve embedi gönder
            await message.reply({ embeds: [embed], files: [attachment] });
        } catch (error) {
            console.error('İşlem sırasında bir hata oluştu:', error);
            await message.reply('İşlem sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
    },
};