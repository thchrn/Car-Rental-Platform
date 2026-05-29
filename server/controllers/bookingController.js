import Booking from "../models/Booking.js"
import Car from "../models/Car.js";

const checkAvailability = async (car, pickupdate, returndate) => {
    const bookings = await Booking.find({  
        car,
        pickupdate: { $lte: returndate },
        returndate: { $gte: pickupdate },
    })
    return bookings.length === 0;
}

// api to check availability
export const checkAvailabilityOfCar = async (req, res) => {
    try {
        const { location, pickupdate, returndate } = req.body
        
        const cars = await Car.find({ location, isAvailable: true }).populate('owner', 'businessName phone')

        const availablecarspromise = cars.map(async (car) => {
            const isAvailable = await checkAvailability(car._id, pickupdate, returndate)
            return { ...car._doc, isAvailable: isAvailable }
        })

        let availableCars = await Promise.all(availablecarspromise);
        availableCars = availableCars.filter(car => car.isAvailable === true)

        res.json({ success: true, availableCars })  
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })  
    }
}

// api to create booking
export const createBooking = async (req, res) => {
    try {
        const { _id } = req.user;
        const { car, pickupdate, returndate, reason } = req.body;  // ✅ add reason
        const isAvailable = await checkAvailability(car, pickupdate, returndate)
        if (!isAvailable) {
            return res.json({ success: false, message: "Car is not available for booking" })  
        }

        const carData = await Car.findById(car)
        const picked = new Date(pickupdate);
        const returned = new Date(returndate);
        const noofdays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
        const price = carData.priceperday * noofdays;

        await Booking.create({ car, owner: carData.owner, user: _id, pickupdate, returndate, price, reason })  // ✅ add reason
        res.json({ success: true, message: "Booking created" })  
    } catch (error) { 
        console.log(error.message)
        res.json({ success: false, message: error.message })  
    }
}

// api to list user bookings
export const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user;
        const bookings = await Booking.find({ user: _id }).populate("car").sort({ createdAt: -1 })
        res.json({ success: true, bookings })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })  
    }
}

// api to get owner bookings
export const getOwnerBookings = async (req, res) => {
    try {
        if (req.user.role !== 'owner') {  
            return res.json({ success: false, message: "Unauthorized" })
        }

        const bookings = await Booking.find({ owner: req.user._id })
            .populate('car user')
            .sort({ createdAt: -1 })  // ✅ removed invalid .select("-user.password")

        res.json({ success: true, bookings })  
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })  
    }
}

// api for owner to handle bookings
export const changeBookingStatus = async (req, res) => {
    try {
        const { _id } = req.user;
        const { bookingId, status } = req.body
        const booking = await Booking.findById(bookingId)
        if (booking.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" })
        }
        await Booking.findByIdAndUpdate(bookingId, { status })
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const getDashboardData = async (req, res) => {
    try {
        const { _id } = req.user;
        const cars = await Car.find({ owner: _id })
        const bookings = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 })
        const pendingBookings = await Booking.find({ owner: _id, status: "pending" })
        const completedBookings = await Booking.find({ owner: _id, status: "confirmed" })

        const monthlyRevenue = bookings
            .filter(booking => booking.status === 'confirmed')
            .reduce((acc, booking) => acc + booking.price, 0)

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0, 3),
            monthlyRevenue
        }

        res.json({ success: true, dashboardData })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}