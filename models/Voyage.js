const mongoose = require('mongoose');

const voyageSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: [true, 'Voyage title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  prix: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  duree: {
    type: Number,
    default: 0,
    min: [0, 'Duration cannot be negative']
  },
  dateDepart: {
    type: Date,
    required: [true, 'Departure date is required']
  },
  dateRetour: {
    type: Date,
    default: null
  },
  placesDisponibles: {
    type: Number,
    default: 0,
    min: [0, 'Available seats cannot be negative']
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: [true, 'Destination is required']
  }
}, {
  timestamps: true
});

// Index for better query performance
voyageSchema.index({ destination: 1 });
voyageSchema.index({ dateDepart: 1 });

// Middleware for automatic population
voyageSchema.pre(/^find/, function() {
  this.populate('destination');
});

module.exports = mongoose.model('Voyage', voyageSchema);
