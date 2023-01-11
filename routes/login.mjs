import express from 'express';

import { getAllUser, getUser, createUser, updateUser, deleteUser } from '../controllers/posts.js';

const userRoute = express.Router();

userRoute.get('/user/create', getAllUser);
userRoute.post('/user/getAll', createUser);
userRoute.get('/user/singleUser:id', getUser);
userRoute.patch('/user/update:id', updateUser);
userRoute.delete('/user/:id', deleteUser);

export default userRoute;