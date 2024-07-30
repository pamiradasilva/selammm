const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const acceptedUsersPath = path.join(__dirname, '../acceptedUsers.json');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const rulesMessage = "Lütfen botun kurallarını dikkatlice okuyun ve kabul edin:\n\n1. **Kurallara Uyun:** Botun kullanım politikalarına ve sunucu kurallarına uyun.\n2. **Spam Yapmayın:** Botu spam mesajlar, aşırı komut kullanımı veya rahatsız edici davranışlar için kullanmayın.\n3. **Yetkileri İhlal Etmeyin:** Botun verdiği yetkileri kötüye kullanmayın. Yetkileri yalnızca gerekli olduğunda kullanın.\n4. **Kişisel Bilgileri Paylaşmayın:** Bot üzerinden kişisel bilgilerinizi veya başkalarının kişisel bilgilerini paylaşmayın.\n5. **Kötü Niyetli İçerik Yaymayın:** Botu, zararlı, yasadışı veya hakaret içeren içerikler için kullanmayın.\n6. **Geri Bildirim Verin:** Botla ilgili yaşadığınız sorunları veya geri bildirimleri geliştiriciye iletin. Botun performansını artırmak için önerilerinizi dikkate alırız.\n7. **Kuralların Güncellenmesi:** Kurallar zaman zaman güncellenebilir. Güncellemeleri takip etmek ve kuralları tekrar gözden geçirmek sizin sorumluluğunuzdadır.\n\n**Kuralları kabul etmek için aşağıdaki butona tıklayın.**";

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;

        // Eğer mesaj komut değilse işlem yapma
        if (!message.content.startsWith(config.prefix)) return;

        // Yasaklı kullanıcıları JSON dosyasından yükleyin
        const bannedUsers = JSON.parse(fs.readFileSync(path.join(__dirname, '../bannedUsers.json'), 'utf-8')).bannedUsers;
        const acceptedUsers = JSON.parse(fs.readFileSync(acceptedUsersPath, 'utf-8')).users || [];

        // Kullanıcının yasaklı olup olmadığını kontrol edin
        if (bannedUsers.includes(message.author.id)) {
            return message.reply('Bu botu kullanma yetkiniz yok.');
        }

        // Kuralları kabul etmemişse kuralları gönder
        if (!acceptedUsers.includes(message.author.id)) {
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('accept_rules')
                        .setLabel('Kuralları Kabul Ediyorum')
                        .setStyle(ButtonStyle.Primary)
                );

            await message.reply({ content: rulesMessage, components: [row] });
            return; // Komut işleme kısmına geçmeyin
        }

        // Komutları işleme
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        if (command) {
            try {
                await command.execute(message, args);
            } catch (error) {
                console.error('Komut çalıştırılırken bir hata oluştu:', error);
                await message.reply("Err 404 lütfen geliştiricime başvurun ayrıca izinlerimi kontrol edebilirsin");
            }
        }
    },
};