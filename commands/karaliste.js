const fs = require('fs');
const path = require('path');
const config = require('../config.json'); // config.json dosyasını dahil edin
const bannedUsersPath = path.join(__dirname, '../bannedUsers.json');

module.exports = {
    name: 'karaliste',
    description: 'Kullanıcıyı kara listeye ekler veya kara listeden çıkarır.',
    async execute(message, args) {
        if (message.author.id !== config.ownerID) {
            return message.reply('Bu komutu kullanmak için yetkiniz yok.');
        }

        const action = args[0];
        const userId = args[1];

        if (!action || !userId) {
            return message.reply('Lütfen "ekle" veya "kaldır" ve bir kullanıcı ID\'si girin.');
        }

        try {
            // Yasaklı kullanıcıları JSON dosyasından yükleyin
            const data = JSON.parse(fs.readFileSync(bannedUsersPath, 'utf-8'));
            const bannedUsers = data.bannedUsers;

            if (action === 'ekle') {
                // Kullanıcıyı kara listeye ekle
                if (!bannedUsers.includes(userId)) {
                    bannedUsers.push(userId);
                    fs.writeFileSync(bannedUsersPath, JSON.stringify({ bannedUsers }, null, 2), 'utf-8');
                    message.reply(`Kullanıcı ${userId} kara listeye eklendi.`);
                } else {
                    message.reply(`Kullanıcı ${userId} zaten kara listede.`);
                }
            } else if (action === 'kaldır') {
                // Kullanıcıyı kara listeden çıkar
                const index = bannedUsers.indexOf(userId);
                if (index > -1) {
                    bannedUsers.splice(index, 1);
                    fs.writeFileSync(bannedUsersPath, JSON.stringify({ bannedUsers }, null, 2), 'utf-8');
                    message.reply(`Kullanıcı ${userId} kara listeden çıkarıldı.`);
                } else {
                    message.reply(`Kullanıcı ${userId} kara listede değil.`);
                }
            } else {
                message.reply('Geçersiz eylem. Lütfen "ekle" veya "kaldır" kullanın.');
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error);
            message.reply('Bir hata oluştu. Lütfen geliştiriciye başvurun.');
        }
    },
};