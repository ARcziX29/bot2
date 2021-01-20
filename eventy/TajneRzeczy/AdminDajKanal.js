module.exports = async (client, przed, po) => {
	const kategoria = {
		poczekalnia: `748344961597964350`
	};
	const rola = `747542611543195648`;
	const gildia = `747542611543195648`;
	const kanaly = client.guilds.cache.find(r => r.id === gildia).channels.cache.array()
	var Sprawdz = true;

	if (po.channel === null || po.channel.type !== `voice` || po.channel.parentID !== kategoria.poczekalnia) return;
	kanaly.forEach(kanal => {
		if (kanal.name === `${po.member.id}`) return po.member.send(`**Możesz stworzyć tylko jedną aktywną sesje!**`), Sprawdz = false;
		return
	});
	if (Sprawdz === false) return;
	client.guilds.cache.find(r => r.id === gildia).channels.create(`${po.member.id}`, {
		type: `category`,
		permissionOverwrites: [
			{
				id: `${rola}`,
				allow: ['VIEW_CHANNEL']
            },
            {
				id: `${rola}`,
				deny: ['CONNECT']
			},
			{
			  id: po.member.user.id,
			  allow: ['VIEW_CHANNEL',`MOVE_MEMBERS`,'CONNECT','MUTE_MEMBERS']
		   }
		 ]
	}).then(async cat => {
		await client.guilds.cache.find(r => r.id === gildia).channels.create(`chat`, {
			type: `text`,
            parent: `${cat.id}`,
            permissionOverwrites: [
                {
                    id: `${rola}`,
                    deny: ['VIEW_CHANNEL']
                },
                {
                  id: po.member.user.id,
                  allow: ['VIEW_CHANNEL']
               }
             ]
		})
		await client.guilds.cache.find(r => r.id === gildia).channels.create(`Sesja ${po.member.user.username}'a`, {
				type: `voice`,
				userLimit: 10,
				parent: `${cat.id}`
		}).then(async r => {
            await client.guilds.cache.find(r => r.id === gildia).channels.create(`Poczekalnia`, {
                type: `voice`,
                parent: `${cat.id}`,
                permissionOverwrites: [
                    {
                        id: `${rola}`,
                        allow: ['VIEW_CHANNEL','CONNECT']
                    },
                    {
                        id: `${rola}`,
                        deny: ['SPEAK']
                    },
                    {
                        id: po.member.user.id,
                        allow: ['VIEW_CHANNEL',`MOVE_MEMBERS`]
                     }
                ]
            })
                if (po.channelID === null) return;
                await po.member.voice.setChannel(r)
		})
	})
};