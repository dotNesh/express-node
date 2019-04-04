import User from '../models/user';
import Car from '../models/car';

// Using Async/Await
const getUsers = async (req, res, next) => {
    try{
        const users = await User.find({});
        res.status(200).json(users);

    } catch (err) {
        next(err);
    }
};

const postUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
}

const replaceUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const newUser = req.body;
        await User.findOneAndReplace(userId, newUser); //findByIdAndUpdate
        res.status(200).json({
            message: 'User Replaced Successfully'
        })
    } catch(err){
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const newUser = req.body;
        await User.findOneAndUpdate(userId, newUser);
        res.status(200).json({
            message: 'User Updated Successfully'
        })
    } catch (err){
        next(err);
    }
}

const getUserCars = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('cars');
        console.log(user);
        res.status(200).json(user.cars);

    } catch (err){
        next(err);
    }

}

const postUserCars = async (req, res, next) => {
    try {
        const { userId } = req.params;
        // Create a new car
        const newCar = new Car(req.body);
        // Get User
        const user = await User.findById(userId);
        // Assign car to user
        newCar.seller = user;
        // Save the car
        await newCar.save()
        // Add car to the Users araay
        user.cars.push(newCar);
        // Save user
        await user.save()

        res.status(201).json({
            message: `${newCar.year} ${newCar.make} ${newCar.model} added to ${user.firstName}'s collection`
        })
    } catch(err){
        next(err);
    }
}

// Using callbacks

/*
const getUsers = (req, res, next) => {
    User.find({},(err, users) => {
        if(err){
            next(err);
        }
        res.status(200).json(users);
    })
};

const postUser = (req, res, next) => {
    console.log(`req.body contents are ${JSON.stringify(req.body)}`);
    const newUser = new User(req.body);
    console.log(`req.body contents are ${newUser}`);
    newUser.save((err, user) => {
        console.log('err', err);
        console.log('user', user);
        res.status(201).json(user);
    })
};
*/

// Using Promises

// const getUsers = (req, res, next) => {
//     User.find({})
//         .then(users => {
//             res.status(200).json(users);
//         })
//         .catch(err =>{
//             next(err);
//         })
// };

// const postUser = (req, res, next) => {
//     const newUser = new User(req.body);
//     newUser.save()
//         .then(user => {
//             res.status(201).json(user);
//         })
//         .catch(err => {
//             next(err);
//         })
        
// }

export { getUsers, postUser, getUser, replaceUser, updateUser, getUserCars, postUserCars };
