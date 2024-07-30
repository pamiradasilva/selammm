// commands/snipe.js
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'snipe',
    description: 'Sunucudaki en son silinmiş mesajı gösterir.',
    async execute(message) {
        const snipe = message.client.snipes.get(message.guild.id);
        if (!snipe) {
            return message.reply('Bu sunucuda silinmiş bir mesaj bulunamadı.');
        }

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setAuthor({ name: snipe.author })
            .setDescription(snipe.content)
            .setFooter({ text: `Kanal: #${snipe.channel}` })
            .setTimestamp(snipe.createdAt);

        await message.reply({ embeds: [embed] });
    },
};