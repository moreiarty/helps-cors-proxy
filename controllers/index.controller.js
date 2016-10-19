import { getWorkshops, createWorkshop } from '../helpers/db.helper';
const smtpMail = require('../jason_mail');
import { sendSMS } from '../helpers/sms.helper';
const schedule = require('node-schedule');

exports.someMethod = async (req, res) => {
  // let passedParams = {};
  // console.log(req.body);
  // for (const prop in Object.keys(req.body)) {
  //   passedParams[prop] = req.params[prop];   
  // }
  // res.send({ passedParams });
  res.send({yo:'hey'});
};

exports.createWorkshop = async (req, res) => {
  console.log('YO');
  const {
    id,
    topic,
    description,
    campusID,
    starting,
    ending,
    maximum,
    cutoff,
    creatorID,
    archiverID,
    archived,
    WorkShopSetID,
    type,
    created,
  } = req.body;

  const createdWorkshop = await createWorkshop(id, topic, description, campusID, starting, ending, maximum, cutoff, creatorID, archiverID, archived, WorkShopSetID, type, created);
  res.status(201).send({ createdWorkshop, });
};

exports.getWorkshops = async (req, res) => {
  const workshops = await getWorkshops();
  res.status(200).send({ workshops, });
};

exports.emailNotification = async (req, res) => {
  const {email, message, subject} = req.body;

  smtpMail.mail('pranavandfriends@gmail.com', email, 'subject: '+subject+'\r\n\r\n'+message,
      function() {
        console.log('sent email successfully');
      },
      function() {
        console.log('failed at sending email!');
      });
};

exports.mailReminder = async (req, res) => {
  var responseSuccess = {
    message: 'You have successfully scheduled a job bro'
  };

  var responseError = {
    message: 'You cannot execute this method without fullfilling all parameters. year, month, day, hour, minute, second required'
  };

  const {remindAt, to, subject, content } = req.body;

  if (!remindAt || !to || !subject || !content) {
    res.status(400).send(responseError);
  }

  const date = new Date(remindAt);

  schedule.scheduleJob(date, function() {
    console.log('schedule invoked!');
    smtpMail.mail('pranavandfriends@gmail.com', to, 'subject: '+subject+'\r\n\r\n'+content,
        function() {
          console.log('sent email successfully');
        },
        function() {
          console.log('failed at sending email!');
        });

    res.status(200).send(responseSuccess);
  });
};

exports.smsReminder = async (req, res) => {
  var responseSuccess = {
    message: 'You have successfully scheduled a job bro'
  };

  var responseError = {
    message: 'You cannot execute this method without fullfilling all parameters. year, month, day, hour, minute, second required'
  };

  const {remindAt, number, message } = req.body;

  if (!remindAt || !number || !message) {
    res.status(400).send(responseError);
  }

  const date = new Date(remindAt);

  schedule.scheduleJob(date, function() {
    console.log('SMS Scheduled');
    sendSMS(number, message);
  });

  res.status(200).send(responseSuccess);
};
