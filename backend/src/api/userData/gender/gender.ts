

import express from 'express';
import { SearchForToken } from "../../../services/insertingData";
import { authorizeToken } from '../../..';

const router = express.Router();


router.put('gender',  authorizeToken ,async (req, res) => {
});

router.put('genderPreference', authorizeToken , async (req, res) => {
});

router.get('/gender', authorizeToken , async (req, res) => { 
}
);

router.get('/genderPreference', authorizeToken , async (req, res) => {
});


export default router;