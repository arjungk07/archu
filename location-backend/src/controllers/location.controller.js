// src/controllers/location.controller.js

const { validationResult } = require('express-validator');
const LocationModel = require('../models/location.model');

const LocationController = {

  // POST /api/locations
  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          errors: errors.array().map((e) => ({
            field:   e.path,
            message: e.msg,
          })),
        });
      }

      const { url_link, sender_name } = req.body;

      // Log incoming data so you can verify it reaches the controller
      console.log('[POST /api/locations] Body received:', { url_link, sender_name });

      const record = await LocationModel.create({
        url_link,
        sender_name: sender_name?.trim() || 'Anonymous User',
      });

      console.log('[POST /api/locations] Saved to DB:', record);

      return res.status(201).json({
        success: true,
        message: 'Location saved successfully',
        data:    record,
      });
    } catch (err) {
      // Print the full MySQL error in your backend terminal
      console.error('[POST /api/locations] ERROR:', err.message);
      console.error('Full error:', err);
      next(err);
    }
  },

  // GET /api/locations
  async getAll(req, res, next) {
    try {
      const locations = await LocationModel.findAll();
      return res.status(200).json({
        success: true,
        count:   locations.length,
        data:    locations,
      });
    } catch (err) {
      console.error('[GET /api/locations] ERROR:', err.message);
      next(err);
    }
  },

  // GET /api/locations/:id
  async getOne(req, res, next) {
    try {
      const record = await LocationModel.findById(req.params.id);
      if (!record) {
        return res.status(404).json({ success: false, message: 'Location not found' });
      }
      return res.status(200).json({ success: true, data: record });
    } catch (err) {
      console.error('[GET /api/locations/:id] ERROR:', err.message);
      next(err);
    }
  },

  // DELETE /api/locations/:id
  async remove(req, res, next) {
    try {
      const deleted = await LocationModel.deleteById(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Location not found' });
      }
      return res.status(200).json({ success: true, message: 'Location deleted' });
    } catch (err) {
      console.error('[DELETE /api/locations/:id] ERROR:', err.message);
      next(err);
    }
  },
};

module.exports = LocationController;