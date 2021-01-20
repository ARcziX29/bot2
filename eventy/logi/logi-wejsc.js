const { MessageEmbed } = require("discord.js");

module.exports = (client, gracz, logikanaly) => {

    const emb = new MessageEmbed()
.setColor(`#c2c2d6`)
.setAuthor(`Dołączył`,`https://i.imgur.com/2T34GIr.png`)
.addFields(
    { name: 'Nazwa', value: `${gracz} | ${gracz.user.tag}` },
    { name: 'ID', value: `${gracz.id}` },    
    { name: 'Data założenia', value: `${gracz.user.createdAt}` },
)
.setTimestamp();
client.channels.cache.find(ch => ch.id === `${logikanaly.logiwejsc}`).send(emb)

};