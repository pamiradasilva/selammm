const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');
const express = require('express');


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();
const app = express();
const port = process.env.PORT || 3000;

// Komutları yükle
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.name, command);
}

// Olayları yükle
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    client.on(event.name, (...args) => event.execute(...args, client));
}

// Bot başlatıldığında durumu yükle
const statusPath = path.join(__dirname, 'status.json');

client.once('ready', async () => {
    console.log(`Giriş başarılı! Bot adı: ${client.user.tag}`);

    // Yüklenen komutları konsola sıralı bir şekilde yazdır
    console.log('Yüklenen komutlar:');
    client.commands.forEach(command => {
        console.log(`[*] ${command.name}`);
    });

    // Durumu dosyadan yükle
    if (fs.existsSync(statusPath)) {
        const statusData = JSON.parse(fs.readFileSync(statusPath, 'utf-8'));

        // Durum ve etkinlik bilgilerini güvenli bir şekilde kontrol et
        const statusType = statusData.status || 'online';
        const activity = statusData.activity || { type: 'PLAYING', message: '' };

        try {
            await client.user.setPresence({
                status: statusType,
                activities: [{ name: activity.message, type: activity.type }],
            });
            console.log('Durum başarıyla ayarlandı.');
        } catch (error) {
            console.error('Durum ayarlanırken bir hata oluştu:', error);
        }
    }
});

app.get('/', (req, res) => {
    res.send('Bot çalışıyor!');
});

app.listen(port, () => {
    console.log(`HTTP sunucusu http://localhost:${port} adresinde çalışıyor`);
});
 
client.login(process.env.token);