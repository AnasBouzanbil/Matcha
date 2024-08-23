
import transporter from "../../conf/mail";
import { ifUserEmailExist, ifUserUsernameExist } from "../../services/insertingData";
import { deleteToken_Mail, IfMail_Exist, setToken_Mail, Validte_Token_Mail,  } from "./email.orm";



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










/*
All realted the the event emailcheck
*/

export async  function Handle_email_check(socket : any, email : any) {
    try {
        const status = await checkIfEmailExists(email);
        sendEmail(email, socket);
    } catch (error) {
        console.error("Error in emailcheck event:", error);
    }
}
async function checkIfEmailExists(email: string): Promise<number> {
    try {
      await ifUserEmailExist(email);
      return 400;
    } catch (error) {
      console.error("Error checking if email exists:", error);
      return 200;
    }
  }






  /* 
  all related to the event emailconfirmtion */

  export async function Handle_email_confirmation(socket: any, token: string) {
    try {
        const obj = await Validte_Token_Mail(token);
  
        if (obj) {
          obj.socket.emit('emailverified', 200);
          await deleteToken_Mail(token);
        } else {
          socket.emit('emailverified', 400);
        }
      } catch (error) {
        console.error("Error in emailverifieddone event:", error);
      }
}


export async function Handle_usernmae_availability(socket: any, username: string) {
    try {
        const status = await validateUsername(username);
        var responseCode = 200;
        if (username.length < 3 || status !== 1) {
          responseCode = 301;
        }
        socket.emit('validateusername', responseCode);
      } catch (error) {
        console.error("Error in AvailableUsername event:", error);
      }
}

export async function validateUsername(username: string): Promise<number> {
    try {
      await ifUserUsernameExist(username);
      return 1;
    } catch (error) {
      console.error("Error validating username:", error);
      return 0;
    }
  }















async function generateToken(email: string, socket: any): Promise<string> {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    try {
      await setToken_Mail(token, email, socket);
    } catch (error) {
      console.error("Error generating token:", error);
    }
    return token;
  }
  

export async function sendEmail(mail: string, socket: any) {
  var token = '';
    try {
      const email_exist = await IfMail_Exist(mail);
      if (email_exist) {
        console.log('Email already exists');
        return;
      }
      console.log('email is ' + mail)
      token = await generateToken(mail, socket);
      const mailOptions = {
          from: 'tech_matcha@hotmail.com',
          to: mail,
          subject: 'Please Confirm Your Email',
          text: 'Hello, Please confirm your email by clicking on the link below.',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #dcdcdc; border-radius: 8px; background-color: #f4f4f4;">
              <div style="text-align: center;">
                <img src="https://via.placeholder.com/100x50?text=Matching" alt="Matching Logo" style="width: 80px; height: auto; margin-bottom: 20px;">
                <h2 style="color: #E91E63;">Welcome to Matching</h2>
                <p style="font-size: 16px; color: #333;">
                  Hello,
                </p>
                <p style="font-size: 16px; color: #333;">
                  Thank you for signing up. Please confirm your email address by clicking the button below:
                </p>
                <p style="text-align: center; margin: 20px 0;">
                  <a href="http://localhost:3000/confirmemail/${token}?${mail}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #E91E63; text-decoration: none; border-radius: 5px;">Confirm Email</a>
                </p>
                <p style="font-size: 14px; color: #333;">
                  If you didn't request this, you can safely ignore this email.
                </p>
                <p style="font-size: 14px; color: #333;">
                  Regards,<br>
                  The Matching Team
                </p>
              </div>
              <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
                <p>© 2024 Matching. All rights reserved.</p>
                <p><a href="https://www.matching.com/unsubscribe" style="color: #E91E63; text-decoration: none;">Unsubscribe</a> | <a href="https://www.matching.com/privacy-policy" style="color: #E91E63; text-decoration: none;">Privacy Policy</a></p>
              </footer>
            </div>
          `,
        };
        
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Error sending email: ${error}`);
        } else {
          console.log(`Message Sent: ${info.response}`);
        }
      });
      return token;
  
    } catch (error) {
      deleteToken_Mail(token);
      console.error("Error sending email:", error);
    }
  }