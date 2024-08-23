import { Request, Response } from 'express';
import GetUser, { Check_if_usernmae_already_exist, Delete_All_User_info, function_Check_Phonenumber_already_exist, setNewUser } from './user.orm';
import { SearchForToken } from '../../services/insertingData';


export async function Handle_Get_User(req: Request, res: Response) {
	try {
		const { token } = req.body;
    console.log(token);
		var data = await SearchForToken(token);
		if (data) {
      data = await GetUser(token);
			res.status(200).send(data);
		} else {
			throw new Error('User not found');
		}
	} catch (error) {
    console.log("oops " + error);
		res.sendStatus(403);
	}
}



export async function Handle_Delete_user(req: Request, res: Response) {
    try {
     const { token } = req.body;
    let i = await  Delete_All_User_info(token);
    if (i == 1)
      throw new Error('Error deleting user');
     res.status(200).send('User deleted successfully');
    }
     catch(error)
     {
       res.status(403).send('Error deleting user');
     }
 }


 export async function Handle_Post_User(req: Request, res: Response) {
    try {
      const {lastName , firstName , email , phonenumber , username , password} = req.body;
      const username_exist = await Check_if_usernmae_already_exist(username);
      const phonenumber_exist = await function_Check_Phonenumber_already_exist(phonenumber);
      if (username_exist) return res.status(403).send('UserAlready exist with the username');
      if (phonenumber_exist) return res.status(403).send('UserAlready exist with the Phonenumber');
      let token = await setNewUser(lastName , firstName , email , phonenumber , username , password);
    console.log('token is ' + token);
		res.status(200).send(token.toString());

	}
	catch(error)
	{
    if (error.code === '23505')
    {
      console.log('UserAlready exist with the username or email' + error);
      res.status(403).send('UserAlready exist with the username eor email   ' + error);
      return ;
    }
    else
  		res.status(403).send('403 : UserAlready exist with the username or email   ' + error);
	}
}