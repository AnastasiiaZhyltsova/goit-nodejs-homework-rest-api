const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require('../middleware');


const contactsSchema = new Schema( {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }, {versionKey: false, timestamps: true});
  
contactsSchema.post("save", handleSaveErrors);
 
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});
const schemas = {
  addSchema,
  updateFavoriteSchema,
}
const Contact = model("contact", contactsSchema);

module.exports = {
 schemas,
  Contact,
}