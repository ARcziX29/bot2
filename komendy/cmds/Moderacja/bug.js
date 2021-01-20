const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const WebhookBug = new Discord.WebhookClient(`749825616198631545`, `eWgdkNZTKuAMcJ7afmX6aMxPLPcj-h1frvM9a81_3NcLCHBfRyHKgmaG-njUNe9Xh1-s`)

module.exports =  {
	name: 'bug',
	aliases: ['Bug', 'bUG', 'BUG'],
	description: 'Wysyła zgłoszony błąd.',
    dmOnly: true,
    BotOwner: false,
    Rangi: [`747542757094195204`],
    args: false,
    execute(client, message) {
        const embed1 = new MessageEmbed()
        .setTitle(`Napisz nagłówek`)
        .setDescription(`Masz 2min na napisanie.`)
        .setColor(`#36393f`);
    
    const embed1if = new MessageEmbed()
        .setTitle(`Czas minął! [Wpisz komende jeszcze raz]`)
        .setColor(`#ebba1a`);
    
    message.channel.send(embed1).then(() => {
        message.channel.awaitMessages(response1 => response1.content, {
                max: 1,
                time: 120000,
                errors: ['time'],
            })
            .then((zdobyte1) => {
    
                const embed2 = new MessageEmbed()
                    .setTitle(`Napisz treść`)
                    .setDescription(`Masz 2min na napisanie.`)
                    .setColor(`#36393f`);

                message.channel.send(embed2).then(() => {
                        message.channel.awaitMessages(response2 => response2.content, {
                                max: 1,
                                time: 120000,
                                errors: ['time'],
                            })
                            .then((zdobyte2) => {
                                const Final = new MessageEmbed()
                                    .setTitle(`${zdobyte1.first().content}`)
                                    .setDescription(`\`${zdobyte2.first().content}\``)
                                    .setFooter(`NICK: ${message.author.tag} • ID: ${message.author.id}`)
                                    .setColor(`#ebba1a`);
                                WebhookBug.send('', {
                                    embeds: [Final],
                                })
                                message.channel.send(`>>> Wysłane.`)
                            })
                    })
                    .catch(() => {
                        message.channel.send(embed1if)
                    })
            })
            .catch(() => {
                message.channel.send(embed1if)
            })
    })
    }
    };