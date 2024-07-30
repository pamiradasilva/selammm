const fs = require('fs');
const path = require('path');
const { PermissionFlagsBits } = require('discord.js');
const statusPath = path.join(__dirname, '../status.json');
const config = require('../config.json');

module.exports = {
    name: 'durum-kaldir',
    description: 'Botun durumunu kaldırır ve dosyayı temizler.',
    async execute(message) {
        // Bot sahibinin olup olmadığını kontrol et
        if (message.author.id !== config.ownerID) {
            return message.reply('Bu komutu kullanma izniniz yok.');
        }

        try {
            // Botun durumunu kaldır ve aktiviteleri temizle
            await message.client.user.setPresence({
                status: 'online',
                activities: [],
            });

            // Durumu dosyadan kaldır
            if (fs.existsSync(statusPath)) {
                fs.unlinkSync(statusPath);
            }

            await message.reply('Botun durumu kaldırıldı.');
        } catch (error) {
            console.error('Durum kaldırılırken bir hata oluştu:', error);
            await message.reply('Durum kaldırılırken bir hata oluştu.');
        }
    },
};