const ws = require('ws').Server;
const wss = new ws({port:3004});

wss.on('connection',function (ws) {
  ws.on('message',function (message) {
    console.log('received:',message)
  })
  ws.send('i am a message sent from a ws server')
})