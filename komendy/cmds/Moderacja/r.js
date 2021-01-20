const { MessageEmbed } = require("discord.js");

const Odrzucenie = new MessageEmbed()
.setColor(`RANDOM`)
.setDescription(`**Nie ma aktywnych sesji!**`);
const Odrzucenie1 = new MessageEmbed()
.setColor(`RANDOM`)
.setDescription(`**Nie znaleziono sesji!**`);

module.exports = {
	name: 'r',
	aliases: ['R'],
    description: 'Usuwa kanal.',
    Rangi: [`747938486069231696`,`747542707810861156`],
	guildOnly: true,
	BotOwner: false,
	args: false,
	usage: `Yhm`,	
	async execute (client, message, args, logikanaly) {
        const kategoria = client.channels.cache.filter(c => c.type === `category` && !isNaN(c.name));
        if (kategoria.size === 0) return message.channel.send(Odrzucenie);
        if (args.length === 0) {
          var wszystko = ``;
          var liczba = 1;
          kategoria.forEach(arr => {
            wszystko += `> \`Sesja ${liczba}\` (${arr.name.split(``).slice(`14`,`18`).join(``)})\n\n`
            liczba = liczba + 1
          })
          const Wybor = new MessageEmbed()
          .setColor(`RANDOM`)
          .setDescription(`**Wybierz sesje do usunięcia:**\n\n${wszystko}`);
          return message.channel.send(Wybor);
        }
        const sesja = kategoria.array()[args[0] - 1]
        if (sesja === undefined) return message.channel.send(Odrzucenie1);
        sesja.children.array()[2].delete(`Test`).then(() => {
            sesja.children.array()[1].delete(`Test`).then(() => {
                sesja.children.array()[0].delete(`Test`).then(() => {
                    sesja.delete(`Test`)
                })
            })
        })
	},
};