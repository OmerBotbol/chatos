require('dotenv').config();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');
const models = require('../models');

const s3 = new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, uuidv4());
    },
  }),
});

const getImageUrlByUserId = (req, res) => {
  const { userId } = req.params;
  models.Users.findOne({ where: { id: userId } }).then((result) => {
    res.send(result.image);
  });
};

const uploadImageToS3 = (req, res) => {
  const { userId } = req.params;
  if (parseInt(userId) !== req.data.id)
    return res.status(403).send('only the user can update his image');
  models.Users.update(
    { image: `https://chatos-images.s3.amazonaws.com/${req.file.key}` },
    { where: { id: userId } }
  ).then(() => {
    res.send(`https://chatos-images.s3.amazonaws.com/${req.file.key}`);
  });
};

const deleteImageFromS3 = (req, res) => {
  const { userId } = req.params;
  if (parseInt(userId) !== req.data.id)
    return res.status(403).send('only the user can update his image');
  const params = { Bucket: process.env.BUCKET_NAME, Key: req.params.imageId };
  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // error
    else res.send('image deleted');
  });
};

module.exports = {
  uploadImageToS3,
  deleteImageFromS3,
  getImageUrlByUserId,
  upload,
};
