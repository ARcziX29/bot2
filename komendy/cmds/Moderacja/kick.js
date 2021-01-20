const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'kick',
	aliases: ['KICK', 'Kick','kICK'],
	description: 'Kickuje gracza.',
	guildOnly: true,
	KomendaTylkoTu: true,
	BotOwner: false,
	Rangi: [`747938486069231696`,`747542707810861156`],
	args: true,
	usage: `<@Gracz> <Powód>`,	
	execute(client, message, args, logikanaly) {
		if (args.length < 2) {
			return message.channel.send(`**Zły zapis komendy.**\nZastosowanie: \`!${this.name} ${this.usage}\``);
		}
		const Gracz = message.guild.member(message.mentions.users.first())
		if (!Gracz) {
			return message.channel.send(`**Zły zapis komendy.**\nZastosowanie: \`!${this.name} ${this.usage}\``);
		} 
		const restArgs = args.slice(1).join(` `)
		/// Kanal LSA zmienic!
		const kanal = message.guild.channels.cache.find(ch => ch.id === `${logikanaly.logikick}`)
		const WiadEm = new MessageEmbed()
		.setColor(`YELLOW`)
		.setDescription(`${Gracz}||_(${Gracz.displayName})_||  został wyrzucony!\n\n**Przez** ${message.author}\n**Powód:** ${restArgs}\n`)
		.setFooter(`ID: ${Gracz.id} `)
		.setTimestamp();
			kanal.send(WiadEm)

			const WiadToGracz1 = new MessageEmbed()
			.setColor(`RANDOM`)
			.setTitle(`Witaj ${Gracz.displayName},`)
			.setDescription(`zostałeś/aś wyrzucony/a z naszego serwera Discord.\n\n**Przez:** ${message.author.username}\n**Powód:** ${restArgs}\n`)
			.setFooter(`Gierczymy w Among US © 2020`, `https://i.imgur.com/TscK88b.png`);
			Gracz.send(WiadToGracz1)
			Gracz.kick(`${restArgs}`)
			message.channel.send(`Polecenie wykonane.`)
	},
};