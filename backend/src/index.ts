import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoute from './api/user/user';
import bioRoute from './api/userData/bio/bio';
import genderRoute from './api/userData/gender/gender';
import LoginRoute from './api/Login/login';
import TagsRoute from './api/tags/tags';
import PhoneNumberRoute from './api/userData/phonenumber/phonenumber';
import LocationRoute from './api/userData/location/location';
import Userinforoute from './routes/userinfo.route';


dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(userRoute);
app.use(bioRoute);
app.use(LoginRoute);
app.use(genderRoute);
app.use(TagsRoute);
app.use(PhoneNumberRoute);
app.use(LocationRoute);
app.use(Userinforoute);




const server = createServer(app);



server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



export default server;