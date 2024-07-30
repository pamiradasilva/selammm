const { EmbedBuilder } = require('discord.js');
const os = require('os');
const { version } = require('discord.js');
const { ownerID } = require('../config.json');

module.exports = {
    name: 'status',
    description: 'Bot hakkında detaylı bilgi verir ve yalnızca bot sahibinin DM\'sine gönderir.',
    async execute(message) {
        // Bot sahibinin DM'sine gönderim yapmak için kontrol
        if (message.author.id !== ownerID) {
            return message.reply('Bu komutu kullanma izniniz yok.');
        }

        // Botun bilgilerini topla
        const uptime = process.uptime();
        const memoryUsage = process.memoryUsage();
        const osInfo = {
            platform: os.platform(),
            architecture: os.arch(),
            cpus: os.cpus().length,
            totalMemory: `${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`,
            freeMemory: `${(os.freemem() / (1024 ** 3)).toFixed(2)} GB`,
            homeDir: os.homedir(),
            uptime: `${Math.floor(uptime / 3600)} saat ${Math.floor((uptime % 3600) / 60)} dakika ${Math.floor(uptime % 60)} saniye`,
        };

        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Bot Durum Bilgisi')
                .addFields(
                    { name: 'Bot Adı', value: message.client.user.username, inline: true },
                    { name: 'Bot ID', value: message.client.user.id, inline: true },
                    { name: 'Discord.js Sürümü', value: version, inline: true },
                    { name: 'Uptime', value: `${Math.floor(uptime / 3600)} saat ${Math.floor((uptime % 3600) / 60)} dakika ${Math.floor(uptime % 60)} saniye`, inline: true },
                    { name: 'Bellek Kullanımı', value: `Toplam: ${(memoryUsage.rss / (1024 ** 2)).toFixed(2)} MB\nYönetici: ${(memoryUsage.heapUsed / (1024 ** 2)).toFixed(2)} MB\nTahmin: ${(memoryUsage.heapTotal / (1024 ** 2)).toFixed(2)} MB`, inline: true },
                    { name: 'İşletim Sistemi Bilgisi', value: `Platform: ${osInfo.platform}\nMimari: ${osInfo.architecture}\nCPU Sayısı: ${osInfo.cpus}\nToplam Bellek: ${osInfo.totalMemory}\nBoş Bellek: ${osInfo.freeMemory}\nAna Klasör: ${osInfo.homeDir}\nUptime: ${osInfo.uptime}`, inline: false }
                )
                .setFooter({ text: 'Bot durumu hakkında detaylı bilgi' });

            // Bot sahibine DM gönder
            const owner = await message.client.users.fetch(ownerID);
            if (owner) {
                await owner.send({ embeds: [embed] });
                await message.reply('Bot durumu hakkında detaylı bilgi DM\'nize gönderildi. Lütfen kontrol edin.');
            } else {
                await message.reply('Bot sahibine DM gönderilemedi. Lütfen bot sahibinin DM alıp almadığını kontrol edin.');
            }
        } catch (error) {
            console.error('Bot durumu alınırken bir hata oluştu:', error);
            await message.reply('Bot durumu alınırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
    },
};