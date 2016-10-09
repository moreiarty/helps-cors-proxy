const Telstra = require('telstra-api');

const configSms = require('../config/sms');
const CONSUMER_KEY = configSms.key;
const CONSUMER_SECRET = configSms.secret;
const SCOPE = "SMS";

const t = new Telstra(CONSUMER_KEY, CONSUMER_SECRET, SCOPE);

export function sendSMS(number, message) {
	t.sms.send(number, message);
}
