import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from '';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {},
  }),
};
