const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'm',
	aliases: ['M'],
	description: 'Mutuje graczy na kanale.',
	guildOnly: true,
	BotOwner: false,
	args: true,
	usage: `**1 - włączony\n0 - wyłączony**`,	
	async execute (client, message, args, logikanaly) {
		const id = `${message.author.id}`;
		const kategoria = message.guild.channels.cache.find(r => r.name === `${id}`)
		if (!kategoria) return message.channel.send(`>>> Nie posiadasz aktywnej sesji.`);
		const kanal = message.guild.channels.cache.find(r => r.name.startsWith(`Sesja`) && r.parentID === `${kategoria.id}`)
		if (args.length > 1 || args[0] > 1) return message.channel.send(this.usage);
		if (kanal.members.array().length === 0) return message.channel.send(`>>> Nie ma graczy na twojej sesji.`);
		if (args[0] === `1`) {
		await kanal.members.forEach(mem => {
			mem.voice.setMute(mute = true, `Ok`)
		});
		await message.channel.send(`>>> Zmutowano graczy.`)
		} else if (args[0] === `0`) {
		await kanal.members.forEach(mem => {
			mem.voice.setMute(mute = false, `Ok`)
		});
		await message.channel.send(`>>> Odmutowano graczy.`)
		}
	},
};