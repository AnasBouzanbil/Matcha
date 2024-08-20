import { Router, Request, Response } from 'express';
import { SearchForToken } from "../services/insertingData";
import { Handle_Login, Handle_Post_getUser, Handle_post_signup } from './Handle_Middlewars.routes';

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
  Handle_post_signup(req, res);
});


router.post('/login', async (req : Request, res : Response) =>{
  Handle_Login(req, res);
})
router.post('/GetUser', async (req: Request, res: Response) => {
  Handle_Post_getUser(req, res);
});

export default router;
