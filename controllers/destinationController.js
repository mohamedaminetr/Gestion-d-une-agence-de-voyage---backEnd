const Destination = require("../models/Destination");

// @desc    Get all destinations
// @route   GET /api/destinations
const getDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single destination
// @route   GET /api/destinations/:id
const getDestinationById = async (req, res, next) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    res.status(200).json({
      success: true,
      data: destination,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create destination
// @route   POST /api/destinations
const createDestination = async (req, res, next) => {
  try {
    const destination = await Destination.create(req.body);

    res.status(201).json({
      success: true,
      data: destination,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update destination
// @route   PUT /api/destinations/:id
const updateDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    res.status(200).json({
      success: true,
      data: destination,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete destination
// @route   DELETE /api/destinations/:id
const deleteDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
};
