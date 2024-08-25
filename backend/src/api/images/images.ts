import { Router } from 'express';

const router = Router();

import { upload, validateUser, handleUploadPictures,handleProfileUpload ,handleGetImages,handleGetProfileImage } from "./images.services";
import { authorizeToken } from '../..';

router.post('/upload_pictures',authorizeToken , validateUser, upload.array('file', 3), handleUploadPictures);
router.post('/profile',authorizeToken , validateUser, upload.single('file'), handleProfileUpload);
router.get('/images', authorizeToken ,handleGetImages);
router.get('/profile',authorizeToken , handleGetProfileImage);

export default router;
