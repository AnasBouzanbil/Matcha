
import { Request, Response , Express} from "express";
const  bcrypt = require('bcrypt');


export async function Handle_Update_Password(req : Request, res : Response)
{
    try {
        const {token , password} = req.body;
        if (!token) return res.status(400).send("Token is required");
        if (!password) return res.status(400).send("password is required");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await Handle_Update_Password(token, hashedPassword);

        console.log(req.body);
        res.status(200).send('password updated');
    }
    catch(error)
    {
        res.status(404).send('oops something went wrong')  
    }
}
