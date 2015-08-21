var Hapi = require('hapi');
var Inert = require('inert');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: Number(process.argv[2] || 8000)
});

server.register(Inert, function (err) {
    if (err) throw err;
});

// Add the route
server.route({
    method: 'GET',
    path:'/foo/bar/{baz}/{filename}', /// the first few parameters do not indicate the directory, it is just indicatory of your route
    handler: {
        directory: {
            path: './public'
        }
    }
});

// Start the server
server.start(function() {
     console.log('Server running at:', server.info.uri);
});

// had to put in a empty line at the end of index.html to make the program pass
