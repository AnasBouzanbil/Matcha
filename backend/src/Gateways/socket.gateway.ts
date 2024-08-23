
import { Server } from 'socket.io';
import server from '..';
import { Handle_email_check, Handle_email_confirmation, Handle_usernmae_availability } from '../api/email/email.services';



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