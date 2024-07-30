const { EmbedBuilder } = require('discord.js');

// 60 komik espri
const jokes = [
    "Son gülen kesin geç anlayandır.",
    "İnsanların seni ezmesine sakın izin verme. Git ehliyet al, sen onları ez...",
    "Cem uzan, üstünü örteyim.",
    "İlahi Azrail ... Sen adamı öldürürsün!",
    "Adamın biri güneşte yanmış ama ayda düz.",
    "Ben mafya babasıyım, oğlumun adı Mafya.",
    "Zenginler et, fakirler hayali et yerler.",
    "Kim vurduya gittim birazdan geleceğim.",
    "Hava korsanları uçağı kaçıracaktı ancak yapamadı çünkü uçağı kaçırdılar.",
    "Canın sıkıldıysa gevşet.",
    "Sana kıllık yapayım da kıllarını koy.",
    "Seven unutmaz ama, eight unutur.",
    "Haydi Unkapanı’na gidip birkaç kapan kuralım da un yakalarız.",
    "Sinemada 10 dakika ara dedi ama aradım aradım açan olmadı.",
    "Ben hikaye yazdım, Ebru destan.",
    "Röntgen Filmi çektiler, yakında sinemalarda.",
    "Geçen gün taksi çevirdim baktım hala dönüyor.",
    "Geçen gün geçmiş günleri aradım ama meşguldü.",
    "Bravo kazandınız, şimdi de tencere oldunuz!",
    "Kaba kuvvet uygulama, kap kırılır.",
    "Artık aynanın karşısında süslenme, git Manga'nın karşısında süslen.",
    "Geçen file çorap aldım ama zürafaya almadım.",
    "Yılanlardan korkma da yılmayanlardan kork.",
    "Sen kahve içiyorsun, Nurgül Yeşilçay.",
    "Bak karşıdaki uçak PİSTİ, bir türlü temizlemediler.",
    "Adamın biri televizyona çıkmış ama bir daha indirememişler.",
    "Funda Arar dediler hâlâ aramadı.",
    "Adamın biri güldü, saksıya koydular.",
    "Uzun lafın kısası U.L.",
    "Adamın kafası atmış bacakları da eşek.",
    "Yağmur yağmış, kar peynir!",
    "Sakla samanı, inekler aç kalsın.",
    "Dünya döner, ay köfte.",
    "Baraj denirse, akan sular durur.",
    "Bu erikson, bak başka erik yok.",
    "Ben kamyonu alayım, Leonardo da Vinci.",
    "Top ağlarda ben ağlamaz mıyım?",
    "Adamın biri güldü, bahçeye diktiler.",
    "Ben yürüyelim dedim Gerard Depardieu.",
    "Ahmet Saz çaldı. Polis hemen tutukladı.",
    "Ben ekmek yedim Will Smith.",
    "Beni ayda bir sinemaya götürme, Marsta bir sinemaya götür.",
    "Aaa siz terlemişsiniz durun size terlik getireyim.",
    "Tenya kurtları bağırsakta yaşar, bağırmasakta.",
    "Kalbinin sesini dinle güzel ise kaset yap.",
    "Çiçeğin biri solmuş diğeri ise sağ.",
    "Hey sessiz olun telefon faturasını yeni yatırdım da uyuyor şimdi uyanmasın.",
    "Nuri ölünce onu Çin'e gömsünler, nur içinde yatsın.",
    "İngilizcem yok ama tanıdığım bütün Cem'ler Türk.",
    "Dondurmayı ben yalamam ama himayalar.",
    "Sarımsağı haVanda dövmüşsün, Ha Muş'ta.",
    "Çok makbule geçmişti, şimdi de Fatma geçiyor.",
    "Yarasa yararlı bir hayvan olmasaydı ona yaramasa derlerdi.",
    "Basamakta durma! Otomatik kapı çarpar. Sonra böler, kare kökünü alır.",
    "Köstebekler, kelebekler ama ben beklemem.",
    "Bu gece seni kınadım. Çünkü kına gecesi.",
    "Bütün umutlarım suya düştü, boğulmadılar. Onlara yüzme öğretmiştim.",
    "Geçen gün arkadaşla fırında patates yedik, fırın çok sıcak gelince bahçeye çıktık.",
    "Adamın kafası atmış, bacakları da eşek.",
    "Sinüs 60, kosinüs de tutmuş."
];

module.exports = {
    name: 'joke',
    description: 'Rastgele bir espri yapar.',
    async execute(message) {
        // Rastgele bir espri seç
        const randomIndex = Math.floor(Math.random() * jokes.length);
        const randomJoke = jokes[randomIndex];

        // Embed mesajını oluştur
        const jokeEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Komik Espri 🤣')
            .setDescription(randomJoke)
            .setTimestamp()
            .setFooter({ text: 'Komik şey', iconURL: message.client.user.displayAvatarURL() });

        // Embed mesajını gönder
        await message.reply({ embeds: [jokeEmbed] });
    },
};