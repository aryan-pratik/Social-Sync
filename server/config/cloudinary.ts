import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dvjzuiyp1",
  api_key: process.env.CLOUDINARY_API_KEY || "164491494766121",
  api_secret: process.env.CLOUDINARY_API_SECRET || "a8rMuXB5IVshQgW4PIm35dfghP0",
  secure: true,
});

export default cloudinary;
