const { MessageEmbed } = require("discord.js");

module.exports = async (client, przed, po, logikanaly) => {
	
	if(przed.user.bot || po.user.bot) {
		return;
	}

	const ID = przed.id
	var ImiePrzed = przed.nickname
	const ImiePo = po
	const Imieprzedp = po.user.username
	var ImiePoDisp = po.nickname
	const RolePrzed = przed.roles.cache.array().join(`︱`).replace('@everyone', `@Gildia`)
	const RolePo = po.roles.cache.array().join(`︱`).replace('@everyone', `@Gildia`)

   if(ImiePrzed === null) {
	   ImiePrzed = `Brak`
   }

   if(ImiePoDisp === null) {
	ImiePoDisp = `Brak`
   }

    const logi = await przed.guild.fetchAuditLogs({
        limit: 10,
        type: `MEMBER_ROLES_UPDATE`
	});

	const log = await logi.entries.first();
	const { executor, target } = await log;

   if(przed.roles.cache.array().join(`,`) !== po.roles.cache.array().join(`,`)) {
 //////////////////// Sprawdza zmiane rol
	const emb = new MessageEmbed()
	.setColor(`#89cff0`)
	.setTitle(`📝Edytowano Gracza`)
	.addFields(
	    { name: 'Nazwa', value: `**${Imieprzedp}** (_${ImiePrzed}_)`, inline: true },
		{ name: 'Role', value: `${RolePrzed}`, inline: true },
		{ name: '\u200B', value: '\u200B', inline: false },
		{ name: 'Nazwa', value: `>>> ${ImiePo} (_${ImiePoDisp}_)`, inline: true },
		{ name: 'Role', value: `>>> ${RolePo}`, inline: true },
	)
	.setFooter(`ID: ${ID} • Edytował: ${executor.tag} `)
	.setTimestamp();
	
	return client.channels.cache.find(ch => ch.id === `${logikanaly.logigraczedytowany}`).send(emb);

} if(po.displayName !== `${przed.displayName}`) {
 //////////////////// Sprawdza zmiane rol
 const emb1 = new MessageEmbed()
 .setColor(`#89cff0`)
 .setTitle(`📝Edytowano Gracza`)
 .addFields(
	 { name: 'Nazwa', value: `**${Imieprzedp}** (_${ImiePrzed}_)`, inline: true },
	 { name: 'Role', value: `${RolePrzed}`, inline: true },
	 { name: '\u200B', value: '\u200B', inline: false },
	 { name: 'Nazwa', value: `>>> ${ImiePo} (_${ImiePoDisp}_)`, inline: true },
	 { name: 'Role', value: `>>> ${RolePo}`, inline: true },
 )
 .setFooter(`ID: ${ID} • Edytował: ${executor.tag} `)
 .setTimestamp();
 
 return client.channels.cache.find(ch => ch.id === `${logikanaly.logigraczedytowany}`).send(emb1);

 }
};