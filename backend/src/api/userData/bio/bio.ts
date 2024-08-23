
import { Router } from 'express';
import { Request, Response, Express } from 'express';
import { Handle_Delete_Bio, Handle_Get_Bio, Handle_Post_Bio } from './bio.service';



const router = Router();

router.get('/bio', async (req : Request, res : Response) => {
     Handle_Get_Bio(req, res);
});

router.post('/bio', async (req : Request, res : Response) => {
    Handle_Post_Bio(req, res);
});

router.delete('/bio', async (req : Request, res : Response) => {
    Handle_Delete_Bio(req, res);

});

export default router;
