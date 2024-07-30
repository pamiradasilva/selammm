const { EmbedBuilder } = require('discord.js');
const sharp = require('sharp');

module.exports = {
    name: 'uptime',
    description: 'Botun ne kadar süredir çalıştığını gösterir.',
    async execute(message) {
        // Botun uptime bilgisini al
        const uptimeMs = message.client.uptime;

        // Süreyi gün, saat, dakika ve saniye cinsinden hesapla
        const days = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((uptimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((uptimeMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((uptimeMs % (1000 * 60)) / 1000);

        // Sharp ile görsel oluştur
        const imageBuffer = await sharp({
            create: {
                width: 800,
                height: 300,
                channels: 4,
                background: '#282828' // Arka plan rengi koyu gri
            }
        })
        .composite([{
            input: Buffer.from(
                `<svg width="800" height="300">
                    <!-- Arka plan -->
                    <rect x="0" y="0" width="800" height="300" fill="#282828" />
                    <!-- Başlık -->
                    <text x="50%" y="50" font-size="36" text-anchor="middle" fill="#9f43bd" font-family="Arial">Bot Uptime Bilgisi</text>
                    <!-- Uptime Bilgisi -->
                    <text x="50%" y="120" font-size="28" text-anchor="middle" fill="#ffffff" font-family="Arial">Şu anda ${days} gün, ${hours} saat, ${minutes} dakika ve ${seconds} saniyedir çalışıyor.</text>
                    <!-- Alt Bilgi -->
                    <text x="50%" y="200" font-size="18" text-anchor="middle" fill="#b0b0b0" font-family="Arial">Uptime bilgisi gerçek zamanlı olarak güncellenmektedir.</text>
                    <!-- Grafik -->
                    <circle cx="100" cy="250" r="50" fill="#9f43bd" />
                    <text x="100" y="250" font-size="24" text-anchor="middle" fill="#ffffff" font-family="Arial" dy=".3em">RickBot</text>
                </svg>`
            ),
            top: 0,
            left: 0
        }])
        .png()
        .toBuffer();

        // Embed mesajını oluştur ve resmi ekle
        const uptimeEmbed = new EmbedBuilder()
            .setColor('#9f43bd')
            .setTitle('Bot Uptime Bilgisi ⏳')
            .setTimestamp()
            .setFooter({ text: 'Uptime Bilgisi', iconURL: message.client.user.displayAvatarURL() })
            .setImage('attachment://uptime.png'); // Görselin embed'e eklenmesi

        // Resmi gönder
        await message.reply({ embeds: [uptimeEmbed], files: [{ attachment: imageBuffer, name: 'uptime.png' }] });
    },
};