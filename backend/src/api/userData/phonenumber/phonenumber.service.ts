






import { Response, Request, Express } from "express";

import { SearchForToken } from "../../../services/insertingData";
import { Handle_Get_PhoneNumber_ORM, Handle_Update_PhoneNumber } from "./phonenumber.orm";

export async function   Handle_Put_PhoneNumber(req : Request, res : Response)
{
    let {token , phoneNumber} = req.body;
    if (!token) return res.status(400).send("Token is required");
    if (!phoneNumber) return res.status(400).send("phoneNumber is required");
    SearchForToken(token).then((result : any) => {
        console.log(result);
        Handle_Update_PhoneNumber(phoneNumber, token).then((result : any) => {
            res.status(200).send("phoneNumber added successfully");
        }
        ).catch((err : any) => {
            console.log(err);
        });
    }
    ).catch((err : any) => {
        console.log(err);
    });

}

export async function   Handle_Get_PhoneNumber(req : Request, res : Response)
{
    try {
        let token = req.body.token;
        if (!token) return res.status(400).send("Token is required");
        await SearchForToken(token);
        const result = await Handle_Get_PhoneNumber_ORM(token);
        res.status(200).send(result);
    }
    catch (err) {
        res.status(400).send("Error");
        console.log(err);
    }
}

export async function   Handle_Delete_PhoneNumber(req : Request, res : Response)
{

}
