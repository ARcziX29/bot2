const Discord = require('discord.js');
const path = require("path");
const fs = require('fs');


module.exports = {
	name: 'cmdrest',
	aliases: ['cmdreload', 'cmdreset'],
	description: 'Resetuje Komende.',
    guildOnly: false,
    BotOwner: true,
	args: false,
	usage: `<Nazwa pliku>`,
	execute(client, message, args) {

        const komenda = args[0];
        // Check if the command exists and is valid
        if(!client.commands.has(komenda)) {
          return message.channel.send(`Nie ma takiego pliku. [**${komenda}**].js`);
        }
        // the path is relative to the *current folder*, so just ./filename.js
 
 function walk1(dir, callback) {         
    fs.readdir(dir, function(err, files) {
		if (err) throw err;
        files.forEach(function(file) {
            var filepath = path.join(dir, file);
            fs.stat(filepath, function(err,stats) {
                if (stats.isDirectory()) {
                    walk1(filepath, callback);
                } else if (stats.isFile() && file.endsWith(`${args}.js`)) {
                    let aha = `${filepath.split('komendy', 2).slice(1,2)}`
                    try {
                        delete require.cache[require.resolve(`./${aha}`)];

                        const collect = require(`./${aha}`);
                        client.commands.set(collect.name, collect);
                        message.channel.send(`Plik [**${komenda}**].js zrestartowany!`)
                    }
                    catch (err) {
                        console.error(err);
                        return message.channel.send(`Nie można zdobyć pliku. [**${komenda}**].js`);
                    }
                }
            })
        })
    })
}


walk1(`./komendy/cmds/`)
    }
};