const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Destination name is required'],
    unique: true,
    trim: true
  },
  pays: {
    type: String,
    required: [true, 'Country is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  climate: {
    type: String,
    enum: ['tropical', 'aride', 'mediterraneen', 'continental', 'polaire', 'tempere', 'autre'],
    default: 'autre'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Destination', destinationSchema);
