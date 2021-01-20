module.exports = async (client, reakcja, gracz) => {
    const emojiname = `PL_crew`;
    const idkanal = `754670018850979871`;
    const rolaid = `760258022520913921`;
    const gildiaid = `747542611543195648`;

    if (gracz.bot || reakcja.emoji.name !== emojiname || reakcja.message.channel.id !== idkanal) return;

    client.guilds.cache.find(g => g.id === gildiaid).members.cache.find(m => m.id === gracz.id).roles.add(rolaid)
};