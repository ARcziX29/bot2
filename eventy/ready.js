module.exports = (client) => {
     client.user.setPresence({
          activity: {
               name: 'Załoge',
               type: 'WATCHING'
           }, 
           status: 'dnd' });
     console.log(`=====================`)
     console.log(`AUS X = ACTIVATED`)

};