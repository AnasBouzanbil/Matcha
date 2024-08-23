
const bcrypt = require('bcrypt');
import db from '../../conf/db.conf';

import { Response } from 'express';



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