const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  video: {
    type: String,
  },
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = { ClientSchema, Client };
