module.exports = (client) => {
    setInterval(() => {
        const gildia = `747542611543195648`;
        const kanaly = {
            jeden: `748291678246273185`,
            dwa: `748291752607088721`,
            trzy: `752035015868547124`
        }
        const wszcygracze = client.guilds.cache.find(g => g.id === gildia)
        var GraczOnline = wszcygracze.members.cache.filter(m => m.presence.status === 'online').size
        var GraczDND = wszcygracze.members.cache.filter(m => m.presence.status === 'idle').size
        var GraczZaraW = wszcygracze.members.cache.filter(m => m.presence.status === 'dnd').size
        var Sesje = wszcygracze.channels.cache.filter(m => !isNaN(m.name) && m.type === `category`).size
        var WszyscyOnline = GraczOnline + GraczDND + GraczZaraW

            wszcygracze.channels.cache.find(ch => ch.id === kanaly.jeden).setName(`Online: ${WszyscyOnline}`)
            wszcygracze.channels.cache.find(ch1 => ch1.id === kanaly.trzy).setName(`Wszyscy: ${wszcygracze.memberCount}`)
            wszcygracze.channels.cache.find(ch1 => ch1.id === kanaly.dwa).setName(`Aktywne Sesje: ${Sesje}`)
    }, 60000)
};