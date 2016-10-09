import { getWorkshops } from '../helpers/db.helper';

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
  // let passedParams = {};
  // console.log(req.body);
  // for (const prop in Object.keys(req.body)) {
  //   passedParams[prop] = req.params[prop];   
  // }
  // res.send({ passedParams });
  res.send({yo:'hey'});
};

exports.getWorkshops = async (req, res) => {
  const workshops = await getWorkshops();
  res.status(200).send({ workshops, });
};