const fs = require('fs');
const path = require('path');
const acceptedUsersPath = path.join(__dirname, '../acceptedUsers.json');
const { ButtonStyle } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'accept_rules') {
            const acceptedUsers = JSON.parse(fs.readFileSync(acceptedUsersPath, 'utf-8')).users || [];

            // Kullanıcının kuralları kabul ettiğini kaydedin
            if (!acceptedUsers.includes(interaction.user.id)) {
                acceptedUsers.push(interaction.user.id);
                fs.writeFileSync(acceptedUsersPath, JSON.stringify({ users: acceptedUsers }, null, 2), 'utf-8');
                await interaction.reply({ content: 'Kuralları kabul ettiğiniz için teşekkürler! Şimdi komutları kullanabilirsiniz.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Kuralları zaten kabul etmişsiniz.', ephemeral: true });
            }
        }
    },
};