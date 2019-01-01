const child = require('child_process').fork('worker.js');

// Open up the server object and send the handle.
const server = require('net').createServer();
server.on('connection', (socket) => {
    socket.end('handled by parent');
});
server.listen(80, () => {
    child.send('server', server);
});