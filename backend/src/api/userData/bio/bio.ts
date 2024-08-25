
import { Router } from 'express';
import { Request, Response, Express } from 'express';
import { Handle_Delete_Bio, Handle_Get_Bio, Handle_Post_Bio } from './bio.service';
import { authorizeToken } from '../../..';



const router = Router();

router.get('/bio', authorizeToken ,async (req : Request, res : Response) => {
     Handle_Get_Bio(req, res);
});

router.post('/bio',authorizeToken , async (req : Request, res : Response) => {
    Handle_Post_Bio(req, res);
});

router.delete('/bio', authorizeToken, async (req : Request, res : Response) => {
    Handle_Delete_Bio(req, res);

});

export default router;
