const { PermissionFlagsBits } = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'kick',
    description: 'Bir üyeyi sunucudan atar.',
    async execute(message, args) {
        // Komutu kullanan kişinin yetkilerini kontrol et
        if (!message.member.permissions.has(PermissionFlagsBits.KickMembers)) {
            return message.reply('Bu komutu kullanmak için gerekli izne sahip değilsiniz.');
        }

        // Komutun argümanlarını kontrol et
        if (args.length === 0) {
            return message.reply('Lütfen bir kullanıcı etiketi veya ID\'si belirtin.');
        }

        // Kullanıcıyı seç
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) {
            return message.reply('Belirtilen kullanıcı bulunamadı.');
        }

        // Botun kendisini kontrol et
        if (member.id === message.client.user.id) {
            return message.reply('Kendinizi atamazsınız!');
        }

        // Kullanıcıyı kontrol et
        if (!member.kickable) {
            return message.reply('Bu kullanıcıyı atma yetkim yok.');
        }

        // Atma işlemini yap
        try {
            const reason = args.slice(1).join(' ') || 'Sebep belirtilmemiş';
            await member.kick(reason);
            message.reply(`${member.user.tag} kullanıcısı başarıyla atıldı. Sebep: ${reason}`);
        } catch (error) {
            console.error('Kullanıcı atılırken bir hata oluştu:', error);
            message.reply('Kullanıcıyı atarken bir hata oluştu.');
        }
    },
};