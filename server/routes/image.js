require('dotenv').config();
const express = require('express');
const image = express.Router();
const { validateToken } = require('../utils');
const {
  uploadImageToS3,
  deleteImageFromS3,
  getImageUrlByUserId,
  upload,
} = require('../controllers/imageController');

image.use(express.json());
image.use(validateToken);

image.get('/:userId', getImageUrlByUserId);

image.put('/upload/:userId', upload.single('file'), uploadImageToS3);

image.delete('/image/:userId/:imageId', deleteImageFromS3);

module.exports = image;
