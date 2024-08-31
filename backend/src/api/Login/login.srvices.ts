import { Request, Response } from 'express';
import { Handle_Login_user } from './login.orm';
import { generateJwtToken } from '../..';







export async function Handle_Login(req : Request, res : Response)
{
    try {
      const {username , password} = req.body;
      console.log(req.body);
      Handle_Login_user(username, password, res);
      
    }
    catch(error)
    {
      res.status(404).send('oops something went wrong')  
    }
}
