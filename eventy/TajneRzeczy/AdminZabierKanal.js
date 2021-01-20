module.exports = async (client, przed, po) => {
    const gildia = `747542611543195648`;
    
	if (przed.channelID === undefined || przed.channelID === null) return;
	if (po.channelID !== null || isNaN(przed.channel.parent.name) === true) return;
	if (przed.channel.members.array().length !== 0) return;
	const aha = client.guilds.cache.find(r => r.id === gildia).channels.cache.array()
	aha.forEach(async kanaly => {
		if(kanaly.parentID === przed.channel.parentID) {
			kanaly.delete()
			przed.channel.parent.delete()	
		} else
		return;
	});
	await przed.channel.parent.delete()
};