const { MessageEmbed } = require("discord.js");

module.exports =  {
	name: 'testmsg',
	aliases: ['tmg', 'mg', 'msg'],
	description: 'TestMG',
    guildOnly: true,
    BotOwner: true,
	args: false,
    usage: `----`,
	execute(client, message, args) {

        const a = new MessageEmbed()
        .setColor(`RED`)
        .setDescription(`Zareaguj <:PL_crew:760250251486429217> aby otrzymywać powiadomienia w kategorii \`Szukam Osób\`\n**[Przed dodaniem reakcji przeczytaj #regulamin-szukania](https://discordapp.com/channels/747542611543195648/752172638553505913/752173742561558698)**`)

        message.channel.send(a).then(m => {
            m.react(`760250251486429217`)
        });

        }
    };