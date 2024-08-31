import { Router, Response, Request } from "express";
import { SearchForToken, UserNewInfo } from "../services/insertingData";
import { set_user_Tags } from "../api/tags/Tags.orm";
import { Handle_Update_PhoneNumber } from "../api/userData/phonenumber/phonenumber.orm";
import { authorizeToken } from "..";



const router = Router();


export async function Handle_other_info_routes(req: Request, res: Response) {
    try {
        const { token, age, bio, gender , OtherGender, interests } = req.body;
        console.log('handle other info routes   ' + token);
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



export async function Handle_Add_tags(req: Request, res: Response) {
    try {
        const {tags, token, phoneNumber, location } = req.body;
        console.log(req.body.token);
        await SearchForToken(token);
        await set_user_Tags(tags, token);
        await Handle_Update_PhoneNumber(token, phoneNumber);
        res.status(200).send('User preferences updated');
    }
    catch(error) {
        console.error("Error updating user preferences:", error);
        res.status(403).send('Error updating user preferences with error ' + error);
    
    }

}


router.post('/datawithtags', authorizeToken, async (req : Request, res : Response) => {
    Handle_Add_tags(req, res);
});


router.post('/userinfo', authorizeToken, async (req : Request, res : Response) => {
    Handle_other_info_routes(req, res);
});

export default router;