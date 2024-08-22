
import { promises as fs } from 'fs';
import { Socket } from 'socket.io';
const db = require('./db');
const bcrypt = require('bcrypt/');
import express, {Request, Response} from 'express';



var MapSocket_tokens = new Map<string, Socket>();


const file_path ="../DB/db.json";

interface Mail {
    mail: string;
    token: string;
}

async function readMailsFromFile() {
    const data = await fs.readFile(file_path, 'utf-8');
    return JSON.parse(data);
}
 
export async function setToken_Mail(token: string, mail: string, socket: any) {
    const jsonContent = await readMailsFromFile();
    const newMail: Mail = {
        mail: mail,
        token: token
    };
    MapSocket_tokens.set(token, socket);
    jsonContent.push(newMail);
    await fs.writeFile(file_path, JSON.stringify(jsonContent, null, 2));
}

export async function IfMail_Exist(mail: string) {
    const jsonContent = await readMailsFromFile();
    const obj = jsonContent.find((obj: any) => obj.mail === mail);
    if (obj) {
        return obj;
    } else {
        return false;
    }
}

export async function Validte_Token_Mail(token: string) {
    const jsonContent = await readMailsFromFile();
    const obj = jsonContent.find((obj: any) => obj.token === token);
    if (obj === undefined) {
        console.log(obj)
        throw new Error('Token not found');
    }
    if (obj) {
        obj.socket  =  MapSocket_tokens.get(token);
        if (obj.socket === undefined) {
            return obj;
        }
        return obj;
    } else {
        throw new Error('Token not found');
    }
}

export async function deleteToken_Mail(token: string) {
    const jsonContent = await readMailsFromFile();
    const obj = jsonContent.find((obj: any) => obj.token === token);
    if (obj) {
        const index = jsonContent.indexOf(obj);
        jsonContent.splice(index, 1);
        await fs.writeFile(file_path, JSON.stringify(jsonContent, null, 2));
    } else {
        throw new Error('Token not found');
    }
}

// PostgreSQL-Related Functions


export async function SearchForToken(token: string) {
    console.log("token is " + token);
    const result = await db.query('SELECT * FROM users WHERE id = $1', [token]);
    if (result.rows.length > 0) {
        return result.rows[0];
    } else {
        throw new Error('Token not found');
    }
}

export default async function GetUser(token: string) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [token]);
    console.log(result.rows[0]);
    if (result.rows.length > 0) {
        return result.rows[0];
    }
}

export async function setNewUser(LastName: string, FirstName: string, Email: string, PhoneNumber: string, Username: string, Password: string) {
    try {
        const hashedPassword = bcrypt.hashSync(Password, 10);
        await db.query(
            'INSERT INTO Users (FirstName, LastName, Email, PhoneNumber, Username, Password) VALUES ($1, $2, $3, $4, $5, $6)',
            [FirstName, LastName, Email, PhoneNumber, Username, hashedPassword]
        );

        const result = await db.query('SELECT id FROM Users WHERE Username = $1', [Username]);
        return result.rows[0]?.id;
    } catch (error) {
        console.error('Error inserting new user:', error);
        throw error;
    }
}

export async function Handle_Login_user(username: string, password: string, res: Response) {
    console.log(username);
    const pass = await db.query('SELECT password, id FROM users WHERE username = $1', [username]);
    if (pass.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const ismatch = await bcrypt.compare(password, pass.rows[0].password);
    console.log('Password match:', ismatch);
    if (!ismatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
    } else {
        return res.status(200).json({ id: pass.rows[0].id });
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

export async function set_user_Tags(tags: string[], token: string) {
    for (let i = 0; i < tags.length; i++) {
        const result = await db.query(
            'INSERT INTO Preference (userid, tagid) VALUES ($1, (SELECT id FROM tags WHERE tagname = $2))',
            [token, tags[i]]
        );
        console.log(result.rows);
    }
    console.log('tags are ' + tags);
    console.log('length is ' + tags.length);
    console.log('token is ' + token);
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

export async function GetUsersBycloseLocation (token: string) {
    const result = await db.query(`
Select * from users where locations in (select locations from users where id = $1)`, [token]);
    return result.rows;
}

export async function GetUsersByAge (token: string, minage: number, maxage: number) {
    const result = await db.query(`
    SELECT * FROM users where age >= $1 and age <= $2`, [minage, maxage]);
    return result.rows;
}









export async function Update_photo_profile(token: string, photo: string) {
    const result = await db.query('UPDATE users SET profileimg = $1 WHERE id = $2', [photo, token]);
    if (result.rowCount === 0) {
        throw new Error('User not found');
    }
}


export async function Update_pictures(token: string, pictures: string) {
        const result = await db.query(
            'INSERT INTO Pictures (userid, picture) VALUES ($1, $2)',
            [token, pictures]
        );
        console.log(result.rows);
    
}
