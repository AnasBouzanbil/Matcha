import db from '../../../conf/db.conf';


export async function Handle_Update_Location(token : any, location : string)
{
    let result = db.query('Update Users SET Locations = $1 WHERE id = $2', [location, token]);
    return result;
}

export async function Handle_Get_Location_ORM(token : string)
{
    let result = await db.query('SELECT Locations from Users WHERE id = $1', [token]);
    // if (result.rows.length === 0) {
    //     return null;
    // }
    return result.rows[0].locations;
    // return result
}



export async function GetUsersBycloseLocation (token: string) {
    const result = await db.query(
                                    `Select * from users where Locations in (select locations from users where id = $1)`
                            , [token]);
    return result.rows;
}