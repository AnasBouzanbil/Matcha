import { Request, Response } from 'express';
import { GetUserTags, set_user_Tags } from './Tags.orm';
import { SearchForToken } from '../../services/insertingData';





export async function Handle_Add_tags(req : Request, res : Response){
    try {
        const tags = req.body;
        const token = req.body;
        if (await SearchForToken(token) == false) return res.status(400).send('Token is required');

        set_user_Tags(tags, token);
        res.status(200).send('Tags added successfully');

    } catch (error) {
        res.status(403).send('Error adding tags ' + error);
    }
}


export async function HandleGetUserTag(req : Request, res : Response)
{
    try {
        const token = req.body;
        const tags = await GetUserTags(token);
        res.status(200).send(tags);
    }
    catch(error)
    {
        res.status(403).send('Error getting tags');
    }
}