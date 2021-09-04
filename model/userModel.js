
const mongoose = require("mongoose")
const { Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')



class userModel {
  constructor() {
    this.initSchema();
  }
  initSchema() {
    const schema = new Schema({
      storeName: {
        type: String,
        required: true,
      },
      streetAddress: {
        type: String,
        required: true
      },
      postalCode: {
        type: Number,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: ['Pending', 'Active'],
        required: true,
        default: 'Pending'
      },
      confirmationCode: {
        type: String,
        required: true,
        unique: true
      },
      preferredLanguage: {
        type: String,
        required: true
      },
      resetPasswordToken: {
        type: String
      },
      resetPasswordExpires:{
        type:Date
      }
    });
    schema.plugin(uniqueValidator)
    mongoose.model("user", schema);
  }

  getInstance() {

    return mongoose.model("user");
  }
}

module.exports = new userModel();