const db = require('../db/db');

// Get all appointments
exports.getAppointments = (req, res) => {
  const sql = 'SELECT a.id, a.patient_name,a.doctor_id, a.appointment_date, a.reason, d.first_name, d.last_name FROM appointments a INNER JOIN doctors d ON a.doctor_id = d.id order by a.id DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching appointments');
    } else {
      res.send(results);
    }
  });
};

// Create a new appointment
exports.createAppointment = (req, res) => {
  const { patient_name, doctor_id, appointment_date, reason } = req.body;
  const sql =
    'INSERT INTO appointments (patient_name, doctor_id, appointment_date, reason) VALUES (?, ?, ?, ?)';
  db.query(sql, [patient_name, doctor_id, appointment_date, reason], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating appointment');
    } else {
      res.status(201).send({ id: result.insertId, ...req.body });
    }
  });
};

// Update an appointment
exports.updateAppointment = (req, res) => {
  const { id } = req.params;
  const { patient_name, doctor_id, appointment_date, reason, status } = req.body;
  const sql =
    'UPDATE appointments SET patient_name = ?, doctor_id = ?, appointment_date = ?, reason = ?, status = ? WHERE id = ?';
  db.query(sql, [patient_name, doctor_id, appointment_date, reason, status, id], err => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating appointment');
    } else {
      res.send({ message: 'Appointment updated successfully' });
    }
  });
};

// Delete an appointment
exports.deleteAppointment = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM appointments WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error deleting appointment');
    }

    // Check if any row was affected
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Appointment not found' });
    }
    return res.send({ message: 'Appointment deleted successfully' });
  });
};



// Get all doctors
exports.getDoctors = (req, res) => {
  db.query('SELECT id, CONCAT(first_name, " ", last_name) AS doctor_name FROM doctors', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching doctors.' });
    }
    res.status(200).json(results);
  });
};