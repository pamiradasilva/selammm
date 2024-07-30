const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Kullanıcının avatarını gösterir. Kaliteyi butonlar aracılığıyla seçebilirsiniz.',
    async execute(message) {
        // Varsayılan kalite
        let quality = 128; // Varsayılan kalite

        // Butonları 5'erli gruplar halinde oluştur
        const qualityButtons1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('avatar_16').setLabel('16').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('avatar_32').setLabel('32').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('avatar_64').setLabel('64').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('avatar_128').setLabel('128').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('avatar_256').setLabel('256').setStyle(ButtonStyle.Primary)
            );

        const qualityButtons2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('avatar_512').setLabel('512').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('avatar_1024').setLabel('1024').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('avatar_2048').setLabel('2048').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('avatar_4096').setLabel('4096').setStyle(ButtonStyle.Primary)
            );

        // Embed oluştur
        const initialEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Avatar Kalitesi Seçin')
            .setDescription('Aşağıdaki butonlardan birini seçerek avatar kalitesini belirleyin.')
            .setTimestamp()
            .setFooter({ text: 'Avatar Kalitesi Seçimi', iconURL: message.client.user.displayAvatarURL() });

        // Yanıt olarak embed ve butonları gönder
        const sentMessage = await message.reply({ embeds: [initialEmbed], components: [qualityButtons1, qualityButtons2] });

        // Etkileşimleri toplayın
        const filter = (interaction) => interaction.isButton();
        const collector = sentMessage.createMessageComponentCollector({ filter, time: 60000 }); // 60 saniye süresi

        collector.on('collect', async (interaction) => {
            const selectedQuality = parseInt(interaction.customId.replace('avatar_', ''), 10);

            // Kullanıcının avatar URL'sini al
            const user = message.mentions.users.first() || message.author;
            const avatarURL = user.displayAvatarURL({ format: 'png', size: selectedQuality });

            // Embed oluştur
            const avatarEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`${user.username}'ın Avatarı`)
                .setImage(avatarURL)
                .setFooter({ text: `Kalite: ${selectedQuality}`, iconURL: message.client.user.displayAvatarURL() });

            // Etkileşimi yanıtla
            await interaction.update({ embeds: [avatarEmbed], components: [] }); // Butonları devre dışı bırak
        });

        collector.on('end', () => {
            // Zaman aşımı durumunda butonları devre dışı bırak
            const disabledButtons1 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder().setCustomId('avatar_16').setLabel('16').setStyle(ButtonStyle.Primary).setDisabled(true),
                    new ButtonBuilder().setCustomId('avatar_32').setLabel('32').setStyle(ButtonStyle.Primary).setDisabled(true),
                    new ButtonBuilder().setCustomId('avatar_64').setLabel('64').setStyle(ButtonStyle.Primary).setDisabled(true),
                    new ButtonBuilder().setCustomId('avatar_128').setLabel('128').setStyle(ButtonStyle.Primary).setDisabled(true),
                    new ButtonBuilder().setCustomId('avatar_256').setLabel('256').setStyle(ButtonStyle.Primary).setDisabled(true)
                );

            const disabledButtons2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder().setCustomId('avatar_512').setLabel('512').setStyle(ButtonStyle.Primary).setDisabled(true),
                    new ButtonBuilder().setCustomId('avatar_1024').setLabel('1024').setStyle(ButtonStyle.Primary).setDisabled(true),
                    new ButtonBuilder().setCustomId('avatar_2048').setLabel('2048').setStyle(ButtonStyle.Primary).setDisabled(true),
                    new ButtonBuilder().setCustomId('avatar_4096').setLabel('4096').setStyle(ButtonStyle.Primary).setDisabled(true)
                );

            sentMessage.edit({ components: [disabledButtons1, disabledButtons2] });
        });
    },
};