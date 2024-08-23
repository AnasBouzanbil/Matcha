



import { Request, Response, Express } from "express";
import { SearchForToken } from "../../../services/insertingData";
import { Handle_Get_Location_ORM, Handle_Update_Location } from "./location.orm";




export async function Handle_Get_Location(req : Request, res : Response){
    try {
        let token = req.body.token as string;
        if (!token) return res.status(400).send("Token is required");
        await SearchForToken(token);
        let result = await Handle_Get_Location_ORM(token);
        res.status(200).send(result);
    }
    catch(err){
        res.status(400).send("Error");
        console.log(err);
    }
}


export async function Handle_Put_Location(req : Request, res : Response){
    try {
        let token = req.body.token as string;
        console.log("token is " + token);
        let location = req.body.location as string;
        if (!token) return res.status(400).send("Token is required");
        if (!location) return res.status(400).send("location is required");
        await SearchForToken(token);
        await Handle_Update_Location(token, location);
        res.status(400).send("Done");
    }
    catch(err){
        res.status(400).send("Error");
        console.log(err);
    }
}