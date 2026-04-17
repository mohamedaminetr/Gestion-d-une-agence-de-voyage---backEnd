const Voyage = require("../models/Voyage");

// @desc    Get all voyages
// @route   GET /api/voyages
const getVoyages = async (req, res, next) => {
  try {
    const voyages = await Voyage.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: voyages.length,
      data: voyages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single voyage
// @route   GET /api/voyages/:id
const getVoyageById = async (req, res, next) => {
  try {
    const voyage = await Voyage.findById(req.params.id);

    if (!voyage) {
      return res.status(404).json({
        success: false,
        message: "Voyage not found",
      });
    }

    res.status(200).json({
      success: true,
      data: voyage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create voyage
// @route   POST /api/voyages
const createVoyage = async (req, res, next) => {
  try {
    const voyage = await Voyage.create(req.body);

    // Populate the newly created document
    await voyage.populate("destination");

    res.status(201).json({
      success: true,
      data: voyage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update voyage
// @route   PUT /api/voyages/:id
const updateVoyage = async (req, res, next) => {
  try {
    const voyage = await Voyage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!voyage) {
      return res.status(404).json({
        success: false,
        message: "Voyage not found",
      });
    }

    res.status(200).json({
      success: true,
      data: voyage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete voyage
// @route   DELETE /api/voyages/:id
const deleteVoyage = async (req, res, next) => {
  try {
    const voyage = await Voyage.findByIdAndDelete(req.params.id);

    if (!voyage) {
      return res.status(404).json({
        success: false,
        message: "Voyage not found",
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
  getVoyages,
  getVoyageById,
  createVoyage,
  updateVoyage,
  deleteVoyage,
};
