const express = require('express');
const router = express.Router();
const {
  getVoyages,
  getVoyageById,
  createVoyage,
  updateVoyage,
  deleteVoyage
} = require('../controllers/voyageController');

router.route('/')
  .get(getVoyages)
  .post(createVoyage);

router.route('/:id')
  .get(getVoyageById)
  .put(updateVoyage)
  .delete(deleteVoyage);

module.exports = router;
