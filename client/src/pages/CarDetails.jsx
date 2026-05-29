import { useState , useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { assets } from '../assets/assets'
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const CarDetails = () => {
  const {id} = useParams(); 
  const {cars , axios , pickupdate , setpickupdate , returndate , setreturndate } = useAppContext()
  const navigate = useNavigate(); 
  const [car, setCar] = useState(); 
  const [reason, setReason] = useState('')
  const currency = import.meta.env.VITE_CURRENCY
  
  useEffect(() => {
    const found = cars.find(car => car._id === id)
    console.log('car owner data:', found?.owner) // 👈 check browser console
    setCar(found)
}, [cars, id]) 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/booking/create' , {
        car : id , 
        pickupdate , 
        returndate , 
        reason
      })
      if(data.success){
        toast.success(data.message)
        navigate('/my-bookings')
      } else {
        toast.error(data.message)
      }
    } catch (error){
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    setCar(cars.find(car => car._id === id))
  },[cars , id])

  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">

      <button onClick={() => {navigate(-1)}} className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"> 
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
        Back to All Cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        
        <div className="lg:col-span-2"> 
          <img src={car.image} alt="" className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"/> 
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{car.brand} {car.model}</h1>
              <p className="text-gray-500 text-lg">{car.category} . {car.year}</p>
            </div> 

            <hr className="border-borderColor my-6"/>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {icon: assets.users_icon , text: `${car.seating_capacity} Seats`},
                {icon: assets.fuel_icon , text: `${car.fuel_type}`}, 
                {icon: assets.car_icon , text: `${car.transmission}`}, 
                {icon: assets.location_icon , text: `${car.location}`}
              ].map(({icon,text})=>(
                <div key={text} className="flex flex-col items-center bg-light p-4 rounded-lg">
                  <img src={icon} alt="" className="h-5 mb-2"/> 
                  {text}
                </div>
              ))}
            </div>

            <div>
              <h1 className="text-xl font-medium mb-3">Description</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>
             
            <div>
              <h1 className="text-xl font-medium mb-3">Features</h1>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear view Mirror"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-500">
                    <img src={assets.check_icon} className="h-4" alt=""/>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {(car.owner?.businessName || car.owner?.phone) && (
              <div>
                <h1 className="text-xl font-medium mb-3">Owner Details</h1>
                <div className="bg-light p-4 rounded-lg space-y-2 text-gray-600">
                  {car.owner?.businessName && (
                    <div className="flex items-center gap-2">
                      <img src={assets.users_icon} className="h-4" alt=""/>
                      <span className="font-medium">{car.owner.businessName}</span>
                    </div>
                  )}
                  {car.owner?.phone && (
                    <div className="flex items-center gap-2">
                      <span>📞</span>
                      <span>{car.owner.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>

        <form onSubmit={handleSubmit} className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500"> 
          <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
            {currency}{car.priceperday}
            <span className="text-base text-gray-400 font-normal">per day</span>
          </p>
          <hr className="border-borderColor my-6"/>

          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input value={pickupdate} onChange={(e) => setpickupdate(e.target.value)} type='date' className="border border-borderColor px-3 py-2 rounded-lg" required id='pickup-date' min={new Date().toISOString().split('T')[0]}/>
          </div>  

          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input value={returndate} onChange={(e) => setreturndate(e.target.value)} type='date' className="border border-borderColor px-3 py-2 rounded-lg" required id='return-date'/>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="reason">Reason for Booking</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Family trip, business travel..."
              rows={3}
              className="border border-borderColor px-3 py-2 rounded-lg resize-none text-sm"
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-3 font-medium text-white rounded-xl">
            Book Now
          </button>
          <p className="text-center text-sm">No credit card required to reserve</p>
        </form>

      </div>
    </div>
  ) : <Loader/>
}

export default CarDetails