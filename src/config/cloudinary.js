import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { config } from '../utils/config.js';

cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key:    config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET
});

export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'KiranaStore/products',
    allowed_formats: ['jpeg', 'png', 'jpg', 'webp']
  }
});

export default cloudinary;
