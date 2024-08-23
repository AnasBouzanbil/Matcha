

import { Response, Request, Router } from "express";
import { Handle_Get_Location, Handle_Put_Location } from "./location.service";


const router = Router();

router.get('/location', async (req : Request, res : Response) => {
    Handle_Get_Location(req, res);
});

router.put('/location', async (req : Request, res : Response) => {
    Handle_Put_Location(req, res);
});


export default router;