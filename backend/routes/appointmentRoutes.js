const express = require('express');
const {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getDoctors
} = require('../controllers/appointmentController');

const router = express.Router();

// Get list of doctors
router.get('/doctors', getDoctors);
router.get('/', getAppointments);
router.post('/', createAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

module.exports = router;
