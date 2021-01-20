const { MessageEmbed } = require("discord.js");

module.exports = (client, przed, po, logikanaly) => {

    if(!przed.guild || !po.guild) {
        return;
    }

    var kontent = przed.content
    if (!przed.content) {
        kontent = `(Pusto)`
    }


if (po.author.bot || przed.author.bot) {
      return;
}
if (przed.attachments.keyArray().length === 0) {
    
    const logiembed1 = new MessageEmbed()
    .setColor(`#e76a71`)
    .setAuthor(`${przed.author.tag}`)
    .setDescription(`**Przed:**\n\`\`\`${przed.content}\`\`\`\n**Po:**\n\`\`\`${po.content}\`\`\`\nKanał: ${przed.channel} | [[Szukaj]](${przed.url})`)
    .setTimestamp();
	client.channels.cache.find(ch => ch.id === `${logikanaly.logiczatzmienione}`).send(logiembed1)
    return;
} 

const logiembed2 = new MessageEmbed()
.setColor(`#e76a71`)
.setAuthor(`${przed.author.tag}`)
.setDescription(`**Przed:**\n\`\`\`${kontent}\`\`\`\n**Po:**\n\`\`\`${po.content}\`\`\`\nKanał: ${przed.channel} | [[Szukaj]](${przed.url})`)
.setThumbnail(`${przed.attachments.find(c => c.id === `${przed.attachments.keyArray()}`).url}`)
.setTimestamp();
client.channels.cache.find(ch => ch.id === `${logikanaly.logiczatzmienione}`).send(logiembed2)
};