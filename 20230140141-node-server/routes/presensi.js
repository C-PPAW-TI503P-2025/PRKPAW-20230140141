const express = require('express');
const router = express.Router();
const presensiController = require('../controllers/presensiController');
const { addUserData } = require('../middleware/permissionMiddleware');
const { body, validationResult } = require('express-validator');

// Middleware untuk menangani hasil validasi
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: "Validasi gagal: Format tanggal tidak valid",
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
        value: err.value
      }))
    });
  }
  next();
};

// Validasi untuk update presensi
const validateUpdatePresensi = [
  body('checkIn')
    .optional()
    .isISO8601()
    .withMessage('checkIn harus berupa tanggal yang valid dalam format ISO 8601 (contoh: 2024-10-30T08:00:00Z)')
    .bail()
    .custom((value) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error('checkIn bukan tanggal yang valid');
      }
      return true;
    }),
  body('checkOut')
    .optional()
    .isISO8601()
    .withMessage('checkOut harus berupa tanggal yang valid dalam format ISO 8601 (contoh: 2024-10-30T17:00:00Z)')
    .bail()
    .custom((value) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error('checkOut bukan tanggal yang valid');
      }
      return true;
    }),
  body('nama')
    .optional()
    .isString()
    .withMessage('Nama harus berupa string')
    .trim()
    .notEmpty()
    .withMessage('Nama tidak boleh kosong'),
  handleValidationErrors
];

router.use(addUserData);
router.post('/check-in', presensiController.CheckIn);
router.post('/check-out', presensiController.CheckOut);
router.put('/:id', validateUpdatePresensi, presensiController.updatePresensi);
router.delete('/:id', presensiController.deletePresensi);

module.exports = router;