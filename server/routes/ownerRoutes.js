import express from "express"
import protect from "../middleware/auth.js"
import { addCar, changeRoleToOwner, deleteCar, getdashboarddata, getOwnerCars, toggleCarAvailability, uploadUserImage } from "../controllers/ownerController.js"
import upload from "../middleware/multer.js"

const OwnerRouter = express.Router()

OwnerRouter.post("/change-role" , protect , changeRoleToOwner )
OwnerRouter.post("/add-car" , upload.single('image') , protect , addCar )
OwnerRouter.get("/cars", protect, getOwnerCars)
OwnerRouter.post("/toggle-car" , protect , toggleCarAvailability )
OwnerRouter.post("/delete-car" , protect , deleteCar)
OwnerRouter.get('/dashboard' , protect , getdashboarddata)
OwnerRouter.post("/update-image" ,upload.single('image') , protect , uploadUserImage ) 

export default OwnerRouter