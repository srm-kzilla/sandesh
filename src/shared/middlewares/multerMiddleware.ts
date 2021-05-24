import multer from 'multer';
import * as path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../templates'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.html');
  },
});

export const upload = multer({
  limits: {
    fileSize: 10000,
  },
  storage: storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(html)$/)) {
      return cb(new Error('Please upload a html file.'));
    }
    cb(undefined, true);
  },
});
