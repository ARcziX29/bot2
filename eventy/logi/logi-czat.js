const { MessageEmbed } = require("discord.js");

module.exports = (client, wiad, logikanaly) => {

    if(!wiad.guild) {
        return;
    }

    var kontent = wiad.content
    if (!wiad.content) {
        kontent = `(Pusto)`
    }

if (wiad.author.bot) {
      return;
}
if (wiad.attachments.keyArray().length === 0) {
    
    const logiembed1 = new MessageEmbed()
    .setColor(`#c2c28f`)
    .setAuthor(`${wiad.author.tag}`)
    .setDescription(`\`\`\`${wiad.content}\`\`\`\nKanał: ${wiad.channel} | [[Szukaj]](${wiad.url})`)
    .setTimestamp();
	client.channels.cache.find(ch => ch.id === `${logikanaly.logiczat}`).send(logiembed1)
    return;
} 

const logiembed2 = new MessageEmbed()
.setColor(`#c2c28f`)
.setAuthor(`${wiad.author.tag}`)
.setDescription(`\`\`\`${kontent}\`\`\`\nKanał: ${wiad.channel} | [[Szukaj]](${wiad.url})`)
.setThumbnail(`${wiad.attachments.find(c => c.id === `${wiad.attachments.keyArray()}`).url}`)
.setTimestamp();
client.channels.cache.find(ch => ch.id === `${logikanaly.logiczat}`).send(logiembed2)
};