import {Router ,} from 'express';
import { Request, Response } from 'express';
import { Handle_Delete_user, Handle_Get_User, Handle_Post_User } from './user.services';



const router = Router();


router.get('/user', async(req : Request, res : Response)=>{
    Handle_Get_User(req, res);
})

router.post('/user', async(req : Request, res : Response)=>{
    Handle_Post_User(req, res);
})

router.delete('/user', async(req : Request, res : Response)=>{
    Handle_Delete_user(req, res);
})


export default router;