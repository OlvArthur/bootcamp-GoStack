import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        // chamado do callback com primeiro argumento (erro) nulo e o segundo,
        // transformando os 16 bits em uma string hexadecimal
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
