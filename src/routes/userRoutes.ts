import express from 'express';
import { signup } from '../controllers/UserController';
import { login } from '../controllers/UserController';

const router = express.Router();

router.post('/:language/signup', signup);
router.post('/:language/login', login);

export default router;
