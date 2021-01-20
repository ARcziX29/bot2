module.exports =  {
	name: 'clear',
	aliases: ['CLEAR', 'cLEAR', 'Clear'],
	description: 'Clearuje wiadomosci.',
    guildOnly: true,
    BotOwner: false,
	Rangi: [`747938486069231696`,`747542707810861156`],
	args: true,
    usage: `<1-100>`,
	execute(client, message, args) {
        if(args.length > 1 || isNaN(args) || args[0] > 100) {
            return message.channel.send(`**Zły zapis komendy.**\nZastosowanie: \`!${this.name} ${this.usage}\``);        
        } else
            message.channel.messages.fetch()
              message.channel.bulkDelete(args[0]).then(m => {
               message.channel.send(`Czat wyczyszczony.`)
                .catch(err => {return message.channel.send(`Wiadomości starsze niż 14 dni musisz usuwać ręcznie!`);
            })        
        })
        }
    };