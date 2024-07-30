// events/messageDelete.js
const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageDelete,
    async execute(message) {
        if (message.partial) {
            try {
                await message.fetch();
            } catch (error) {
                console.error('Mesaj alınamadı:', error);
                return;
            }
        }

        // Sunucu ID'sine göre silinen mesajı kaydedin
        message.client.snipes.set(message.guild.id, {
            content: message.content,
            author: message.author.tag,
            channel: message.channel.name,
            createdAt: message.createdAt
        });
    },
};