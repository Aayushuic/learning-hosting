import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { ApiError } from './api-error';

const uploadPath = path.join(__dirname, '../../uploads/rewards');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

export const imageUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-rewardImage${path
        .extname(file.originalname)
        .toLocaleLowerCase()}`;
      cb(null, uniqueName);
    },
  }),
  limits: { fileSize: 1 * 1024 * 1024, files: 1 },
  fileFilter: async (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimeType && extName) {
      return cb(null, true);
    }
    cb(new ApiError(400, 'Only image files (jpeg, jpg, png, gif) are allowed'));
  },
});
