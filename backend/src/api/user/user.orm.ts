import db from '../../conf/db.conf';
const bcrypt = require('bcrypt/');



export default async function GetUser(token: string) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [token]);
    console.log(result.rows[0]);
    if (result.rows.length > 0) {
        return result.rows[0];
    }
}




export async function Delete_All_User_info(token: string) {
    console.log(token);
    let i = 0;
    try {
        await db.query('DELETE FROM users WHERE id = $1', [token]);
    }
    catch (error) {
        return 1;
    }


    const deletions = [
        { query: 'DELETE FROM Pictures WHERE userid = $1', params: [token] },
        { query: 'DELETE FROM Preference WHERE userid = $1', params: [token] },
        { query: 'DELETE FROM likes WHERE userid = $1', params: [token] },
        { query: 'DELETE FROM dislikes WHERE userid = $1', params: [token] },
        { query: 'DELETE FROM matches WHERE userid = $1', params: [token] },
        { query: 'DELETE FROM matches WHERE matchid = $1', params: [token] },
        { query: 'DELETE FROM messages WHERE senderid = $1', params: [token] },
        { query: 'DELETE FROM messages WHERE receiverid = $1', params: [token] }
    ];

    for (const { query, params } of deletions) {
        try {
            const result = await db.query(query, params);
            console.log(`Query executed: ${query}`);
            if (result.rowCount > 0) {
                console.log(`Rows affected: ${result.rowCount}`);
            } else {
                console.log(`No rows affected for query: ${query}`);
            }
        } catch (error) {
            
            console.error(`Error executing query: `);
        }
    }
    return 0;
}



export async function setNewUser(LastName: string, FirstName: string, Email: string, PhoneNumber: string, Username: string, Password: string) {
    try {
        const hashedPassword = bcrypt.hashSync(Password, 10);
        await db.query(
            'INSERT INTO Users (FirstName, LastName, Email, PhoneNumber, Username, Password) VALUES ($1, $2, $3, $4, $5, $6)',
            [FirstName, LastName, Email, PhoneNumber, Username, hashedPassword]
        );

        const result = await db.query('SELECT id FROM Users WHERE Username = $1', [Username]);
        return result.rows[0]?.id;
    } catch (error) {
        console.error('Error inserting new user:', error);
        throw error;
    }
}






export async function Check_if_usernmae_already_exist(Username: string) {
    const result = await db.query('SELECT * FROM Users WHERE Username = $1', [Username]);
    return result.rows.length > 0;
}

export async function function_Check_Phonenumber_already_exist(PhoneNumber: string) {
    const result = await db.query('SELECT * FROM Users WHERE PhoneNumber = $1', [PhoneNumber]);
    return result.rows.length > 0;
}
