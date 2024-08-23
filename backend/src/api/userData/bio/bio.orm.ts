import db from '../../../conf/db.conf';

export async function Orm_Get_Bio(token: string) {
    var res = await  db.query('SELECT bio FROM Users WHERE id = $1', [token]);
    if (res.rows.length === 0) {
        return null;
    }
    return res.rows[0].bio;
}

export async function Orm_Add_Bio(id: number, bio: string) {
    return db.query(
        'UPDATE Users SET bio = $1 WHERE id = $2',
        [bio, id]
    );
}




export function Orm_Delete_Bio(token: string) {
    // return db.query('DELETE FROM Users WHERE id = $1', [token]);
}