const { MessageEmbed } = require("discord.js"); 

module.exports = async(client, gildia, user, logikanaly) => {

     const idGracz = user.id
     const NazwaGracz = user.tag

    const logi = await client.guilds.cache.find(g => g.id === `747542611543195648`).fetchAuditLogs({
        limit: 1,
        type: `MEMBER_BAN_REMOVE`
    });

    const log = logi.entries.first();
    const { executor, target } = log;

const embedms = new MessageEmbed()
.setColor(`GREEN`)
.setDescription(`**${NazwaGracz}** został odbanowany! | Przez: ${executor}`)
.setFooter(`ID: ${idGracz}`)
.setTimestamp();

client.channels.cache.find(ch => ch.id === `${logikanaly.logiunban}`).send(embedms)
};