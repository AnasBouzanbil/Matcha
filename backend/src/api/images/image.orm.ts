

import db from '../../conf/db.conf';


export async function InserteProfileImage(token: string, image: string) {
    try {
        await db.query('update users set profileimg = $1 where id = $2', [image, token]);
    } catch (error) {
        throw error;
    } 
}


// Get user profile picture

export async function GetProfileImage(token: string) {
    try {
        const result = await db.query('select profileimg from users where id = $1', [token]);
        return result.rows[0];
    } 
    catch (error) {
        throw error;
    }
}


// inseret array of images into db in table Pictures     id SERIAL PRIMARY KEY, userid INT REFERENCES Users(id), img_path TEXT

export async function InsertImages(token: string, images: string[]) {
    try {
        for (let image of images) {
            await db.query('insert into Pictures (userid, img_path) values ($1, $2)', [token, image]);
        }
    } catch (error) {
        throw error;
    }
}


// Get all images of a user

export async function GetImages(token: string) {
    try {
        const result = await db.query('select img_path from Pictures where userid = $1', [token]);
        return result.rows;
    } catch (error) {
        throw error;
    }
}