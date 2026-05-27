import { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState('')
  const { pickupdate, setpickupdate, returndate, setreturndate, navigate } = useAppContext()

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams({ pickupLocation, pickupdate, returndate })
    navigate(`/cars?${params.toString()}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative flex flex-col items-center justify-center gap-10 bg-light text-center py-20 px-4 overflow-hidden">

      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center gap-2 bg-primary/10 text-primary text-xs font-medium px-4 py-1.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        Premium Car Rental Service
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="space-y-1">
        <h1 className='text-4xl md:text-4xl font-semibold text-gray-900 leading-tight'>
          Drive Your Dream <br />
          <span className="text-primary">Car Today</span>
        </h1>
        <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
          Premium vehicles for every journey — book in minutes, drive with confidence.
        </p>
      </motion.div>

      {/* Search form */}
      <motion.form
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSearch}
        className='bg-white rounded-2xl md:rounded-full shadow-[0px_8px_30px_rgba(0,0,0,0.08)] border border-borderColor p-4 md:p-2 md:pl-6 w-full max-w-3xl flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-0'>

        {/* Pickup location */}
        <div className='flex flex-col gap-1 flex-1 md:border-r border-borderColor md:pr-6'>
          <label className='text-xs font-semibold text-gray-400 uppercase tracking-wide'>Location</label>
          <select
            required
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className='text-sm font-medium text-gray-700 bg-transparent outline-none cursor-pointer'>
            <option value="">Select city</option>
            {cityList.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>

        {/* Pickup date */}
        <div className='flex flex-col gap-1 flex-1 md:border-r border-borderColor md:px-6'>
          <label htmlFor='pickup-date' className='text-xs font-semibold text-gray-400 uppercase tracking-wide'>Pickup</label>
          <input
            value={pickupdate}
            onChange={e => setpickupdate(e.target.value)}
            type="date"
            id="pickup-date"
            min={new Date().toISOString().split('T')[0]}
            className='text-sm font-medium text-gray-700 bg-transparent outline-none'
            required
          />
        </div>

        {/* Return date */}
        <div className='flex flex-col gap-1 flex-1 md:px-6'>
          <label htmlFor='return-date' className='text-xs font-semibold text-gray-400 uppercase tracking-wide'>Return</label>
          <input
            value={returndate}
            onChange={e => setreturndate(e.target.value)}
            type="date"
            id="return-date"
            className='text-sm font-medium text-gray-700 bg-transparent outline-none'
            required
          />
        </div>

        {/* Search button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className='flex items-center justify-center gap-2 px-8 py-3 bg-primary hover:bg-primary-dull text-white text-sm font-medium rounded-full cursor-pointer transition-colors whitespace-nowrap'>
          <img src={assets.search_icon} alt="search" className='w-4 h-4 brightness-200' />
          Search Cars
        </motion.button>

      </motion.form>

      {/* Car image */}
      <motion.img
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.6 }}
        src={assets.main_car}
        alt='car'
        className='w-full max-w-2xl drop-shadow-xl'
      />

    </motion.div>
  )
}

export default Hero