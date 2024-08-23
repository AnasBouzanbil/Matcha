import { SearchForToken } from "../../../services/insertingData";
import { Orm_Add_Bio, Orm_Delete_Bio, Orm_Get_Bio } from "./bio.orm";
import { Response, Request } from "express";


export async function Handle_Post_Bio(req : any, res : any){
    try{
    let {bio} = req.body;
    let token = req.body.token;
    if (!token) return res.status(400).send("Token is required");
    if (!bio) return res.status(400).send("Bio is required");
    await SearchForToken(token);
    await Orm_Add_Bio(token, bio);
    res.status(200).send("Bio added successfully");
    }
       catch(err){
        res.status(400).send("Error adding bio");
        console.log(err);
    }
}

export async function Handle_Get_Bio(req : any, res : any){
    try {
        let token = req.body.token;
        if (!token) return res.status(400).send("Token is required");
        await SearchForToken(token);
        const result = await Orm_Get_Bio(token);
        
        res.status(200).send(result);
    }
    catch (err) {
        res.status(400).send("Error");
        console.log(err);
    }

}

export async function Handle_Delete_Bio(req : any, res : any){
    try {
        let token = req.body.token;
        if (!token) return res.status(400).send("Token is required");
        await SearchForToken(token);
        await Orm_Delete_Bio(token);
        res.status(200).send("Bio deleted successfully");

    }
    catch (err) {
        res.status(400).send("Error");
        console.log(err);
    }
}