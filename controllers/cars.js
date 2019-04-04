import Car from '../models/car';
import User from '../models/user';

// Using Async/Await
const getCars = async (req, res, next) => {
    try{
        const cars = await Car.find({});
        res.status(200).json(cars);

    } catch (err) {
        next(err);
    }
};

const postCar = async (req, res, next) => {
    try {
        // Find seller
        const seller = await User.findById(req.body.seller);

        // Create value
        delete req.body.seller;
        const newCar = new Car(req.body);
        const car = await newCar.save();

        // Link car to seller
        seller.cars.push(car);
        await seller.save();
        res.status(201).json(car);

    } catch (err) {
        next(err);
    }
};

const getCar = async (req, res, next) => {
    try {
        const { carId } = req.params;
        const car = await Car.findById(carId);
        res.status(200).json(car);

    } catch (err) {
        next(err)
    }
};

const replaceCar = async (req, res, next) => {
    try {
        const { carId } = req.params;
        const newCar = req.body;
        await Car.findByIdAndUpdate(carId, newCar); //findByIdAndUpdate
        res.status(200).json({
            message: 'Car Replaced Successfully'
        });

    } catch(err){
        next(err);
    }
};

const updateCar = async (req, res, next) => {
    try {
        const { carId } = req.params;
        const newCar = req.body;
        await Car.findByIdAndUpdate(carId, newCar); //findByIdAndUpdate
        res.status(200).json({
            message: 'Car Updated Successfully'
        });

    } catch(err){
        next(err);
    }
}

const deleteCar = async (req, res, next) => {
    try {
        const { carId } = req.params;
        // Get a car
        const car = await Car.findById(carId);
        console.log('car', car.seller);

        // Get a seller
        const sellerId = car.seller;
        console.log('sellerId',sellerId);
        
        const seller = await User.findById(sellerId);

        // Remove the car
        await car.remove();

        // Remove car from user
        seller.cars.pull(car);
        await seller.save();

        res.status(200).json({
            message: 'Car Deleted Successfully'
        });

    } catch(err){
        next(err);
    }
}

export { getCars, postCar, getCar, replaceCar, updateCar, deleteCar };
