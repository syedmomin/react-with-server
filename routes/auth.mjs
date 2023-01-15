import express from 'express';

// import { getAllUser, getUser, createUser, updateUser, deleteUser } from '../controllers/login.mjs';
import { createUser, getAllUser, emailExist,loginUser } from '../controllers/auth.mjs';

const router = express.Router();

router.post('/user/create', createUser);
router.get('/user/getAll', getAllUser);
router.get('/user/emailExist/:email', emailExist);
router.post('/user/login', loginUser);
// router.patch('/user/update:id', updateUser);


export default router;