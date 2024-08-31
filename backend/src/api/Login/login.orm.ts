
const bcrypt = require('bcrypt');
import { generateJwtToken } from '../..';
import db from '../../conf/db.conf';

import { Response } from 'express';
import GetUser from '../user/user.orm';
import { GetUserTags } from '../tags/Tags.orm';
import { GetImages } from '../images/image.orm';

interface AllData{
    user : any,
    pics  :any,
    tags : any
    token : any
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
        let token = await generateJwtToken(pass.rows[0].id);
        console.log('Token:', token );
        const user = await GetUser(pass.rows[0].id);
        const tags = await GetUserTags(pass.rows[0].id);
        const pics = await GetImages(pass.rows[0].id);
        delete user.id;
        delete user.password;
        var userval : AllData = {
            user : user,
            tags : tags,
            pics :pics,
            token : token
        };
        console.log(userval);
        res.status(200).send(userval);
    }
}