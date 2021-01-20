        module.exports = async (client, przed, po) => {
        const gildia = `747542611543195648`;
        const kanaly = await client.guilds.cache.find(r => r.id === gildia).channels.cache.array()
        
        if (po.channelID === null || po.channelID === undefined || !po.channel.name.startsWith(`Sesja`)) {
            if (przed.channel === null || przed.channel === undefined) return;
            if (przed.channel.name === `Poczekalnia`) return;
            if (przed.channel.parent.name === `${po.member.id}`) return;
            var kanalkody = ``;
             kanaly.forEach(k => {
                if (k.parentID !== przed.channel.parentID || k.name !== `chat`) return;
                return kanalkody = k;
            });
            if (kanalkody === ``) return;
            await kanalkody.createOverwrite(po.member.id, {
                VIEW_CHANNEL: false
              })
        } else if (po.channelID !== null || po.channelID !== undefined) {
            if (!po.channel.name.startsWith(`Sesja`)) return;
            if (po.channel.parent.name === `${po.member.id}`) return;
            var kanalkody1 = ``;
            kanaly.forEach(k1 => {
                if (k1.parentID !== po.channel.parentID || k1.name !== `chat`) return;
                return kanalkody1 = k1;
            });
            if (kanalkody1 === ``) return;
            await kanalkody1.createOverwrite(po.member.id, {
                VIEW_CHANNEL: true
              })
            }
    };