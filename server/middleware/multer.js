import multer from 'multer';

// We use multer so that will parse the image that we upload from the frontend.
// To parse the image we are using multer package

const upload = multer({storage: multer.diskStorage({})})

export default upload;