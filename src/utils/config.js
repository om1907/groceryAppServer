import dotenv from 'dotenv';
dotenv.config();

const config = {
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME || 'omkar',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '1234067899',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || 'omkarpandey1907',
}

export { config };