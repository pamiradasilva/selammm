const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'help',
    description: 'Mevcut komutları gösterir.',
    async execute(message) {
        const helpEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Komut Listesi 📜')
            .setDescription('Aşağıdaki kategorilerden birini seçebilirsiniz:')
            .setTimestamp()
            .setFooter({ text: 'Yardım Komutu', iconURL: message.client.user.displayAvatarURL() });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('moderasyon_help')
                    .setLabel('Moderasyon')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('owner_help')
                    .setLabel('Sahip')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('bot_help')
                    .setLabel('Bot')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('genel_help')
                    .setLabel('Genel')
                    .setStyle(ButtonStyle.Success)
            );

        // Yardım mesajını gönder ve butonları ekle
        const sentMessage = await message.reply({ embeds: [helpEmbed], components: [row] });

        // Zaman aşımı süresi
        const TIMEOUT = 55000; // 55 saniye

        let timeout;

        // Zaman aşımı işlemi
        const timeoutFunction = () => {
            const timeoutEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Zaman Aşımı ⏳')
                .setDescription('Butonlara 55 saniye boyunca basılmadığı için butonlar devre dışı bırakıldı.')
                .setTimestamp()
                .setFooter({ text: 'Zaman Aşımı', iconURL: message.client.user.displayAvatarURL() });

            const disabledRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('moderasyon_help')
                        .setLabel('Moderasyon')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setCustomId('owner_help')
                        .setLabel('Sahip')
                        .setStyle(ButtonStyle.Danger)
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setCustomId('bot_help')
                        .setLabel('Bot')
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setCustomId('genel_help')
                        .setLabel('Genel')
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(true)
                );

            sentMessage.edit({ embeds: [timeoutEmbed], components: [disabledRow] });
        };

        // Zaman aşımını ayarla
        const resetTimeout = () => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(timeoutFunction, TIMEOUT);
        };

        resetTimeout();

        // Etkileşim geldiğinde zaman aşımını temizle ve butonları güncelle
        const filter = (interaction) => interaction.isButton();
        const collector = sentMessage.createMessageComponentCollector({ filter, time: TIMEOUT });

        collector.on('collect', async (interaction) => {
            resetTimeout(); // Zaman aşımını sıfırla

            let categoryEmbed;

            switch (interaction.customId) {
                case 'moderasyon_help':
                    categoryEmbed = new EmbedBuilder()
                        .setColor('#0099ff')
                        .setTitle('Moderasyon Komutları ⚔️')
                        .setDescription('Aşağıdaki komutları kullanabilirsiniz:')
                        .addFields(
                            { name: '.kick', value: 'Bir kullanıcıyı sunucudan atar.', inline: true },
                            { name: '.timeout', value: 'Kullanıcıyı belirli bir süre boyunca susturur.', inline: true },
                            { name: '.untimeout', value: 'Bir kullanıcının susturulmasını kaldırır.', inline: true },
                            { name: '.snipe', value: 'Son silinen mesajı gösterir.', inline: true }
                            // Diğer moderasyon komutlarınızı buraya ekleyin
                        )
                        .setTimestamp()
                        .setFooter({ text: 'Moderasyon Yardım', iconURL: interaction.client.user.displayAvatarURL() });
                    break;

                case 'owner_help':
                    if (interaction.user.id !== config.ownerID) {
                        return await interaction.reply({ content: 'Bu komutu kullanmak için yetkiniz yok.', ephemeral: true });
                    }

                    categoryEmbed = new EmbedBuilder()
                        .setColor('#0099ff')
                        .setTitle('Sahip Komutları 🛠️')
                        .setDescription('Aşağıdaki komutları kullanabilirsiniz:')
                        .addFields(
                            { name: '.eval', value: 'Kod çalıştırır.', inline: true },
                            { name: '.karaliste', value: 'Bir kullanıcının bota erişimini yasaklar.', inline: true },
                            { name: '.durum-kaldır', value: 'Botun durumunu kaldırır ve dosyayı temizler.', inline: true },
                            { name: '.status', value: 'Botun durumunu ve çeşitli bilgileri gösterir.', inline: true }
                            // Diğer sahip komutlarınızı buraya ekleyin
                        )
                        .setTimestamp()
                        .setFooter({ text: 'Sahip Yardım', iconURL: interaction.client.user.displayAvatarURL() });
                    break;

                case 'bot_help':
                    categoryEmbed = new EmbedBuilder()
                        .setColor('#0099ff')
                        .setTitle('Bot Komutları 🤖')
                        .setDescription('Aşağıdaki komutları kullanabilirsiniz:')
                        .addFields(
                            { name: '.ping', value: 'Botun yanıt süresini kontrol eder.', inline: true },
                            { name: '.botinfo', value: 'Bot hakkında bilgi verir.', inline: true },
                            { name: '.uptime', value: 'Botun çalışma süresini gösterir.', inline: true }
                            // Diğer bot komutlarınızı buraya ekleyin
                        )
                        .setTimestamp()
                        .setFooter({ text: 'Bot Yardım', iconURL: interaction.client.user.displayAvatarURL() });
                    break;

                case 'genel_help':
                    categoryEmbed = new EmbedBuilder()
                        .setColor('#0099ff')
                        .setTitle('Genel Komutlar 🎉')
                        .setDescription('Aşağıdaki komutları kullanabilirsiniz:')
                        .addFields(
                            { name: '.avatar', value: 'Kullanıcının avatarını gösterir.', inline: true },
                            { name: '.inek', value: 'Arkadaşınız inek yapar.', inline: true },
                            { name: '.joke', value: 'Size bir soğuk şaka yapar.', inline: true },
                            { name: '.qrcode', value: 'Bir QR kod oluşturur.', inline: true },
                            { name: '.renk', value: 'Rastgele bir renk seçer ve renk kodunu söyler.', inline: true },
                            { name: '.say', value: 'Sunucudaki üye sayısını resim formatında atar.', inline: true },
                            { name: '.sunucuinfo', value: 'Sunucu hakkında bilgi verir.', inline: true },
                            { name: '.time', value: 'Zamanı  haline getirir.', inline: true },
                            { name: '.userinfo', value: 'Kullanıcı hakkında bilgi verir.', inline: true }
                            // Diğer genel komutlarınızı buraya ekleyin
                        )
                        .setTimestamp()
                        .setFooter({ text: 'Genel Yardım', iconURL: interaction.client.user.displayAvatarURL() });
                    break;

                default:
                    return;
            }

            await interaction.update({ embeds: [categoryEmbed], components: [row] });
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                timeoutFunction();
            }
        });
    },
};