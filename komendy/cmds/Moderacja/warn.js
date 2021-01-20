const { MessageEmbed } = require("discord.js");

module.exports =  {
	name: 'warn',
	aliases: ['WARN', 'Warn', 'wARN'],
	description: 'Warny',
    guildOnly: true,
	KomendaTylkoTu: true,
    BotOwner: false,
	Rangi: [`747938486069231696`,`747542707810861156`],
	args: true,
    usage: `<@Osoba> <Powod>`,
	execute (client, message, args, logikanaly, con) {

	if (args.length < 2) return message.channel.send(`**Zły zapis komendy.**\nZastosowanie: \`!${this.name} ${this.usage}\``);
	if (!args[0].startsWith(`<@`)) return message.channel.send(`**Zły zapis komendy.**\nZastosowanie: \`!${this.name} ${this.usage}\``);

	const osoba = getUserFromMention(args[0]);
	const osobaid = osoba.id
	const restArgs = args.slice(1).join(` `)

	try {
		con.getConnection(async function(err, connection) {
			if (err) throw err;
		con.query(`SELECT * FROM warny WHERE ID='${osobaid}'`, function(err, result1) {
			const emotkitak = emotki(result1)
			console.log(emotki)
			console.log(emotkitak)
			  const kanal = `749685865390932090`
	          const wiadembed1 = new MessageEmbed()
			 .setColor(`#fcb530`)
			 .setAuthor(`${osoba.user.tag} ${emotkitak}`, `https://i.imgur.com/TscK88b.png`) /// 			.setFooter(`Gierczymy w Among US © 2020`, `https://i.imgur.com/TscK88b.png`);
			 .addFields(
				{ name: 'Nadał', value: `**${message.author.username}**`},
				{ name: 'Powód', value: `\`${restArgs}\`` },
			)
	         .setFooter(`ID: ${osoba.id}`);

			if (result1.length === 0) {
				try {
					con.query(`INSERT INTO warny (ID,Powod) VALUES ('${osobaid}','${restArgs}')`, function(err, result2) {
						client.channels.cache.find(ch => ch.id === `${kanal}`).send(wiadembed1)
						message.channel.send(`Polecenie wykonane.`)
						osoba.send(`Otrzymałeś warna, zobacz kanał #ostrzeżenia`)
					})
				} catch (err) {
					console.log(err)
				}

			} else if (result1.length === 1) {
				try {
					con.query(`INSERT INTO warny (ID,Powod) VALUES ('${osobaid}','${restArgs}')`, function(err, result3) {
						client.channels.cache.find(ch => ch.id === `${kanal}`).send(wiadembed1)
						message.channel.send(`Polecenie wykonane.`)
						osoba.send(`Otrzymałeś warna, zobacz kanał #ostrzeżenia`)
					})
				} catch (err) {
					console.log(err)
				}

			} else if (result1.length === 2) {
				try {
					con.query(`INSERT INTO warny (ID,Powod) VALUES ('${osobaid}','${restArgs}')`, function(err, result4) {
						client.channels.cache.find(ch => ch.id === `${kanal}`).send(wiadembed1)
						message.channel.send(`Polecenie wykonane.`)
						osoba.send(`Zostałeś/aś zbanowany/a z naszego serwera Discord!\n\n**Przez:** ${message.author.username}\n**Powód:** Zbyt dużo ostrzeżeń.`)
						osoba.ban(`Przez: ${message.author.username} | Powód: Zbyt dużo ostrzeżeń.`)
					})
				} catch (err) {
					console.log(err)
				}
			}
			connection.release();
		})
		})




	} catch (err) {
		console.log(`Coś się rozjebało z Warnami:\n${err}`)
	}
	
	
	





    function emotki(emotka) {

		if (emotka.length === 0) {
			return emotka = `[\⚠️]`;
		} else if (emotka.length === 1) {
			return emotka = `[\⚠️\⚠️]`;
		} else if (emotka.length === 2) {
			return emotka = `[\⚠️\⚠️\⚠️]`;
		}
	}



	function getUserFromMention(mention) {
        if (!mention) return;
    
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
    
            return client.guilds.cache.get(`747542611543195648`).members.cache.get(mention);
        }
    }
	    }
    };