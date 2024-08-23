import db from '../../conf/db.conf';

import { promises as fs } from 'fs';
import { Socket } from 'socket.io';
var file_path = "../../../../DB/db.json";
interface Mail {
    mail: string;
    token: string;
}
var MapSocket_tokens = new Map<string, Socket>();


async function readMailsFromFile() {
    const data = await fs.readFile(file_path, 'utf-8');
    return JSON.parse(data);
}
 
export async function setToken_Mail(token: string, mail: string, socket: any) {
    const jsonContent = await readMailsFromFile();
    const newMail: Mail = {
        mail: mail,
        token: token
    };
    MapSocket_tokens.set(token, socket);
    jsonContent.push(newMail);
    await fs.writeFile(file_path, JSON.stringify(jsonContent, null, 2));
}

export async function IfMail_Exist(mail: string) {
    const jsonContent = await readMailsFromFile();
    const obj = jsonContent.find((obj: any) => obj.mail === mail);
    if (obj) {
        return obj;
    } else {
        return false;
    }
}

export async function Validte_Token_Mail(token: string) {
    const jsonContent = await readMailsFromFile();
    const obj = jsonContent.find((obj: any) => obj.token === token);
    if (obj === undefined) {
        console.log(obj)
        throw new Error('Token not found');
    }
    if (obj) {
        obj.socket  =  MapSocket_tokens.get(token);
        if (obj.socket === undefined) {
            return obj;
        }
        return obj;
    } else {
        throw new Error('Token not found');
    }
}

export async function deleteToken_Mail(token: string) {
    const jsonContent = await readMailsFromFile();
    const obj = jsonContent.find((obj: any) => obj.token === token);
    if (obj) {
        const index = jsonContent.indexOf(obj);
        jsonContent.splice(index, 1);
        await fs.writeFile(file_path, JSON.stringify(jsonContent, null, 2));
    } else {
        throw new Error('Token not found');
    }
}