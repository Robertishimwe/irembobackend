import Joi from 'joi';

const registrationSchema = Joi.object({
  firstName: Joi.string()
    .empty()
    .min(3)
    .max(20)
    .pattern(/^[a-zA-Z]/)
    .messages({
      'any.required': '{{#label}} field is required',
      'string.base': '{{#label}} must be of type string',
      'string.empty': '{{#label}} can not be empty',
      'string.pattern.base':
        '{{#label}} must contain only characters from a to z.',
    }),
  lastName: Joi.string()
    .empty()
    .min(3)
    .max(20)
    .pattern(/^[a-zA-Z]/)
    .messages({
      'any.required': '{{#label}} field is required',
      'string.base': '{{#label}} must be of type string',
      'string.empty': '{{#label}} can not be empty',
      'string.pattern.base':
        '{{#label}} must contain only characters from a to z.',
    }),
  gender: Joi.string()
    .valid("MALE", "FEMALE")
    .messages({
      'any.required': '{{#label}} field is required',
      'any.only': '{{#label}} must be either male, female or other',
      'string.base': '{{#label}} must be of type string',
    }),
  email: Joi.string().required().email(),
  password: Joi.string()
    .required()
    .empty()
    .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#*&]+)[\w@#*&]{8,}$/)
    .messages({
      'any.required': '{{#label}} field is required',
      'string.base': '{{#label}} must be of type string',
      'string.empty': '{{#label}} can not be empty',
      'string.pattern.base':
        '{{#label}} must contain at least a number, a special character, an upper-case letter and longer than 8 characters',
    }),
  dateOfBirth: Joi.required()
    .messages({
      'any.required': '{{#label}} field is required',
      'date.base': '{{#label}} must be a valid date in ISO format (YYYY-MM-DD)',
      'date.format': '{{#label}} must be a valid date in ISO format (YYYY-MM-DD)',
      'date.max': '{{#label}} must be a date before or equal to today',
    }),
});




const loginSchema = Joi.object({

  email: Joi.string().required().email(),
  password: Joi.string()
    .required()
    .empty()
    .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#*&]+)[\w@#*&]{8,}$/)
    .messages({
      'any.required': '{{#label}} field is required',
      'string.base': '{{#label}} must be of type string',
      'string.empty': '{{#label}} can not be empty',
      'string.pattern.base':
        '{{#label}} must contain at least a number, a special character, an upper-case letter and longer than 8 characters',
    }),
});



  
  class AuthValidation {
    static verifyUserData = (req, res, next) => {
      const { error } = registrationSchema.validate(req.body);
      if (error) {
        return res.status(422).json({
          error: error.details[0].message.replace(/["'`]+/g, ''),
        });
      }
      next();
    };

    static loginDataValidation = (req, res, next) => {
      const { error } = loginSchema.validate(req.body);
      if (error) {
        return res.status(422).json({
          error: error.details[0].message.replace(/["'`]+/g, ''),
        });
      }
      next();
    };
    
}

export default AuthValidation;  

 