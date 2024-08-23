
import db from '../../../conf/db.conf';



export function Handle_Update_Gender(token : any, gender : string)
{
    let result = db.query('Update Users SET gender = $1 WHERE id = $2', [gender, token]);
    return result;
}

export function Handle_Update_Prefeble_Gender(token : any , preferble_gender : string)
{
    let result = db.query('Update Users SET gender_preference = $1 WHERE id = $2', [preferble_gender, token]);
    return result;
}



export function Handle_Get_Gender_ORM(token : string)
{
    let result = db .query('SELECT gender from Users WHERE id = $1', [token]);
    return result;
}

export function Handle_Get_Prefeble_ORM(token : any)
{
    let result = db.query('SELECT gender_preference FROM Users WHERE id = $1', [token]);
    return result;
}