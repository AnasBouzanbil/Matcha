
import { promises as fs } from 'fs';
import { Socket } from 'socket.io';
import db from '../conf/db.conf';

const bcrypt = require('bcrypt/');
import express, {Request, Response} from 'express';





const file_path ="../DB/db.json";

export async function SearchForToken(token: string) {
    console.log("token is " + token);
    const result = await db.query('SELECT * FROM users WHERE id = $1', [token]);
    if (result.rows.length > 0) {
        return result.rows[0];
    } else {
        throw new Error('Token not found');
    }
}



export async function ifUserEmailExist(Email: string) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [Email]);
    return result.rows.length > 0;
}

export async function ifUserUsernameExist(username: string) {
    const result = await db.query('SELECT * FROM users WHERE Username = $1', [username]);
    console.log(result.rows.length);
    if (result.rows.length > 0) {
        throw new Error('Username already exists');
    } else {
        return false;
    }
}



export async function UpdateUserPassword(Username: string, Password: string) {
    const hashedPassword = bcrypt.hashSync(Password, 10);
    const result = await db.query(
        'UPDATE users SET password = $1 WHERE Username = $2',
        [hashedPassword, Username]
    );
    if (result.rowCount === 0) {
        throw new Error('Token assoicated with user not found for password update');
    } else {
        console.log('Password updated');
    }
}




export async function UpdateUserEmail(Username: string, Email: string) {
    const result = await db.query(
        'UPDATE users SET email = $1 WHERE Username = $2',
        [Email, Username]
    );
    if (result.rowCount === 0) {
        throw new Error('Token assoicated with user not found');
    }
}

export async function UpdateUserPhoneNumber(Username: string, PhoneNumber: string) {
    const result = await db.query(
        'UPDATE users SET phonenumber = $1 WHERE id = $2',
        [PhoneNumber, Username]
    );
    if (result.rowCount === 0) {
        throw new Error('User not found');
    }
}

export async function UpdateUserName(Username: string, Name: string) {
    const result = await db.query(
        'UPDATE users SET firstname = $1 WHERE Username = $2',
        [Name, Username]
    );
    if (result.rowCount === 0) {
        throw new Error('User not found');
    }
}

export async function UpdateUserLocation(Username: string, Location: string) {
    const result = await db.query(
        'UPDATE users SET locations = $1 WHERE id = $2',
        [Location, Username]
    );
    if (result.rowCount === 0) {
        throw new Error('User not found');
    }
}

export async function UpdateUserBio(Username: string, Bio: string) {
    const result = await db.query(
        'UPDATE users SET bio = $1 WHERE Username = $2',
        [Bio, Username]
    );
    if (result.rowCount === 0) {
        throw new Error('User not found');
    }
}

export async function UpdateUserSexualOrientation(Username: string, SexualOrientation: string) {
    const result = await db.query(
        'UPDATE users SET sexual_orientation = $1 WHERE Username = $2',
        [SexualOrientation, Username]
    );
    if (result.rowCount === 0) {
        throw new Error('User not found');
    }
}

export async function UpdateUserGender(Username: string, gender: string) {
    const result = await db.query(
        'UPDATE users SET gender = $1 WHERE id = $2',
        [gender, Username]
    );
    if (result.rowCount === 0) {
        throw new Error('User not found');
    }
}

export async function UserNewInfo(Data: any, token: string) {
    const result = await db.query(`
        UPDATE users 
        SET age = $1, bio = $2, gender_preference = $3, gender = $4 
        WHERE id = $5`, 
        [Data.age, Data.bio, Data.preferences, Data.gender, token]
    );

    if (result.rowCount === 0) {
        throw new Error('Failed to update user info');
    }
}









export async function GetUsersBySimilarTag (token: string) {
    const result = await db.query(`
Select * from users where id in (select userid from Preference where tagid in (select tagid from Preference where userid = $1))`, [token]);
    return result.rows;
}



export async function GetUsersByAge (token: string, minage: number, maxage: number) {
    const result = await db.query(`
    SELECT * FROM users where age >= $1 and age <= $2`, [minage, maxage]);
    return result.rows;
}



