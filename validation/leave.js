const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.reason = !isEmpty(data.reason) ? data.reason : '';
  data.leaveType = !isEmpty(data.leaveType) ? data.leaveType : '';
  data.nameOfActor = !isEmpty(data.nameOfActor) ? data.nameOfActor : '';
  data.actorEmail = !isEmpty(data.actorEmail) ? data.actorEmail : '';

  data.location = !isEmpty(data.location) ? data.location : '';



  

  if (Validator.isEmpty(data.reason)) {
    errors.reason = 'Reason field is required';
  }

  if (Validator.isEmpty(data.nameOfActor)) {
    errors.nameOfActor = 'nameOfActor field is required';
  }

  if (Validator.isEmpty(data.leaveType)) {
    errors.leaveType = 'Leave Type is required';
  }

  if (Validator.isEmpty(data.actorEmail)) {
    errors.actorEmail = 'Actor email is required';
  }
  if (!Validator.isEmail(data.actorEmail)) {
    errors.actorEmail = 'Email is invalid';
  }

  // if (Validator.isEmpty(data.location)) {
  //   errors.location = 'location is required';
  // }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};