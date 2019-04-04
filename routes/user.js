import express from 'express';
import { getUsers, postUser, getUser, replaceUser, updateUser, getUserCars, postUserCars } from '../controllers/users';

const router = express.Router();

router.route('/')
    .get(getUsers)
    .post(postUser)

router.route('/:userId')
    .get(getUser)
    .put(replaceUser)
    .patch(updateUser)
    .delete()

router.route('/:userId/cars')
    .get(getUserCars)
    .post(postUserCars)

export default router;
