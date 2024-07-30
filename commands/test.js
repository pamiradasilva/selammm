const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'test',
    description: 'Test komutu, sadece bot sahibi tarafından kullanılabilir.',
    async execute(message) {
        if (message.author.id !== config.ownerID) {
            return message.reply('Bu komutu kullanma yetkiniz yok.');
        }

        // Test mesajını ve butonu oluştur
        const testMessage = await message.reply({
            content: 'Test edildi',
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('testingButton')
                            .setLabel('Butona Tıkla')
                            .setStyle(ButtonStyle.Primary)
                    )
            ]
        });

        // Buton tıklama olayını işlemek için collector ekleyelim
        const filter = (interaction) => interaction.customId === 'testingButton' && interaction.user.id === config.ownerID;
        const collector = testMessage.createMessageComponentCollector({ filter, time: 60000 }); // 60 saniye süresince geçerli

        collector.on('collect', async (interaction) => {
            await interaction.update({ content: 'Testing', components: [] }); // Mesajı güncelle ve butonu kaldır
        });

        collector.on('end', collected => {
            console.log(`Buton kolektör tamamlandı. Toplam ${collected.size} etkileşim toplandı.`);
        });
    },
};