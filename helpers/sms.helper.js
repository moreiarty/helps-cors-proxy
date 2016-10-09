const Telstra = require('telstra-api');

const configSms = require('../config/sms');
const CONSUMER_KEY = config.key;
const CONSUMER_SECRET = config.secret;
const SCOPE = "SMS";

const t = new Telstra(CONSUMER_KEY, CONSUMER_SECRET, SCOPE);

export function sendSMS(number, message) {
	t.sms.send(number, message);
}
