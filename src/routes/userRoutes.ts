import express from 'express';
import { signup } from '../controllers/UserController';

const router = express.Router();

router.post('/:language/signup', signup);

export default router;
