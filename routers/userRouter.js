import Router from 'express';
import usersController from '../controllers/usersController.js';

const router = new Router();

router.post('/registration', usersController.registration);
router.post('/login', usersController.login);
router.post('/logout', usersController.logout);
router.get('/refresh', usersController.refresh);
router.get('/users', usersController.users);

export default router;
