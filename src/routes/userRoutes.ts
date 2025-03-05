import { Router, Request, Response } from 'express';
import { signup, login } from '../controllers/UserController';

const router = Router();
// @ts-ignore
router.post('/:language/signup', (req: Request, res: Response) => signup(req, res));
// @ts-ignore
router.post('/:language/login', (req: Request, res: Response) => login(req, res));

export default router;
