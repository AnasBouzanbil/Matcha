import db from '../../../conf/db.conf';

export async function Handle_Update_PhoneNumber(token : any, phonenumber : string)
{
    let result = db.query('Update Users SET phonenumber = $1 WHERE id = $2', [phonenumber, token]);
    return result;
}

export async function Handle_Get_PhoneNumber_ORM(token : string)
{
    let result = db.query('SELECT phonenumber from Users WHERE id = $1', [token]);
    return result;
}



