const startup = require('./konfiguracja/startup.json');
const logikanaly = require('./konfiguracja/logiustawienia.json');
const fs = require('fs');
const Discord = require('discord.js');
const path = require("path");
const mysql = require('mysql');

const con = mysql.createPool({
    host: "",
    user: "",
    password: "",
    database: "",
	port: "",
	debug: false
});

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Discord.Collection();

/////////////////// Start Komend ///////////////////////////
console.log(`Ładowanie komend:`)
function walk(dir, callback) {
    fs.readdir(dir, function(err, files) {
		if (err) throw err;
        files.forEach(function(file) {
            var filepath = path.join(dir, file);
            fs.stat(filepath, function(err,stats) {
                if (stats.isDirectory()) {
                    walk(filepath, callback);
                } else if (stats.isFile() && file.endsWith('.js')) {
                    let props = require(`./${filepath}`);
                    console.log(`${props.name}: ✔ | ${filepath}`);
                    client.commands.set(props.name, props);
				}
			})
		})
	})
}
/// Katalog z komendami
walk(`./komendy/`)


/// Start Komendy ///
client.on('message', message => {
	if (!message.content.startsWith(startup.prefix)) return;

	const args = message.content.slice(startup.prefix.length).split(/ +/);
	const NazwaKomendy = args.shift().toLowerCase();	

		const komenda = client.commands.get(NazwaKomendy)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(NazwaKomendy));
	
		if (!komenda) return;


		/////////// SPRAWDZANIE WLASCICIELA ///////////
if (komenda.BotOwner && message.author.id !== `285176179126829066`) {
	return message.channel.send(`Nie masz uprawnień`);
}

		/////////// SPRAWDZANIE JEST NA TEXT CHNALE ///////////
	if (komenda.guildOnly && message.channel.type !== 'text') {
		return;
	} 

        /////////////// Sprawdza Kanal dla komend admina //////////
	if(komenda.KomendaTylkoTu && message.channel.id !== `${startup.AdminChannel}`) {
		return;
	}
     ////////// SPRAWDZANIE CZY WIADOMOSC JEST NA DM ///////////
	if (komenda.dmOnly && message.channel.type !== 'dm') {
		return;
	}

			/////////// SPRAWDZANIE ADMINA ///////////
			if(komenda.Rangi && !client.guilds.cache.get(`747542611543195648`).members.cache.get(`${message.author.id}`).roles.cache.some(r => komenda.Rangi.includes(r.id)) ) {
				return message.reply(`Nie posiadasz praw do używania tej komendy.`);
			}

		/////////// SPRAWDZANIE ARGUMENTOW ///////////
	if (komenda.args && !args.length) {
				let reply = `Zły zapis komendy.`;
		
				if (komenda.usage) {
					reply += `\nZastosowanie: \`${startup.prefix}${komenda.name} ${komenda.usage}\``;
				}
		
				return message.channel.send(reply);
			}

	try {
		komenda.execute (client, message, args, logikanaly, con);
	} catch (error) {
		console.error(error);
		message.reply('Ta komenda nie działa!');
	}
});







client.on(`message`, wiad => {
	require(`./eventy/logi/logi-czat`)(client, wiad, logikanaly)
});

client.on(`messageDelete`, wiad => {
	require(`./eventy/logi/logi-czatusuniete`)(client, wiad, logikanaly)
});

client.on(`messageUpdate`, (przed, po) => {	
	require(`./eventy/logi/logi-czatzmienione`)(client, przed, po, logikanaly)
});

client.on(`guildMemberAdd`, gracz => {	
	require(`./eventy/logi/logi-wejsc`)(client, gracz, logikanaly)
});

client.on(`guildMemberRemove`, gracz => {	
	require(`./eventy/logi/logi-wyjsc`)(client, gracz, logikanaly)
});

client.on(`guildMemberUpdate`, (przed, po) => {
	require(`./eventy/logi/logi-edycjagracza`)(client, przed, po , logikanaly)
});

// client.on(`channelCreate`, kanal => {
// 	require(`./eventy/logi/logi-kanaldodany`)(client, kanal , logikanaly)
// });

client.on(`channelDelete`, kanal => {
	require(`./eventy/logi/logi-kanalusuniety`)(client, kanal , logikanaly)
});

client.on('guildBanRemove', (gildia, user) => {
	require(`./eventy/logi/logi-unban`)(client, gildia, user , logikanaly)
});




///////////////////// ODPALENIE  EVENTY///////////////////////////////
client.on('ready',()  => {
	require(`./eventy/ready`)(client)
	require(`./eventy/staty`)(client)
});

client.on(`guildMemberAdd`, member => {
	require(`./eventy/TajneRzeczy/AdminDajRange`) (client, member)
});		

client.on(`voiceStateUpdate`, (przed, po) => {
	require(`./eventy/TajneRzeczy/AdminDajKanal`) (client, przed, po)
	require(`./eventy/TajneRzeczy/AdminDajPermis`) (client, przed, po)
	require(`./eventy/TajneRzeczy/AdminunmutPLS`) (client, przed, po)
});

client.on(`messageReactionAdd`, (reakcja, osoba) => {
	require(`./eventy/TajneRzeczy/PowiadomieniaDodaj`) (client, reakcja, osoba)
});

client.on(`messageReactionRemove`, (reakcja, osoba) => {
	require(`./eventy/TajneRzeczy/PowiadomieniaUsun`) (client, reakcja, osoba)
});
/// TESTY /// 

///////////////////// ERROR ///////////////////////////////
client.on("error", function(error){
    console.log(`Wyjebało error: \n\n${error}`);
});
////////////////////////////////////////////////////////////




client.login(startup.wsdg$352dDGasg7hjlgdDg787Dgse);


