import { Request, Response, Router } from 'express';
import multer from 'multer';
import { NextFunction } from 'express';
import { SearchForToken } from '../../services/insertingData';
import { GetImages, GetProfileImage, InserteProfileImage, InsertImages } from './image.orm';
import express from 'express';
import { stringify } from 'querystring';
import { json } from 'stream/consumers';
import { HandleGetUserTag } from '../tags/Tags.services';
import { GetUserTags, set_user_Tags } from '../tags/Tags.orm';
import GetUser from '../user/user.orm';

export const router = Router();

const storage = multer.diskStorage({
    destination: (req: Request, file: any, cb: any) => {
        cb(null, './uploads');
    },
    filename: (req: Request, file: any, cb: any) => {
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage: storage });

export async function validateUser(req: Request, res: Response, next: NextFunction) {
    try {
        let token = req.body.token;
        if (!token) {
            return res.status(400).send('Token is required');
        }
        await SearchForToken(token);
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
}


interface UserData {
    user: any,
    pics : any,
    tags : any
}

export async function handleUploadPictures(req: any, res: Response) {
    try {
        let token = req.token;
        console.log('token in function handleUploadPictures:', token);
        const files = req.files as Express.Multer.File[];
        if (!files) {
            return res.status(400).send('No files uploaded');
        }

        const images = files.map((file) => file.filename);
        await InsertImages(token, images);
        const user = await GetUser(token);
        const tags = await GetUserTags(token);
        const pics = await GetImages(token);
        delete user.id;
        delete user.password;
        var userval : UserData = {
            user : user,
            tags : tags,
            pics :pics
        };
        res.status(200).send(userval);

    } catch (error) {
        console.error(error);
        res.status(400).send('An error occurred while uploading images');
    }
}

export async function handleProfileUpload(req: any, res: Response) {
    try {
        let token = req.token;
        console.log('token in function handleProfileUpload:', token);
        const file = req.file as Express.Multer.File;
        if (!file) {
            return res.status(400).send('No file uploaded');
        }
        const image = file.filename;
        await InserteProfileImage(token, image);
        res.send('Profile picture uploaded successfully');
    } catch (error) {
        console.error(error);
        res.status(400).send('An error occurred while uploading the profile picture');
    }
}

export async function handleGetImages(req: Request, res: Response) {
    try {
        let arrayimages = [] as any;
        let token = req.body.token as string;
        const namesbelike = await GetImages(token);
        if (!namesbelike) {
            return res.status(404).send('Images not found');
        }
        namesbelike.forEach((element: any) => {
            arrayimages.push(`http://localhost:4000/uploads/${element}`);
        });
        res.status(200).send(arrayimages);
    } catch (error) {
        console.error(error);
        res.status(400).send('An error occurred while retrieving images');
    }
}

export async function handleGetProfileImage(req: Request, res: Response) {
    try {
        const token = req.body.token as string;
        const image = await GetProfileImage(token);

        if (!image || !image.profileimg) {
            return res.status(404).send('Profile image not found');
        }
        const imageUrl = `http://localhost:4000/uploads/${image.profileimg}`;
        res.status(200).send(imageUrl);
    } catch (error) {
        console.error(error);
        res.status(400).send('An error occurred while retrieving the profile picture');
    }
}

router.use('/uploads', express.static('./uploads'));
