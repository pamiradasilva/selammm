const fs = require('fs');
const path = require('path');
const { ActivityType, PermissionFlagsBits } = require('discord.js');
const statusPath = path.join(__dirname, '../status.json');
const config = require('../config.json');

module.exports = {
    name: 'durum',
    description: 'Botun durumunu ayarlar ve bu durumu kaydeder.',
    async execute(message, args) {
        // Bot sahibinin olup olmadığını kontrol et
        if (message.author.id !== config.ownerID) {
            return message.reply('Bu komutu kullanma izniniz yok.');
        }

        if (args.length < 2) {
            return message.reply('Kullanım: `.durum <online/dnd> <oynuyor/izliyor/yarışıyor> <durum mesajı>`');
        }

        const status = args[0].toLowerCase();
        const activityType = args[1].toLowerCase();
        const activityMessage = args.slice(2).join(' ') || '';

        let statusType;
        if (status === 'online') {
            statusType = 'online';
        } else if (status === 'dnd') {
            statusType = 'dnd';
        } else if (status === 'invisible') {
            statusType = 'invisible';
        } else if (status === 'idle') {
            statusType = 'idle';
        } else {
            return message.reply('Geçersiz durum türü. Kullanılabilir durum türleri: online, dnd, invisible, idle.');
        }

        let activity;
        switch (activityType) {
            case 'oynuyor':
                activity = ActivityType.Playing;
                break;
            case 'dinliyor':
                activity = ActivityType.Listening;
                break;
            case 'izliyor':
                activity = ActivityType.Watching;
                break;
            case 'yarışıyor':
                activity = ActivityType.Competing;
                break;
            default:
                return message.reply('Geçersiz etkinlik türü. Kullanılabilir etkinlik türleri: oynuyor, izliyor, yarışıyor, dinliyor. ');
        }

        try {
            await message.client.user.setPresence({
                status: statusType,
                activities: [{ name: activityMessage, type: activity }],
            });

            // Durumu dosyaya kaydet
            fs.writeFileSync(statusPath, JSON.stringify({ status: statusType, activity: { type: activity, message: activityMessage } }, null, 2));

            await message.reply(`Botun durumu "${statusType}" ve etkinliği "${activityType}: ${activityMessage}" olarak ayarlandı.`);
        } catch (error) {
            console.error('Durum ayarlanırken bir hata oluştu:', error);
            await message.reply('Durum ayarlanırken bir hata oluştu.');
        }
    },
};