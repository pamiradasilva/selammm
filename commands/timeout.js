const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const ms = require('ms');
const config = require('../config.json');

module.exports = {
    name: 'timeout',
    description: 'Kullanıcıyı belirli bir süre boyunca susturur.',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply('Bu komutu kullanma yetkiniz yok. ⚠️');
        }

        const member = message.mentions.members.first();
        const duration = args[1];
        const reason = args.slice(2).join(' ') || 'Sebep belirtilmemiş';

        if (!member) {
            return message.reply('Lütfen bir kullanıcı belirtin. ❌');
        }

        if (!duration) {
            return message.reply('Lütfen bir süre belirtin. ❌');
        }

        const parsedDuration = ms(duration);
        if (!parsedDuration) {
            return message.reply('Geçersiz süre formatı. Örneğin: `1h`, `30m`, `10s` ⚠️');
        }

        try {
            await member.timeout(parsedDuration, reason);

            const timeoutEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('⏱️ Timeout İşlemi')
                .setDescription(`
                    **Kullanıcı:** ${member.user.tag} 👤
                    **Süre:** ${duration} ⏳
                    **Sebep:** ${reason} 📜
                `)
                .setTimestamp()
                .setFooter({ text: 'Timeout İşlemi', iconURL: message.client.user.displayAvatarURL() });

            await message.reply({ embeds: [timeoutEmbed] });
        } catch (error) {
            console.error(error);
            await message.reply('Timeout işlemi sırasında bir hata oluştu. ❌');
        }
    },
};