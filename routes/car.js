import express from 'express';
import { getCars, postCar, getCar, replaceCar, updateCar, deleteCar } from '../controllers/cars';

const router = express.Router();

router.route('/')
    .get(getCars)
    .post(postCar)

router.route('/:carId')
    .get(getCar)
    .put(replaceCar)
    .patch(updateCar)
    .delete(deleteCar)

export default router;