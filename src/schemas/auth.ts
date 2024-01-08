import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^[a-zA-Z0-9]'))
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least one letter and one number',
    }),
});

export const registerSchema = Joi.object({
  fullname: Joi.string()
    .regex(/^[a-zA-Z]+ [a-zA-Z]+$/)
    .min(3)
    .max(100)
    .required(),
  gender: Joi.string().required(),
  age: Joi.number().required(),
  address: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^[a-zA-Z0-9]'))
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least one letter and one number',
    }),
});
