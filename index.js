var Botkit = require('botkit');
var http = require('http');

var controller = Botkit.slackbot({
    debug: false,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM(function(err, bot, payload) {
    if (err) {
        console.log('Error: Cannot to Slack');
        process.exit(1);
    }
});

controller.hears(['(.*)'], 'direct_message,direct_mention,mention', function (bot, message) {
    bot.replay(message, 'こんにちは');
});

// To keep Heroku's free dyno awake
http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Ok, dyno is awake.');
}).listen(process.env.PORT || 5000);
