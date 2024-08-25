






import { Router } from 'express';
import { Handle_Get_PhoneNumber, Handle_Put_PhoneNumber } from './phonenumber.service';
import { authorizeToken } from '../../..';

const router = Router();


router.put('phonenumber',authorizeToken , async (req, res) => {
    Handle_Put_PhoneNumber(req, res); 
});

router.get('/phonenumber',authorizeToken , async (req, res) => {
    Handle_Get_PhoneNumber(req, res);
}
);

router.delete('/phonenumber',authorizeToken , async (req, res) => {
});


export default router;