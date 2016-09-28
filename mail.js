/**
 * Created by Shin on 28/09/2016.
 */
var config = require('./config/smtp');
var simplesmtp = require('simplesmtp');

mail('sender@example.com', 'visualbbasic@gmail.com', 'subject: test\r\n\r\nhello world!');

/**
 * Send a raw email
 *
 * @param {String} from E-mail address of the sender
 * @param {String|Array} to E-mail address or a list of addresses of the receiver
 * @param {[type]} message Mime message
 */
function mail(from, to, message, done, error) {
    var client = simplesmtp.connect(465, 'smtp.gmail.com', {
        secureConnection: true,
        auth: config,
        debug: true
    });

    client.once('idle', function() {
        client.useEnvelope({
            from: from,
            to: [].concat(to || [])
        });
    });

    client.on('message', function() {
        client.write(message.replace(/\r?\n/g, '\r\n').replace(/^\./gm, '..'));
        client.end();
    });

    client.on('ready', function(success) {
        client.quit();
    });

    client.on('error', error);

    client.on('end', done);
}