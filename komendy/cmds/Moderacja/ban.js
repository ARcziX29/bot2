const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'ban',
	aliases: ['BAN', 'Ban','bAN'],
	description: 'Banuje gracza.',
	guildOnly: true,
	KomendaTylkoTu: true, ///532298871645143041 Trail staff
	Rangi: [`747938486069231696`,`747542707810861156`],
	BotOwner: false,
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
		/// Ustawic kanal lsa
		const kanal = message.guild.channels.cache.find(ch => ch.id === `${logikanaly.logiban}`)
		const WiadEm = new MessageEmbed()
		.setColor(`RED`)
		.setDescription(`${Gracz}||_(${Gracz.displayName})_||  został zbanowany!\n\n**Przez** ${message.author}\n**Powód:** ${restArgs}\n`)
		.setFooter(`ID: ${Gracz.id} `)
		.setTimestamp();
			kanal.send(WiadEm)
			const WiadToGracz1 = new MessageEmbed()
			.setColor(`RANDOM`)
			.setTitle(`Witaj ${Gracz.displayName},`)
			.setDescription(`zostałeś/aś zbanowany/a z naszego serwera Discord!\n\n**Przez:** ${message.author.username}\n**Powód:** ${restArgs}\n\n[Chcesz odwołać się od bana? Napisz zgłoszenie!](https://stanlakeside.pl/forum/support/)`)
			.setFooter(`Gierczymy w Among US © 2020`, `https://i.imgur.com/TscK88b.png`);
				Gracz.send(WiadToGracz1)
			    Gracz.ban(`${restArgs}`)
			message.channel.send(`Polecenie wykonane.`)
	},
};