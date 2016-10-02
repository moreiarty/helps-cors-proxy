/**
 * Created by Shin on 28/09/2016.
 */
var config = require('./config/smtp');
var simplesmtp = require('simplesmtp');



/**
 * Send a raw email
 *
 * @param {String} from E-mail address of the sender
 * @param {String|Array} to E-mail address or a list of addresses of the receiver
 * @param {[type]} message Mime message
 */
module.exports = {

    mail: function(from, to, message, done, error) {
    var client = simplesmtp.connect(config.port, config.server, {
        secureConnection: true,
        auth: config.credentials,
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

}