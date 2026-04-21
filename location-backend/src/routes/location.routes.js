// src/routes/location.routes.js

const express            = require('express');
const { body }           = require('express-validator');
const LocationController = require('../controllers/location.controller');

const router = express.Router();

const validateLocation = [
  body('url_link')
    .trim()
    .notEmpty().withMessage('url_link is required')
    .custom((val) => {
      // Accept all Google Maps link formats:
      // goo.gl, google.com/maps, maps.app.goo.gl, maps.google.com
      const isGoogleMaps =
        val.includes('goo.gl') ||
        val.includes('google.com/') ||
        val.includes('maps.app.goo.gl') ||
        val.includes('maps.google.com');

      if (!isGoogleMaps) {
        throw new Error('Only Google Maps links are accepted');
      }
      return true;
    }),

  body('sender_name')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('sender_name must be under 100 characters'),
];

router.post(  '/',     validateLocation, LocationController.create);
router.get(   '/',                       LocationController.getAll);
router.get(   '/:id',                    LocationController.getOne);
router.delete('/:id',                    LocationController.remove);

module.exports = router;