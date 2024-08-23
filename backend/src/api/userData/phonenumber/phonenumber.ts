






import { Router } from 'express';
import { Handle_Get_PhoneNumber, Handle_Put_PhoneNumber } from './phonenumber.service';

const router = Router();


router.put('phonenumber', async (req, res) => {
    Handle_Put_PhoneNumber(req, res); 
});

router.get('/phonenumber', async (req, res) => {
    Handle_Get_PhoneNumber(req, res);
}
);

router.delete('/phonenumber', async (req, res) => {
});


export default router;