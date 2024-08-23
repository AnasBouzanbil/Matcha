import db from '../../conf/db.conf';


export async function Handle_Update_Password(token : any, password : string)
{
    let result = db.query('Update Users SET password = $1 WHERE id = $2', [password, token]);
    return result;
}

export async function Handle_Get_Password_ORM(token : string)
{
    let result = db.query('SELECT password from Users WHERE id = $1', [token]);
    return result;
}

