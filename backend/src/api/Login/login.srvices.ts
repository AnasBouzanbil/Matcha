import { Request, Response } from 'express';
import { Handle_Login_user } from './login.orm';







export async function Handle_Login(req : Request, res : Response)
{
    try {
      const {username , password} = req.body;
      console.log(req.body);
      Handle_Login_user(username, password, res);
      console.log('login done')
    }
    catch(error)
    {
      res.status(404).send('oops something went wrong')  
    }
}
