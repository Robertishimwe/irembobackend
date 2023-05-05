import { v2 as cloudinary } from 'cloudinary';

const CLOUDINARY_API_SECRET = 'DHrOPw_7YBNXov-3OtylUN76rzs'
const CLOUDINARY_API_KEY = '988844114521336'
const CLOUDINARY_NAME = 'dke7g4hkw'

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export default cloudinary;
