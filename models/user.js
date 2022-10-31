const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require('../helpers');


const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    required: true,
  },
   verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: [true, 'Verify token is required']
  }
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  verifyEmailSchema
}

const User = model("user", userSchema);

module.exports = {
  User,
  schemas
}