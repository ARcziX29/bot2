const { MessageEmbed } = require("discord.js");

module.exports = async (client, kanal, logikanaly) => {

    const logi = await kanal.client.guilds.cache.find(g => g.id === `747542611543195648`).fetchAuditLogs({
        limit: 1,
        type: `CHANNEL_DELETE`
    });
    
    const log = logi.entries.first();
    const { executor, target } = log;
    
     const nazwakanalu = kanal.name
     const idkanalu = kanal.id

 const embedm = new MessageEmbed()
 .setColor(`#C97F7F`)
 .setTitle(`${executor.tag}`)
 .setDescription(`Usunął kanał: **\`${nazwakanalu}\`**`)
 .setFooter(`ID: ${idkanalu} `)
 .setTimestamp();

 client.channels.cache.find(ch => ch.id === `${logikanaly.logikanalusuniety}`).send(embedm)

};