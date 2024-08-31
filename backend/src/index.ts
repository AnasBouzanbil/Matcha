import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

import userRoute from './api/user/user';
import bioRoute from './api/userData/bio/bio';
import genderRoute from './api/userData/gender/gender';
import LoginRoute from './api/Login/login';
import TagsRoute from './api/tags/tags';
import PhoneNumberRoute from './api/userData/phonenumber/phonenumber';
import LocationRoute from './api/userData/location/location';
import Userinforoute from './routes/userinfo.route';
import imagesroute from './api/images/images';

import { Handle_email_check, Handle_email_confirmation, Handle_usernmae_availability } from './api/email/email.services';





dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


const generateToken = (userId: any) => {
  return jwt.sign({ userId }, secret, { expiresIn: '1h' });
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'token', 'Authorization'],

  })
);

app.use('/uploads', express.static('./uploads'));


app.use(userRoute);
app.use(bioRoute);
app.use(LoginRoute);
app.use(genderRoute);
app.use(TagsRoute);
app.use(PhoneNumberRoute);
app.use(LocationRoute);
app.use(Userinforoute);
app.use(imagesroute);



export async function generateJwtToken(userId: any) {
  return jwt.sign({ userId }, secret, { expiresIn: '10h' });
}

export function authorizeToken(req: any, res: Response, next: any) {
  const token1 = req.headers.authorization;
  if (!token1) {
    return res.status(401).json({ error: 'Token is required' });
  }
  const token = token1.startsWith('Bearer ') ? token1.slice(7) : token1;

  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(409).json({ error: 'Token expired' });
      }
      else if (err.name === 'JsonWebTokenError') {
        return res.status(409).json({ error: 'Invalid token' });
      }
    }
    req.body.token = decoded.userId;
    req.token = decoded.userId;
    next();
  });
}


app.get('/jwt', (req, res) => {
  const userId = 123;
  const token = jwt.sign({ userId }, secret, { expiresIn: '1h' });
  res.json({ token });
});

app.post('/decode-token', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const userId = decoded.userId;
    console.log(userId);

    res.json({ userId });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

const server = createServer(app);


const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],


  },
});

io.on('connection', (socket) => {
  socket.on('emailcheck', async (email) => {
    await Handle_email_check (socket, email);
  });

  socket.on('emailverifieddone', async (token) => {
    await Handle_email_confirmation(socket, token);
  });

  socket.on('AvailableUsername', async (username) => {
    await Handle_usernmae_availability(socket, username);
  });
});
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



export default server;