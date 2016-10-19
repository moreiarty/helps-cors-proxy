import { getWorkshops, createWorkshop } from '../helpers/db.helper';
const smtpMail = require('../jason_mail');

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
