import db from '../../conf/db.conf';






export async function set_user_Tags(tags: string[], token: string) {
    for (let i = 0; i < tags.length; i++) {
        const result = await db.query(
            'INSERT INTO Preference (userid, tagid) VALUES ($1, (SELECT id FROM tags WHERE tagname = $2))',
            [token, tags[i]]
        );
    }
}

export async function GetUserTags(token: string) {
    const result = await db.query(`
    SELECT tagname FROM tags WHERE id IN (SELECT tagid FROM Preference WHERE userid = $1)`, [token]);
    return result.rows;
}
