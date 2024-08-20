import GetUser, { Handle_Login_user, SearchForToken, UpdateUserGender, UpdateUserLocation, UpdateUserPhoneNumber, UserNewInfo, Validte_Token_Mail, setNewUser, set_user_Tags } from "../services/insertingData";
import { Request, Response } from 'express';


export async function Handle_confirm_email_routes(req: Request, res: Response) {
    try {
        const { token } = req.body;
        const email = await Validte_Token_Mail(token);

        res.status(200).send('Email verified');
    } catch (error) {
        console.error("Error confirming email:", error);
        res.status(400).send('Invalid token');
    }
}

export async function Handle_other_info_routes(req: Request, res: Response) {
    try {
        const { token, age, bio, gender , OtherGender, interests } = req.body;
        console.log(req.body);
        const data = await SearchForToken(token);

        if (data) {
          data.age = age;
          data.bio = bio; 
          data.gender = gender;
          data.preferences = OtherGender;
          
          await UserNewInfo(data, token);
          res.status(200).send('User info updated');
        } else {
          throw new Error("User not found");
        } 
    
      } catch (error) {
        console.error("Error updating user info:", error);
        res.status(403).send('Error updating user info');
      }
}

export async function Add_user_prefernce_tags(req: Request, res: Response) {
  try {
    const { token, tags, phonenumber, location} = req.body;
    console.log(req.body)
    const data = await SearchForToken(token);
    if (data) {
      data.preferences = tags;
      console.log(data);
      await set_user_Tags(tags, token);
      await UpdateUserLocation(token, location);
      await UpdateUserPhoneNumber(token, phonenumber)
      res.status(200).send('User preferences updated');
    } else {
      throw new Error("User not found");
    }

  } catch (error) {
    console.error("Error updating user preferences:", error);
    res.status(403).send('Error updating user preferences');
  }
}



export async function Handle_post_signup(req: Request, res: Response) {
    try {
		const {lastName , firstName , email , phonenumber , username , password} = req.body;
		let token = await setNewUser(lastName , firstName , email , phonenumber , username , password);
    console.log('token is ' + token);
		res.status(200).send(token.toString());

	}
	catch(error)
	{
    if (error.code === '23505')
    {
      console.log('UserAlready exist with the usernam eor email' + error);
      res.status(403).send('UserAlready exist with the usernam eor email   ' + error);
    }
		res.status(403).send('UserAlready exist with the usernam eor email   ' + error);
	}
}

export async function Handle_Login(req : Request, res : Response)
{
    try {
      const {username , password} = req.body;
      console.log(req.body);
      Handle_Login_user(username, password, res);
      console.log('login done')
    }
    catch(error)
    {
      res.status(404).send('oops something went wrong')  
    }
}

export async function Handle_Post_getUser(req: Request, res: Response) {
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
