import imagekit from "../configs/imageKit.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import fs from 'fs';

export const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { role: "owner" })
        res.json({ success: true, message: "Now you can list cars" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// api to list car
export const addCar = async (req, res) => {
    try {
        const { _id } = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        // uploading image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })

        const optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [{
                width: '1280',
                quality: 'auto',
                format: 'webp'
            }]
        })

        const image = optimizedImageURL;
        await Car.create({ ...car, owner: _id, image })
        res.json({ success: true, message: "Car Added" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const getOwnerCars = async (req, res) => {
    try {
        const { _id } = req.user;
        const cars = await Car.find({ owner: _id }) 
        res.json({ success: true, cars })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const toggleCarAvailability = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body;

        const car = await Car.findById(carId)

        if (!car) {
            return res.json({ success: false, message: "Car not found" });
        }

        // check if the car belongs to the user
        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorised" });
        }

        car.isAvailable = !car.isAvailable
        await car.save()

        res.json({ success: true, message: "Availability Toggled" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// api to delete a car
export const deleteCar = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body;

        const car = await Car.findById(carId)

        if (!car) {
            return res.json({ success: false, message: "Car not found" });
        }

        // check if the car belongs to the user
        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorised" });
        }

        car.owner = null;
        car.isAvailable = false;
        await car.save()

        res.json({ success: true, message: "Car Deleted" }) 
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// api to get dashboard data
export const getdashboarddata = async (req, res) => {
    try {
        const { _id, role } = req.user;
        if (role !== 'owner') {
            return res.json({ success: false, message: "Unauthorised" });
        }

        const cars = await Car.find({ owner: _id })
        const bookings = await Booking.find({ car: { $in: cars.map(c => c._id) } })
            .populate('car')
            .sort({ createdAt: -1 })

        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

        const monthlyBookings = bookings.filter(b => new Date(b.createdAt) >= startOfMonth)
        const monthlyRevenue = monthlyBookings
            .filter(b => b.status === 'confirmed')
            .reduce((sum, b) => sum + (b.price || 0), 0)

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: bookings.filter(b => b.status === 'pending').length,
            completedBookings: bookings.filter(b => b.status === 'confirmed').length,
            recentBookings: bookings.slice(0, 5),
            monthlyRevenue,
        }

        res.json({ success: true, dashboardData })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// API TO UPLOAD IMAGE
export const uploadUserImage = async (req, res) => {
    try {
        const { _id } = req.user 
        const imageFile = req.file;

        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        })

        const optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [{
                width: '400',
                quality: 'auto',
                format: 'webp'
            }]
        })

        const image = optimizedImageURL;
        await User.findByIdAndUpdate(_id, { image })
        res.json({ success: true, message: "Image Updated", image }) 
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// ADD this new API at the bottom
export const updateProfile = async (req, res) => {
    try {
        const { _id } = req.user
        const { phone, businessName } = req.body
        await User.findByIdAndUpdate(_id, { phone, businessName })
        res.json({ success: true, message: "Profile Updated" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}