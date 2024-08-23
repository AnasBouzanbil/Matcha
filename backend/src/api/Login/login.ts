import { Router, Request, Response } from 'express';
import { Handle_Login } from './login.srvices';


const router = Router();




router.post('/login', async (req : Request, res : Response) =>{
  Handle_Login(req, res);
})




export default router;