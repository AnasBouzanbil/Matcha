
import { Router, Response, Request } from "express";
import {  HandleGetUserTag, Handle_Add_tags } from "./Tags.services";



const router = Router();

router.get('/tags', async (req : Request, res : Response) =>{
    HandleGetUserTag(req, res);
})
router.post('/tags', async (req : Request, res : Response) =>{
    Handle_Add_tags(req, res);
    
})
router.delete('/tags', async (req : Request, res : Response) =>{
    res.send('delete tags');
})

export default router;