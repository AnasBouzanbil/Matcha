
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import multer, { FileFilterCallback } from 'multer';
const path = require('path');
import express, { NextFunction, Request, Response } from 'express';

import fs from 'fs';

import helloRoute from './routes/login';
import { Handle_email_check, Handle_email_confirmation, Handle_usernmae_availability } from './services/Handle_email_sending.services';
import { Add_user_prefernce_tags, Handle_confirm_email_routes, Handle_other_info_routes } from './routes/Handle_Middlewars.routes';
import { SearchForToken, Update_photo_profile, Update_pictures } from './services/insertingData';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(helloRoute);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  },
});

app.post('/confirmemail', async (req, res) => {
  Handle_confirm_email_routes(req, res);
});

app.post('/otherinfo', async (req, res) => {
  Handle_other_info_routes(req, res);
});


app.post('/addtags', async (req, res) => {
  Add_user_prefernce_tags(req, res);
} );

io.on('connection', (socket) => {
  socket.on('emailcheck', async (email) => {
    Handle_email_check(socket, email);
  });

  socket.on('emailverifieddone', async (token) => {
    Handle_email_confirmation(socket, token);
  });

  socket.on('AvailableUsername', async (username) => {
    Handle_usernmae_availability(socket, username);
  });
});



app.post('/profile', (req: Request, res : Response)=>{

})


app.post('/uploads', (req: Request, res : Response)=>{
  
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`http://localhost:${port}`);
  console.log(`http://127.0.0.1:${port}`);
});