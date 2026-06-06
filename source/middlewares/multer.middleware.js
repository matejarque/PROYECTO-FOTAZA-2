import multer from "multer";

// Usamos memoryStorage para recibir el archivo en buffer y mandarlo directo a la nube
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 
  },
  fileFilter: (req, file, cb) => {
    const tiposAdmitidos = [
      "image/jpeg", "image/png", "image/webp", 
      "video/mp4", "video/quicktime", "video/x-msvideo" 
    ];

    if (tiposAdmitidos.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten imágenes o videos (MP4/MOV/AVI)"));
    }
  }
});