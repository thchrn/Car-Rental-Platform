import { useEffect, useState } from "react"
import { assets } from "../assets/assets"
import Title from "../components/Title"
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

const Cars = () => {
  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupdate = searchParams.get('pickupdate')
  const returndate = searchParams.get('returndate')

  const { cars, axios } = useAppContext()
  const [input, setInput] = useState('');
  const isSearchData = pickupLocation && pickupdate && returndate
  const [filteredCars, setFilteredCars] = useState([])

  const applyFilter = () => {
    if (input === '') {
      setFilteredCars(cars)
      return
    }
    const filtered = cars.slice().filter((car) => (
      car.brand.toLowerCase().includes(input.toLowerCase()) ||
      car.model.toLowerCase().includes(input.toLowerCase()) ||
      car.category.toLowerCase().includes(input.toLowerCase()) ||
      car.transmission.toLowerCase().includes(input.toLowerCase())
    ))
    setFilteredCars(filtered)
  }

  const searchCarAvailablity = async () => {
    try {
      const { data } = await axios.post('/api/booking/check-availability', {
        location: pickupLocation,
        pickupdate,
        returndate
      })
      if (data.success) {
        setFilteredCars(data.availableCars)
        if (data.availableCars.length === 0) toast('No cars available')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isSearchData) searchCarAvailablity()
  }, [])

  useEffect(() => {
    if (cars.length > 0 && !isSearchData) applyFilter()
  }, [input, cars])

  return (
    <div>
      {/* Hero section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center py-20 bg-light max-md:px-4">
        
        <Title title="Available Cars" subTitle="Browse our selection of premium vehicles available for your adventure" />
        
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center bg-white px-4 mt-6 max-w-xl w-full h-12 rounded-full shadow">
          <img src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2" />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model or features"
            className="w-full h-full text-gray-500 outline-none border-none bg-transparent"
          />
          <img src={assets.filter_icon} alt="" className="w-4.5 h-4.5 ml-2" />
        </motion.div>
      </motion.div>

      {/* Cars grid */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {filteredCars.length} Cars
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filteredCars.map((car, index) => (
            <motion.div key={index} variants={itemVariants}>
              <CarCard car={car} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Cars