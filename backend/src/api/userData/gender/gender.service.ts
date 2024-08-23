


import { Express, Request, Response } from "express";
import { SearchForToken } from "../../../services/insertingData";
import { Handle_Update_Gender , Handle_Update_Prefeble_Gender, Handle_Get_Gender_ORM, Handle_Get_Prefeble_ORM } from "./gender.orm";


export async function Handle_Put_Gender(req : Request, res : Response){
    try {
        let token = req.headers.token as string;
        let gender = req.body.gender as string;
        if (!token) return res.status(400).send("Token is required");
        if (!gender) return res.status(400).send("gender is required");
        await SearchForToken(token);
        await Handle_Update_Gender(token, gender);
        res.status(400).send("Done");
    }
    catch(err){
        res.status(400).send("Error");
        console.log(err);
    }
}
export async function Handle_Put_Gender_preference(req : Request, res : Response){
    try {
        let token = req.headers.token as string;
        let gender = req.body.gender as string;
        if (!token) return res.status(400).send("Token is required");
        if (!gender) return res.status(400).send("gender is required");
        await SearchForToken(token);
        await Handle_Update_Prefeble_Gender(token, gender);
        res.status(400).send("Done");
    }
    catch(err){
        res.status(400).send("Error");
        console.log(err);
    }
}


export async function Handle_Get_Gender(req : Request, res : Response){
    try {
        let token = req.headers.token as string;
        if (!token) return res.status(400).send("Token is required");
        await SearchForToken(token);
        let result = await Handle_Get_Gender_ORM(token);
        res.status(200).send(result.rows[0]);
        }
        catch(err){
            res.status(400).send("Error");
            console.log(err);
        }
}


export async function Handle_Get_Prefeble_Gender(req : Request, res : Response){
    try {
        let token = req.headers.token as string;
        if (!token) return res.status(400).send("Token is required");
        await SearchForToken(token);
        let result = await Handle_Get_Prefeble_ORM(token);
        res.status(200).send(result.rows[0]);
        }
        catch(err){
            res.status(400).send("Error");
            console.log(err);
        }
}