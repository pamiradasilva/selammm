const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Botun yanıt süresini ölçer.',
    async execute(message) {
        const msg = await message.reply('Pinging...');

        // Botun yanıt süresini hesapla
        const latency = msg.createdTimestamp - message.createdTimestamp;

        // Botun API yanıt süresini al
        const apiLatency = message.client.ws.ping;

        // Embed mesajını oluştur
        const pingEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Ping Bilgisi 📶')
            .setDescription(`**Mesaj Yanıt Süresi:** ${latency}ms\n**API Yanıt Süresi:** ${apiLatency}ms`)
            .setTimestamp()
            .setFooter({ text: 'Ping Bilgisi', iconURL: message.client.user.displayAvatarURL() });

        // Embed mesajını güncelle
        await msg.edit({ content: 'Pong!', embeds: [pingEmbed] });
    },
};